// Gera docs/solucoes.md a partir do manifesto src/data/exercises.json.
// Rode generate-exercises-data.mjs antes.
import fs from 'node:fs';

const exercises = JSON.parse(fs.readFileSync('src/data/exercises.json', 'utf8'));

const byChapter = new Map();
for (const e of exercises) {
  const ch = e.n.split('.')[0];
  if (!byChapter.has(ch)) byChapter.set(ch, new Map());
  const sections = byChapter.get(ch);
  const section = e.page.split('/').pop();
  if (!sections.has(section)) sections.set(section, []);
  sections.get(section).push(e);
}

const total = exercises.length;
let out = `---
title: Soluções dos Exercícios
sidebar_label: Soluções
---

# Soluções dos Exercícios

**Todos os ${total} exercícios do livro têm solução oficial**, escondida atrás de um botão **"Mostrar solução — tente primeiro!"** — o valor do exercício está em tentar antes de olhar. As soluções com código são executáveis na própria página e verificadas automaticamente a cada mudança no site. A numeração segue a [edição JS oficial](https://sourceacademy.org/sicpjs/index), então você pode usar este índice para navegar entre as duas edições.

Acompanhe o que você já resolveu na página [Progresso](/progresso) — cada solução tem uma caixa "resolvi este exercício".

## Cobertura

| Capítulo | Soluções |
| --- | --- |
`;

for (const [ch, sections] of byChapter) {
  const n = [...sections.values()].reduce((acc, list) => acc + list.length, 0);
  out += `| Capítulo ${ch} | ✅ ${n}/${n} exercícios |\n`;
}

out += `
> A tradução é uma edição resumida: seções não traduzidas da edição original têm exercícios que ainda não aparecem aqui. Os números acima cobrem **todos** os exercícios presentes na tradução.
`;

for (const [ch, sections] of byChapter) {
  out += `\n## Capítulo ${ch}\n\n`;
  for (const [section, list] of sections) {
    const links = list
      .map((e) => `[${e.n}](${e.page}#${e.anchor})`)
      .join(', ');
    out += `- **Seção ${section}**: exercícios ${links}\n`;
  }
}

out += `\nAchou um erro numa solução, ou tem uma solução mais elegante? [Abra uma issue](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) — soluções também são texto vivo.\n`;

fs.writeFileSync('docs/solucoes.md', out);
console.log(`docs/solucoes.md: ${total} exercícios, ${byChapter.size} capítulos`);
