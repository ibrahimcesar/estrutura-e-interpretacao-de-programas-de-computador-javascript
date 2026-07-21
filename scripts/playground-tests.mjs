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
const WORKER_BODY = readFileSync(join(ROOT, 'src/components/playgroundWorker.js'), 'utf8');

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
    run(source, checks) {
      vm.runInContext('self.onmessage', ctx).call(null, { data: { source, checks } });
      return messages.splice(0);
    },
    send(data) {
      vm.runInContext('self.onmessage', ctx).call(null, { data });
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
  // Tempo de execução no done
  ['1 + 1;', (m) => typeof m.at(-1).elapsed === 'number'],
  // Árvore caixa-e-ponteiro: presente para pares, com refs para compartilhamento
  ['pair(1, pair(2, null));', (m) => m[0].tree && m[0].tree.k === 'pair' && m[0].tree.t.k === 'pair'],
  ['42;', (m) => m[0].tree == null],
  ['const a = list(1); pair(a, a);', (m) => m[0].tree.h.k === 'pair' && m[0].tree.t.k === 'ref' && m[0].tree.t.id === m[0].tree.h.id],
  // Streams
  ['stream_to_list(stream(1, 2, 3));', (m) => m[0].text === '[1, [2, [3, null]]]'],
  ['head(stream_tail(stream(1, 2, 3)));', (m) => m[0].text === '2'],
  ['is_stream(stream(1)) && is_stream(null);', (m) => m[0].text === 'true'],
  ['stream_to_list(list_to_stream(list(4, 5)));', (m) => m[0].text === '[4, [5, null]]'],
  // Verificações de exercício
  ['function f(x) { return x + 1; }', (m) => {
    const c = m.filter((x) => x.type === 'check');
    return c.length === 2 && c[0].pass === true && c[1].pass === false && c[1].actual === '2';
  }, [{ expression: 'f(1)', expected: '2' }, { expression: 'f(1)', expected: '3' }]],
  // Verificações não rodam se o código principal falhou
  ['nao_existe;', (m) => m.filter((x) => x.type === 'check').length === 0, [{ expression: '1', expected: '1' }]],
  // Verificações enxergam const/let do programa (reexecução com thunks)
  ['const resposta = 41;', (m) => {
    const c = m.filter((x) => x.type === 'check');
    return c.length === 1 && c[0].pass === true;
  }, [{ expression: 'resposta + 1', expected: '42' }]],
  // Verificações com estado (chamadas sequenciais veem mutações)
  ['let n = 0; function inc() { n = n + 1; return n; }', (m) => {
    const c = m.filter((x) => x.type === 'check');
    return c.length === 2 && c.every((x) => x.pass);
  }, [{ expression: 'inc()', expected: '1' }, { expression: 'inc()', expected: '2' }]],
];

let failures = 0;
for (const [source, check, checks] of cases) {
  const worker = makeWorker();
  let msgs;
  try {
    msgs = worker.run(source, checks);
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

// Testes de protocolo: trace e inspetor de streams
let extra = 0;
{
  extra += 1;
  const w = makeWorker();
  const m = w.run('function fib(n) { return n < 2 ? n : fib(n - 1) + fib(n - 2); }\ntrace("fib");\nfib(3);');
  const t = m.find((x) => x.type === 'trace');
  const r = m.find((x) => x.type === 'result');
  const ok = t && t.roots.length === 1 && t.roots[0].l === 'fib(3)' && t.roots[0].c.length === 2 && t.roots[0].v === '2' && r.text === '2';
  if (!ok) { failures += 1; console.error('FAIL trace:', JSON.stringify(t).slice(0, 200)); }
}
{
  extra += 1;
  const w = makeWorker();
  const m0 = w.run('stream(10, 20);');
  const r = m0.find((x) => x.type === 'result');
  const p1 = w.send({ streamNext: true });
  const p2 = w.send({ streamNext: true });
  const p3 = w.send({ streamNext: true });
  const ok = r.isStream === true &&
    p1[0].type === 'streamElement' && p1[0].text === '10' && p1[0].end === false &&
    p2[0].text === '20' && p2[0].end === true &&
    p3[0].end === true && p3[0].text === undefined;
  if (!ok) { failures += 1; console.error('FAIL stream inspector:', JSON.stringify([p1, p2, p3]).slice(0, 200)); }
}

// Painel "Ambiente": vinculações do nível do programa via reexecução muda
{
  extra += 1;
  const w = makeWorker();
  w.run('const size = 2;\nlet total = size * 3;\nfunction square(x) { return x * x; }\nconst p = pair(1, pair(2, null));\nsquare(size);');
  const m = w.send({ envRequest: true });
  const env = m.find((x) => x.type === 'env');
  const by = Object.fromEntries((env?.bindings || []).map((b) => [b.name, b]));
  const ok = env && env.bindings.length === 4 &&
    by.size.kind === 'const' && by.size.text === '2' && by.size.type === 'number' && by.size.inherited === false &&
    by.total.kind === 'let' && by.total.text === '6' &&
    by.square.kind === 'function' && by.square.text === 'função(x)' && by.square.type === 'função' &&
    by.p.type === 'par' && by.p.tree && by.p.tree.k === 'pair';
  if (!ok) { failures += 1; console.error('FAIL env:', JSON.stringify(env).slice(0, 300)); }
}
{
  // herdado da sessão: declarações antes de envOwnLine ganham inherited
  extra += 1;
  const w = makeWorker();
  const prefix = 'const herdado = 10;';
  const own = 'const proprio = herdado + 1;\nproprio;';
  const source = prefix + '\n' + own;
  w.send({ source, checks: [], envOwnLine: 1 });
  const m = w.send({ envRequest: true });
  const env = m.find((x) => x.type === 'env');
  const by = Object.fromEntries((env?.bindings || []).map((b) => [b.name, b]));
  const ok = env && by.herdado.inherited === true && by.proprio.inherited === false && by.proprio.text === '11';
  if (!ok) { failures += 1; console.error('FAIL env sessão:', JSON.stringify(env).slice(0, 300)); }
}
{
  // estado mutado persiste na reexecução (mesma semântica dos checks)
  extra += 1;
  const w = makeWorker();
  w.run('let saldo = 100;\nfunction saque(v) { saldo = saldo - v; return saldo; }\nsaque(30);');
  const m = w.send({ envRequest: true });
  const env = m.find((x) => x.type === 'env');
  const by = Object.fromEntries((env?.bindings || []).map((b) => [b.name, b]));
  const ok = env && by.saldo.text === '70';
  if (!ok) { failures += 1; console.error('FAIL env estado:', JSON.stringify(env).slice(0, 300)); }
}
{
  // programa sem declarações de nível superior
  extra += 1;
  const w = makeWorker();
  w.run('1 + 1;');
  const m = w.send({ envRequest: true });
  const env = m.find((x) => x.type === 'env');
  const ok = env && Array.isArray(env.bindings) && env.bindings.length === 0;
  if (!ok) { failures += 1; console.error('FAIL env vazio:', JSON.stringify(env).slice(0, 200)); }
}

if (failures) {
  console.error(`\n${failures}/${cases.length + extra} testes falharam`);
  process.exit(1);
}
console.log(`OK: ${cases.length + extra} testes de semântica do playground passaram`);
