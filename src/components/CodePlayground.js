import React, { useEffect } from 'react';
import { Sandpack } from "@codesandbox/sandpack-react";
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
 * @param {boolean} props.autorun - Executar automaticamente (padrão: true)
 * @param {number} props.height - Altura do editor (padrão: 300)
 */
export default function CodePlayground({
  code,
  hiddenCode,
  files,
  title = "Exemplo de Código",
  showLineNumbers = true,
  showConsole = true,
  autorun = true,
  height = 300,
}) {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? 'dark' : 'light';

  // Suprimir mensagens de debug do Sandpack
  useEffect(() => {
    const originalLog = console.log;
    const suppressedMessages = [
      'Injecting file system access api patch',
      'Injecting element creation patch',
      'First element creation parent found'
    ];

    console.log = function(...args) {
      const message = args[0];
      if (typeof message === 'string' && suppressedMessages.some(msg => message.includes(msg))) {
        return; // Suprimir essas mensagens
      }
      originalLog.apply(console, args);
    };

    return () => {
      console.log = originalLog; // Restaurar console.log original na limpeza
    };
  }, []);

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
          showConsoleButton: showConsole,
          showRefreshButton: true,
          showRunButton: true,
          editorHeight: height,
          autorun: autorun,
          autoReload: true,
          closableTabs: false,
          resizablePanels: true,
          editorWidthPercentage: 50,
        }}
        customSetup={{
          dependencies: {},
        }}
      />
    </div>
  );
}
