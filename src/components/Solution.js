import React from 'react';
import styles from './Solution.module.css';

/**
 * Solução oficial de um exercício, escondida atrás de um spoiler.
 *
 * O atrito é proposital: o valor pedagógico do exercício está em tentar
 * antes. O conteúdo é MDX comum — prosa, KaTeX e blocos <CodePlayground>
 * funcionam normalmente aqui dentro (e são executados pela auditoria).
 *
 * Registrado globalmente em src/theme/MDXComponents.js — as páginas não
 * precisam importar.
 */
export default function Solution({ children, title = 'solução' }) {
  return (
    <details className={styles.solution}>
      <summary className={styles.summary}>
        <span className={styles.closedLabel}>💡 Mostrar {title} — tente primeiro!</span>
        <span className={styles.openLabel}>💡 Esconder {title}</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
