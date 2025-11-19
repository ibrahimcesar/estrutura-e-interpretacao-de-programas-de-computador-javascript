import React from 'react';
import ReadingProgressBar from '@site/src/components/ReadingProgressBar';

/**
 * Root component wrapper
 * Adiciona a barra de progresso de leitura em todas as páginas
 */
export default function Root({ children }) {
  return (
    <>
      <ReadingProgressBar />
      {children}
    </>
  );
}
