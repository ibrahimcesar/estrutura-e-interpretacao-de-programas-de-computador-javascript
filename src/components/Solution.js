import React, { useEffect, useState } from 'react';
import { track } from '@site/src/lib/analytics';
import { isMarked, setMarked, CHANGE_EVENT } from '@site/src/lib/progress';
import styles from './Solution.module.css';

/**
 * Solução oficial de um exercício, escondida atrás de um spoiler.
 *
 * O atrito é proposital: o valor pedagógico do exercício está em tentar
 * antes. O conteúdo é MDX comum — prosa, KaTeX e blocos <CodePlayground>
 * funcionam normalmente aqui dentro (e são executados pela auditoria).
 *
 * A prop `exercise` ("1.3") liga a solução ao progresso do leitor: um
 * checkbox "resolvi" persiste a conquista, que aparece em /progresso.
 *
 * Registrado globalmente em src/theme/MDXComponents.js — as páginas não
 * precisam importar.
 */
export default function Solution({ children, title = 'solução', exercise }) {
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    if (!exercise) return undefined;
    setSolved(isMarked(exercise));
    const sync = (event) => {
      if (event.detail?.exercise === exercise) setSolved(event.detail.marked);
    };
    window.addEventListener(CHANGE_EVENT, sync);
    return () => window.removeEventListener(CHANGE_EVENT, sync);
  }, [exercise]);

  const handleToggle = (event) => {
    if (event.target.open) track('solution_open', exercise ? { exercise } : {});
  };

  const handleMark = (event) => {
    const marked = event.target.checked;
    setMarked(exercise, marked);
    if (marked) track('exercise_marked', { exercise });
  };

  return (
    <div>
      <details className={styles.solution} onToggle={handleToggle}>
        <summary className={styles.summary}>
          <span className={styles.closedLabel}>💡 Mostrar {title} — tente primeiro!</span>
          <span className={styles.openLabel}>💡 Esconder {title}</span>
        </summary>
        <div className={styles.body}>{children}</div>
      </details>
      {exercise && (
        <label className={styles.markRow}>
          <input type="checkbox" checked={solved} onChange={handleMark} />
          <span>
            {solved ? `Exercício ${exercise} resolvido ✓` : `Resolvi o exercício ${exercise}`}
          </span>
        </label>
      )}
    </div>
  );
}
