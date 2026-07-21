// Anota cada <Solution> com o número do exercício imediatamente anterior
// (cabeçalho "Exercício N.M" ou <Exercise id="N.M">), ligando a solução ao
// progresso do leitor em /progresso. Idempotente: tags já anotadas não mudam.
import fs from 'node:fs';
import path from 'node:path';

const root = 'docs';
let annotated = 0;
const orphans = [];

for (const dir of fs.readdirSync(root).filter((d) => d.startsWith('chapter-'))) {
  for (const file of fs.readdirSync(path.join(root, dir))) {
    if (!/\.mdx?$/.test(file)) continue;
    const filePath = path.join(root, dir, file);
    const lines = fs.readFileSync(filePath, 'utf8').split('\n');
    let current = null;
    let changed = false;
    for (let i = 0; i < lines.length; i += 1) {
      const heading =
        lines[i].match(/^#{2,4}\s+Exercício\s+(\d+\.\d+)/) ||
        lines[i].match(/<Exercise id="(\d+\.\d+)"/);
      if (heading) current = heading[1];
      // exercícios "adicionais" (sem número canônico) ficam sem atributo
      if (/^#{2,4}\s+Exercício adicional/.test(lines[i])) current = 'ADICIONAL';
      if (/^<Solution exercise=/.test(lines[i].trim())) current = null;
      if (lines[i].trim() === '<Solution>') {
        if (current === 'ADICIONAL') {
          current = null;
          continue;
        }
        if (!current) {
          orphans.push(`${filePath}:${i + 1}`);
          continue;
        }
        lines[i] = lines[i].replace('<Solution>', `<Solution exercise="${current}">`);
        annotated += 1;
        changed = true;
        current = null; // uma solução por exercício
      }
    }
    if (changed) fs.writeFileSync(filePath, lines.join('\n'));
  }
}

console.log(`anotadas: ${annotated}`);
if (orphans.length) {
  console.error('SEM exercício anterior:', orphans);
  process.exit(1);
}
