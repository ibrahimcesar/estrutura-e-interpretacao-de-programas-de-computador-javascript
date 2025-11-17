import React, { useState } from 'react';
import styles from './ExerciseBox.module.css';

/**
 * Componente para exibir exercícios do SICP
 * Com funcionalidade de expandir/colapsar solução
 */
export default function ExerciseBox({ number, children, solution }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className={styles.exerciseBox}>
      <div className={styles.exerciseHeader}>
        <span className={styles.exerciseNumber}>Exercício {number}</span>
      </div>
      <div className={styles.exerciseContent}>
        {children}
      </div>
      {solution && (
        <div className={styles.solutionSection}>
          <button
            className={styles.solutionButton}
            onClick={() => setShowSolution(!showSolution)}
          >
            {showSolution ? '🔒 Ocultar Solução' : '🔓 Ver Solução'}
          </button>
          {showSolution && (
            <div className={styles.solutionContent}>
              {solution}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
