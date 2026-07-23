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

export interface ExmarkChangeDetail {
  exercise: string;
  marked: boolean;
}

export function isMarked(exercise: string): boolean {
  try {
    return localStorage.getItem(PREFIX + exercise) !== null;
  } catch {
    return false;
  }
}

export function setMarked(exercise: string, marked: boolean): void {
  try {
    if (marked) localStorage.setItem(PREFIX + exercise, new Date().toISOString());
    else localStorage.removeItem(PREFIX + exercise);
    window.dispatchEvent(
      new CustomEvent<ExmarkChangeDetail>(CHANGE_EVENT, { detail: { exercise, marked } })
    );
  } catch {
    // sem persistência disponível (modo privado etc.)
  }
}

export function allMarked(): Set<string> {
  const marked = new Set<string>();
  try {
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) marked.add(key.slice(PREFIX.length));
    }
  } catch {
    // sem persistência disponível
  }
  return marked;
}
