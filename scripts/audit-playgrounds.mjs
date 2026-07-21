/**
 * Auditoria dos blocos de código interativos dos docs.
 *
 * Extrai todos os <CodePlayground> de docs/**, executa cada um com a MESMA
 * semântica do site (WORKER_SOURCE real, prefixo de sessão incluindo
 * hiddenCode) e falha se qualquer bloco produzir um erro não esperado.
 *
 * Exceções intencionais (stubs de exercício em que o LEITOR implementa a
 * função) são listadas em EXPECTED_FAILURES.
 *
 * Uso: node scripts/audit-playgrounds.mjs
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WORKER_BODY = readFileSync(join(ROOT, 'src/components/playgroundWorker.js'), 'utf8');

// página → nomes de exercício cuja ausência é intencional (o leitor implementa)
const EXPECTED_FAILURES = {
  'chapter-3/3.1.1.mdx': ['make_accumulator', 'make_monitored', 'make_account'],
  'chapter-3/3.1.3.mdx': ['make_joint'],
};

function runProgram(source) {
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
  try {
    vm.runInContext('self.onmessage', ctx).call(null, { data: { source } }, );
  } catch (e) {
    return /timed out/.test(String(e.message)) ? 'TIMEOUT' : 'HOST: ' + e.message;
  }
  const err = messages.find((m) => m.type === 'error');
  return err ? err.text : null;
}

function mdxFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...mdxFiles(p));
    else if (/\.mdx?$/.test(name)) out.push(p);
  }
  return out;
}

let total = 0;
let expected = 0;
const failures = [];

for (const file of mdxFiles(join(ROOT, 'docs'))) {
  const rel = relative(join(ROOT, 'docs'), file);
  const src = readFileSync(file, 'utf8');
  if (!src.includes('<CodePlayground')) continue;
  const re = /<CodePlayground\b([\s\S]*?)\/>/g;
  const blocks = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const a = m[1];
    blocks.push({
      code: (a.match(/code=\{`([\s\S]*?)`\}/) || [])[1] ?? null,
      hidden: (a.match(/hiddenCode=\{`([\s\S]*?)`\}/) || [])[1] ?? null,
      session: (a.match(/session="([^"]*)"/) || [])[1] ?? null,
      line: src.slice(0, m.index).split('\n').length,
    });
  }
  blocks.forEach((block, i) => {
    if (block.code === null) {
      failures.push({ page: rel, line: block.line, err: 'prop code não extraível (crase no código?)' });
      return;
    }
    total += 1;
    const parts = [];
    if (block.session) {
      for (let j = 0; j < i; j += 1) {
        const prev = blocks[j];
        if (prev.session === block.session && prev.code !== null) {
          parts.push(prev.hidden ? prev.hidden + '\n' + prev.code : prev.code);
        }
      }
    }
    if (block.hidden) parts.push(block.hidden);
    parts.push(block.code);
    const err = runProgram(parts.join('\n'));
    if (!err) return;
    const allowed = EXPECTED_FAILURES[rel] ?? [];
    if (err.startsWith('ReferenceError') && allowed.some((name) => err.includes(name))) {
      expected += 1;
      return;
    }
    failures.push({ page: rel, line: block.line, err: err.slice(0, 90) });
  });
}

console.log(`blocos executados: ${total} | stubs de exercício esperados: ${expected} | falhas: ${failures.length}`);
for (const f of failures) {
  console.error(`  ${f.page}:${f.line}  ${f.err}`);
}
process.exit(failures.length ? 1 : 0);
