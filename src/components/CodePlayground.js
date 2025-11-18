import React from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
import { nightOwl, aquaBlue } from "@codesandbox/sandpack-react";
import { useColorMode } from '@docusaurus/theme-common';

/**
 * Componente de Playground de Código Interativo
 *
 * Permite executar código JavaScript diretamente no navegador
 * usando Sandpack (CodeSandbox).
 *
 * @param {Object} props
 * @param {string} props.code - Código JavaScript a ser executado (para uso simples)
 * @param {string} props.hiddenCode - Código auxiliar oculto (funções de dependência)
 * @param {Array<{name: string, code: string, hidden?: boolean}>} props.files - Array de arquivos para uso avançado
 * @param {string} props.title - Título do exemplo (opcional)
 * @param {boolean} props.showLineNumbers - Mostrar números de linha (padrão: true)
 * @param {boolean} props.showConsole - Mostrar console (padrão: true)
 * @param {boolean} props.autorun - Executar automaticamente (padrão: false)
 * @param {number} props.height - Altura do editor (padrão: 300)
 */
export default function CodePlayground({
  code,
  hiddenCode,
  files,
  title = "Exemplo de Código",
  showLineNumbers = true,
  showConsole = true,
  autorun = false,
  height = 300,
}) {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? nightOwl : aquaBlue;

  // Construir estrutura de arquivos baseado nas props
  let sandpackFiles;

  if (files) {
    // Modo avançado: usar array de arquivos
    sandpackFiles = {};
    let hasActiveFile = false;

    files.forEach((file) => {
      const fileName = file.name.startsWith('/') ? file.name : `/${file.name}`;
      const isActive = !file.hidden && !hasActiveFile;
      if (isActive) hasActiveFile = true;

      sandpackFiles[fileName] = {
        code: file.code,
        hidden: file.hidden || false,
        active: isActive,
      };
    });
  } else {
    // Modo simples: usar code e hiddenCode
    sandpackFiles = {};

    // Adicionar arquivo oculto com dependências, se fornecido
    if (hiddenCode) {
      sandpackFiles["/helpers.js"] = {
        code: hiddenCode,
        hidden: true,
      };
    }

    // Adicionar arquivo principal
    sandpackFiles["/index.js"] = {
      code: code || "",
      active: true,
    };
  }

  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <div style={{
          padding: '0.5rem 1rem',
          background: 'var(--ifm-color-primary)',
          color: 'black',
          fontWeight: 'bold',
          borderRadius: '8px 8px 0 0'
        }}>
          {title}
        </div>
      )}
      <Sandpack
        template="vanilla"
        files={sandpackFiles}
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
