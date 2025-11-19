import React from 'react';
import CodePlayground from './CodePlaygroundLazy';

/**
 * Componente para código inline executável
 * Versão simplificada do CodePlayground para snippets menores
 */
export default function InlineCode({ children }) {
  return (
    <CodePlayground
      code={children}
      title={null}
      height={200}
      showLineNumbers={false}
      autorun={false}
    />
  );
}
