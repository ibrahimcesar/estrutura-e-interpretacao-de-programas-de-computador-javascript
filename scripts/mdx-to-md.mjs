// Converte os capítulos .mdx/.md do livro para Markdown puro (pandoc-safe),
// na ordem de leitura, para a geração de EPUB/PDF. Emite os arquivos
// convertidos em ebooks/temp/converted/NNN-nome.md e imprime a lista em ordem.
import fs from 'node:fs';
import path from 'node:path';

const DOCS = 'docs';
const OUT = process.argv[2] || 'ebooks/temp/converted';
// --sem-exercicios: versão de leitura corrida, sem exercícios nem soluções
const STRIP_EXERCISES = process.argv.includes('--sem-exercicios');
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Remove exercícios: tags <Exercise>…</Exercise> e seções iniciadas por um
// cabeçalho "Exercício N" (ou "Exercício adicional"), até o próximo
// cabeçalho que não seja de exercício.
function stripExercises(text) {
  text = text.replace(/<Exercise[\s\S]*?<\/Exercise>\n?/g, '');
  const lines = text.split('\n');
  const out = [];
  let dropping = false;
  for (const line of lines) {
    const heading = /^#{1,4}\s+(.*)$/.exec(line);
    if (heading) {
      const isExercise = /^Exerc[íi]cio(s\b|\s+\d|\s+adicional)/.test(heading[1]);
      dropping = isExercise;
    } else if (/^\*\*Exerc[íi]cio\s+\d/.test(line)) {
      // exercícios em negrito (formato antigo dos capítulos 2 e 3.3.x)
      dropping = true;
    }
    if (!dropping) out.push(line);
  }
  return out.join('\n');
}

function convert(text) {
  // remove frontmatter (pandoc leria como metadados e bagunçaria o título)
  text = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  if (STRIP_EXERCISES) text = stripExercises(text);
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
  // imagens com caminho absoluto do site -> caminho do repositório
  text = text.replace(/\]\(\/img\//g, '](static/img/');
  text = text.replace(/src="\/img\//g, 'src="static/img/');
  // mermaid: pandoc não renderiza; vira nota
  text = text.replace(/```mermaid[\s\S]*?```/g, '*(diagrama disponível na versão web)*');
  // align* dentro de $$ é válido no KaTeX, mas aninhamento errôneo no LaTeX;
  // aligned funciona nos dois
  text = text.replace(/\\begin\{align\*?\}/g, '\\begin{aligned}');
  text = text.replace(/\\end\{align\*?\}/g, '\\end{aligned}');
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
