import React from 'react';

/**
 * Componente simples para marcar exercícios
 * Similar ao ExerciseBox mas mais simples para compatibilidade
 */
export default function Exercise({ id, children }) {
  return (
    <div
      id={id}
      style={{
        margin: '2rem 0',
        padding: '1rem',
        border: '2px solid var(--ifm-color-primary)',
        borderRadius: '8px',
        backgroundColor: 'var(--ifm-color-emphasis-100)'
      }}
    >
      {id && (
        <div style={{
          fontWeight: 'bold',
          marginBottom: '1rem',
          color: 'var(--ifm-color-primary)'
        }}>
          Exercício {id}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
