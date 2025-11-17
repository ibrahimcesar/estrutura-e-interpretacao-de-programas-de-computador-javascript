import React from 'react';
import { Sandpack } from "@sandpack/react";
import { nightOwl, aquaBlue } from "@sandpack/themes";
import { useColorMode } from '@docusaurus/theme-common';

/**
 * Componente de Playground de Código Interativo
 *
 * Permite executar código JavaScript diretamente no navegador
 * usando Sandpack (CodeSandbox).
 *
 * @param {Object} props
 * @param {string} props.code - Código JavaScript a ser executado
 * @param {string} props.title - Título do exemplo (opcional)
 * @param {boolean} props.showLineNumbers - Mostrar números de linha (padrão: true)
 * @param {boolean} props.showConsole - Mostrar console (padrão: true)
 * @param {boolean} props.autorun - Executar automaticamente (padrão: false)
 * @param {number} props.height - Altura do editor (padrão: 300)
 */
export default function CodePlayground({
  code,
  title = "Exemplo de Código",
  showLineNumbers = true,
  showConsole = true,
  autorun = false,
  height = 300,
}) {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? nightOwl : aquaBlue;

  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <div style={{
          padding: '0.5rem 1rem',
          background: 'var(--ifm-color-primary)',
          color: 'white',
          fontWeight: 'bold',
          borderRadius: '8px 8px 0 0'
        }}>
          {title}
        </div>
      )}
      <Sandpack
        template="vanilla"
        files={{
          "/index.js": {
            code: code,
            active: true,
          },
        }}
        theme={theme}
        options={{
          showNavigator: false,
          showLineNumbers: showLineNumbers,
          showInlineErrors: true,
          showConsole: showConsole,
          showConsoleButton: true,
          editorHeight: height,
          autorun: autorun,
          closableTabs: false,
        }}
        customSetup={{
          dependencies: {},
        }}
      />
    </div>
  );
}
