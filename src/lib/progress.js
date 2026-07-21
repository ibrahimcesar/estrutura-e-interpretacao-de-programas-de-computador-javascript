/**
 * Progresso do leitor nos exercícios, persistido em localStorage.
 *
 * Cada exercício resolvido vira uma chave `exmark:<número>` (ex.:
 * `exmark:1.3`) com a data ISO. A marcação é manual (checkbox na
 * solução) ou automática (todas as verificações de um exercício com
 * `checks` passam). Um evento `exmark-change` é disparado na janela a
 * cada mudança, para que a página /progresso reaja em tempo real.
 */

const PREFIX = 'exmark:';
export const CHANGE_EVENT = 'exmark-change';

export function isMarked(exercise) {
  try {
    return localStorage.getItem(PREFIX + exercise) !== null;
  } catch (ignored) {
    return false;
  }
}

export function setMarked(exercise, marked) {
  try {
    if (marked) localStorage.setItem(PREFIX + exercise, new Date().toISOString());
    else localStorage.removeItem(PREFIX + exercise);
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { exercise, marked } }));
  } catch (ignored) {
    // sem persistência disponível (modo privado etc.)
  }
}

export function allMarked() {
  const marked = new Set();
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) marked.add(key.slice(PREFIX.length));
    }
  } catch (ignored) {
    // sem persistência disponível
  }
  return marked;
}
