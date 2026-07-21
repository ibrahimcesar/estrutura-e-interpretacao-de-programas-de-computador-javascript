// Gera src/data/exercises.json: a lista de todos os exercícios do livro
// (número + página), varrendo os cabeçalhos "Exercício N.M" e as tags
// <Exercise id="N.M"> dos capítulos. A página /progresso usa esse manifesto
// como denominador do progresso do leitor.
import fs from 'node:fs';
import path from 'node:path';

const root = 'docs';
const exercises = [];
const seen = new Set();

for (const dir of fs.readdirSync(root).filter((d) => d.startsWith('chapter-')).sort()) {
  for (const file of fs.readdirSync(path.join(root, dir)).sort()) {
    if (!/\.mdx?$/.test(file)) continue;
    const text = fs.readFileSync(path.join(root, dir, file), 'utf8');
    const page = `/${dir}/${file.replace(/\.mdx?$/, '')}`;
    for (const match of text.matchAll(
      /^#{2,4}\s+Exercício\s+(\d+\.\d+)|<Exercise id="(\d+\.\d+)"/gm
    )) {
      const number = match[1] || match[2];
      if (seen.has(number)) {
        console.error(`número duplicado: ${number} em ${page}`);
        process.exit(1);
      }
      seen.add(number);
      // âncora: cabeçalhos viram slug do Docusaurus; tags <Exercise> usam o id cru
      const anchor = match[1] ? `exercício-${number.replace('.', '')}` : number;
      exercises.push({ n: number, page, anchor });
    }
  }
}

exercises.sort((a, b) => {
  const [aC, aN] = a.n.split('.').map(Number);
  const [bC, bN] = b.n.split('.').map(Number);
  return aC - bC || aN - bN;
});

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/exercises.json', JSON.stringify(exercises, null, 2) + '\n');

const byChapter = {};
for (const e of exercises) {
  const c = e.n.split('.')[0];
  byChapter[c] = (byChapter[c] || 0) + 1;
}
console.log('exercícios:', exercises.length, byChapter);
