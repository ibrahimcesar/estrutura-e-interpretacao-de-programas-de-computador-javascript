/**
 * Testes de semântica do executor dos playgrounds (CodePlayground).
 *
 * Executa o WORKER_SOURCE real de src/components/playgroundRunner.js em um
 * contexto de vm do Node que emula o escopo global de um Web Worker, e
 * verifica a semântica de REPL (eco do valor da última expressão), a
 * biblioteca padrão do SICP JS, formatação e tratamento de erros.
 *
 * Uso: node scripts/playground-tests.mjs
 */
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const runnerSrc = readFileSync(join(ROOT, 'src/components/playgroundRunner.js'), 'utf8');
const match = runnerSrc.match(/const WORKER_SOURCE = `\n([\s\S]*?)\n`;/);
if (!match) {
  console.error('WORKER_SOURCE não encontrado em playgroundRunner.js');
  process.exit(1);
}
const WORKER_BODY = match[1];

function makeWorker() {
  const messages = [];
  const sandbox = {
    console: {},
    postMessage: (m) => messages.push(m),
    addEventListener: () => {},
  };
  sandbox.self = sandbox;
  const ctx = vm.createContext(sandbox);
  vm.runInContext('self = globalThis; globalThis.self = globalThis;', ctx);
  vm.runInContext(WORKER_BODY, ctx);
  return {
    run(source) {
      vm.runInContext('self.onmessage', ctx).call(null, { data: { source } });
      return messages.splice(0);
    },
  };
}

const cases = [
  // Semântica de REPL: eco do valor da última expressão
  ['137 + 349;', (m) => m[0].type === 'result' && m[0].text === '486' && m.at(-1).type === 'done'],
  ['486;', (m) => m[0].text === '486'],
  ['const size = 2; 5 * size;', (m) => m[0].text === '10'],
  ['const size = 2;', (m) => m[0].type === 'result' && m[0].isUndefined === true],
  ['function square(x){return x*x;}\nsquare(21);', (m) => m[0].text === '441'],
  ['"olá";', (m) => m[0].text === '"olá"'],
  ['null;', (m) => m[0].text === 'null'],
  ['1.5 === 3/2;', (m) => m[0].text === 'true'],
  // console e formatação
  ['console.log("a", 1, [1,2,3], {x: 1});', (m) => m[0].type === 'log' && m[0].text === 'a 1 [1, 2, 3] { x: 1 }'],
  ['console.log(new Error("bum"));', (m) => m[0].text === 'Error: bum'],
  ['Math.sqrt;', (m) => m[0].type === 'result' && m[0].text.includes('function')],
  // Erros
  ['eval(137 + 349;)', (m) => m[0].type === 'error' && m[0].text.startsWith('SyntaxError')],
  ['nao_existe;', (m) => m[0].type === 'error' && m[0].text.startsWith('ReferenceError')],
  ['function loop(){return loop();} loop();', (m) => m[0].type === 'error' && m[0].text.startsWith('RangeError')],
  ['prompt("x");', (m) => m[0].type === 'error' && m[0].text.includes('não são suportados')],
  // Limite de mensagens
  ['for (let j=0;j<600;j++) console.log(j);', (m) => m.some((x) => x.type === 'truncated') && m.filter((x) => x.type === 'log').length === 499],
  // Biblioteca padrão do SICP JS
  ['pair(1, 2);', (m) => m[0].text === '[1, 2]'],
  ['list(1, 2, 3);', (m) => m[0].text === '[1, [2, [3, null]]]'],
  ['head(tail(list(1, 2, 3)));', (m) => m[0].text === '2'],
  ['const x = list(1, 2); display(x); "fim";', (m) => m[0].type === 'log' && m[0].text === '[1, [2, null]]'],
  // Estrutura compartilhada imprime duas vezes; só ciclo verdadeiro é [circular]
  ['const a = list(1); pair(a, a);', (m) => m[0].text === '[[1, null], [1, null]]'],
  ['const z = pair(1, 2); set_tail(z, z); z;', (m) => m[0].text.includes('[circular]')],
  ['const p = pair(1, 2); set_head(p, 3); p;', (m) => m[0].text === '[3, 2]'],
  ['math_sqrt(16);', (m) => m[0].text === '4'],
  ['math_PI > 3.14 && math_PI < 3.15;', (m) => m[0].text === 'true'],
  ['put("add", list("a"), 42); get("add", list("a"));', (m) => m[0].text === '42'],
  ['error("bum");', (m) => m[0].type === 'error' && m[0].text.includes('bum')],
  ['head(5);', (m) => m[0].type === 'error' && m[0].text.includes('espera um par')],
  ['is_null(tail(list(1)));', (m) => m[0].text === 'true'],
  ['apply_in_underlying_javascript((a, b) => a + b, list(3, 4));', (m) => m[0].text === '7'],
  // Declarações do leitor sobrescrevem a biblioteca
  ['function pair(x, y) { return "custom"; } pair(1, 2);', (m) => m[0].text === '"custom"'],
];

let failures = 0;
for (const [source, check] of cases) {
  const worker = makeWorker();
  let msgs;
  try {
    msgs = worker.run(source);
  } catch (e) {
    msgs = [{ type: 'HOST-THROW', text: String(e) }];
  }
  const ok = (() => {
    try {
      return check(msgs);
    } catch {
      return false;
    }
  })();
  if (!ok) {
    failures += 1;
    console.error('FAIL', JSON.stringify(source.slice(0, 60)), '→', JSON.stringify(msgs).slice(0, 160));
  }
}

if (failures) {
  console.error(`\n${failures}/${cases.length} testes falharam`);
  process.exit(1);
}
console.log(`OK: ${cases.length} testes de semântica do playground passaram`);
