// Converte os capítulos .mdx/.md do livro para Markdown puro (pandoc-safe),
// na ordem de leitura, para a geração de EPUB/PDF. Emite os arquivos
// convertidos em ebooks/temp/converted/NNN-nome.md e imprime a lista em ordem.
import fs from 'node:fs';
import path from 'node:path';

const DOCS = 'docs';
const OUT = process.argv[2] || 'ebooks/temp/converted';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

function convert(text) {
  // remove frontmatter (pandoc leria como metadados e bagunçaria o título)
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  // remove imports MDX
  text = text.replace(/^import .*$\n?/gm, '');
  // playgrounds viram blocos de código
  text = text.replace(
    /<CodePlayground[\s\S]*?code=\{`([\s\S]*?)`\}[\s\S]*?\/>/g,
    (m, code) => '```javascript\n' + code.trim() + '\n```'
  );
  text = text.replace(/<CodePlayground[\s\S]*?\/>/g, ''); // sem code visível
  // soluções viram seções explícitas
  text = text.replace(/<Solution exercise="([\d.]+)">/g, '**Solução do exercício $1.**');
  text = text.replace(/<Solution[^>]*>/g, '**Solução.**');
  text = text.replace(/<\/Solution>/g, '');
  // exercícios em tag viram cabeçalhos
  text = text.replace(/<Exercise id="([\d.]+)">/g, '### Exercício $1');
  text = text.replace(/<\/Exercise>/g, '');
  // figuras viram imagens simples quando têm src; senão somem
  text = text.replace(/<Figure[\s\S]*?src="([^"]+)"[\s\S]*?caption="([^"]*)"[\s\S]*?\/>/g, '![$2](static$1)');
  text = text.replace(/<Figure[\s\S]*?\/>/g, '');
  // componentes de diagrama e utilitários: remove (com nota quando é diagrama)
  text = text.replace(/<(MemoryDiagram|CircuitDiagram|SignalFlowDiagram)[\s\S]*?(\/>|<\/\1>)/g, '*(diagrama interativo disponível na versão web)*');
  text = text.replace(/<HelpFooter\s*\/>/g, '');
  text = text.replace(/\{\/\*[\s\S]*?\*\/\}/g, '');
  // âncoras/HTML residuais simples
  text = text.replace(/<a name="[^"]*"><\/a>/g, '');
  // mermaid: pandoc não renderiza; vira nota
  text = text.replace(/```mermaid[\s\S]*?```/g, '*(diagrama disponível na versão web)*');
  return text;
}

const ordered = [];
const push = (p) => fs.existsSync(p) && ordered.push(p);

push(`${DOCS}/intro.md`);
push(`${DOCS}/prefaces/foreword84.md`);
push(`${DOCS}/prefaces/prefaces96.md`);
push(`${DOCS}/prefaces/prefaces03.md`);
for (let ch = 1; ch <= 5; ch += 1) {
  const dir = `${DOCS}/chapter-${ch}`;
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f) && !f.endsWith('.unconverted'))
    .sort((a, b) => a.replace(/\.mdx?$/, '').localeCompare(b.replace(/\.mdx?$/, ''), 'en', { numeric: true }));
  for (const f of files) push(path.join(dir, f));
}
push(`${DOCS}/referencias.md`);
push(`${DOCS}/agradecimentos.md`);
push(`${DOCS}/sobre-o-projeto.md`);
push(`${DOCS}/sobre-traducao-brasileira.md`);

const emitted = [];
ordered.forEach((file, index) => {
  const name = `${String(index).padStart(3, '0')}-${path.basename(file).replace(/\.mdx$/, '.md')}`;
  const outPath = path.join(OUT, name);
  fs.writeFileSync(outPath, convert(fs.readFileSync(file, 'utf8')));
  emitted.push(outPath);
});

console.error(`${emitted.length} arquivos convertidos em ${OUT}`);
console.log(emitted.join('\n'));
