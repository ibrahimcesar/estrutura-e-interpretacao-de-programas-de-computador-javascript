import React from 'react';

/**
 * Marca um exercício do livro.
 *
 * O rótulo é um <h3> de verdade (não um div estilizado) para que a
 * navegação por cabeçalhos de leitores de tela encontre os exercícios
 * (A11Y-PLAN item 8). O id fica no cabeçalho — âncoras existentes
 * (#4.62) continuam funcionando.
 */
export default function Exercise({ id, children }) {
  return (
    <div
      style={{
        margin: '2rem 0',
        padding: '1rem',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '8px',
        backgroundColor: 'var(--ifm-color-emphasis-100)'
      }}
    >
      {id && (
        <h3
          id={id}
          style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            margin: '0 0 1rem',
            color: 'var(--sicp-text-accent)'
          }}
        >
          Exercício {id}
        </h3>
      )}
      <div>{children}</div>
    </div>
  );
}
