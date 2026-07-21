// Renumera exercícios dos capítulos 4 e 5 para a numeração canônica da
// edição JS oficial (validada contra sicp.sourceacademy.org/json/*).
// Estrutural apenas: cabeçalhos "Exercício N", <Exercise id="N"> e
// <Solution exercise="N">. Referências em prosa são tratadas à parte.
import fs from 'node:fs';

const MAPS = {
  'docs/chapter-4/4.1.3.mdx': { '4.11': '4.9', '4.12': '4.10', '4.13': '4.11', '4.16': '4.12', '4.17': '4.13' },
  'docs/chapter-4/4.1.5.mdx': { '4.18': '4.15' },
  'docs/chapter-4/4.1.7.mdx': { '4.22': '4.20', '4.23': '4.21', '4.24': '4.22' },
  'docs/chapter-4/4.2.1.mdx': { '4.25': '4.23', '4.26': '4.24' },
  'docs/chapter-4/4.2.2.mdx': { '4.27': '4.25', '4.28': '4.26', '4.29': '4.27', '4.30': '4.28', '4.31': '4.29' },
  'docs/chapter-4/4.2.3.mdx': { '4.32': '4.30', '4.33': '4.31', '4.34': '4.32' },
  'docs/chapter-4/4.3.1.mdx': { '4.35': '4.33', '4.36': '4.34', '4.37': '4.35' },
  'docs/chapter-4/4.3.2.mdx': {
    '4.35': '4.36', '4.36': '4.37', '4.37': '4.38', '4.38': '4.39', '4.39': '4.40', '4.40': '4.41',
    '4.41': '4.42', '4.42': '4.43', '4.43': '4.44', '4.44': '4.45', '4.45': '4.46', '4.46': '4.47',
  },
  'docs/chapter-4/4.3.3.mdx': { '4.50': '4.48', '4.51': '4.49', '4.52': '4.50', '4.53': '4.51', '4.54': '4.52' },
  'docs/chapter-4/4.4.3.mdx': { '4.61': '4.62', '4.62': '4.63', '4.63': '4.64', '4.64': '4.65', '4.65': '4.66', '4.66': '4.67' },
  'docs/chapter-5/5.4.2.mdx': { '5.25': '5.22', '5.26': '5.23', '5.27': '5.24' },
  'docs/chapter-5/5.4.3.mdx': { '5.28': '5.25', '5.29': '5.26' },
  'docs/chapter-5/5.4.4.mdx': { '5.30': '5.27', '5.31': '5.28', '5.32': '5.29', '5.33': '5.30', '5.34': '5.31' },
  'docs/chapter-5/5.5.1.mdx': { '5.35': '5.32', '5.36': '5.33' },
  'docs/chapter-5/5.5.2.mdx': { '5.37': '5.34', '5.38': '5.35' },
  'docs/chapter-5/5.5.5.mdx': { '5.39': '5.36', '5.40': '5.37', '5.41': '5.38', '5.42': '5.39', '5.43': '5.40', '5.44': '5.41' },
  'docs/chapter-5/5.5.6.mdx': { '5.45': '5.42', '5.46': '5.43', '5.47': '5.44', '5.48': '5.45', '5.49': '5.46', '5.50': '5.47' },
  'docs/chapter-5/5.5.7.mdx': {
    '5.51': '5.48', '5.52': '5.49', '5.53': '5.50', '5.54': '5.51',
    '5.55': '5.52', '5.56': '5.53', '5.57': '5.54', '5.58': '5.55',
  },
};

const esc = (n) => n.replace('.', '\\.');

for (const [file, map] of Object.entries(MAPS)) {
  let text = fs.readFileSync(file, 'utf8');
  let hits = 0;
  // fase 1: OLD -> marcador (evita colisões entre pares do mesmo arquivo)
  for (const [oldN, newN] of Object.entries(map)) {
    const patterns = [
      [new RegExp(`(#{2,4} Exercício )${esc(oldN)}(?=\\s*$)`, 'gm'), `$1@@${newN}@@`],
      [new RegExp(`(<Exercise id=")${esc(oldN)}(")`, 'g'), `$1@@${newN}@@$2`],
      [new RegExp(`(<Solution exercise=")${esc(oldN)}(")`, 'g'), `$1@@${newN}@@$2`],
    ];
    for (const [re, replacement] of patterns) {
      const found = text.match(re);
      hits += found ? found.length : 0;
      text = text.replace(re, replacement);
    }
  }
  // fase 2: remove marcadores
  text = text.replace(/@@(\d+\.\d+)@@/g, '$1');
  fs.writeFileSync(file, text);
  console.log(`${file}: ${hits} renumerações`);
}
