import React, { useRef } from 'react';
import { Highlight } from 'prism-react-renderer';
import { lightCodeTheme, darkCodeTheme } from '@site/src/lib/codeThemes';
import styles from './CodePlayground.module.css';

/**
 * Editor de código leve: um <textarea> transparente sobreposto a um <pre>
 * destacado pelo prism-react-renderer, ambos dentro do mesmo contêiner de
 * rolagem (mesma técnica do react-simple-code-editor, sem dependência extra).
 *
 * @param {Object} props
 * @param {string} props.code - Código atual
 * @param {(code: string) => void} props.onChange
 * @param {() => void} props.onRun - Disparado por Ctrl/Cmd+Enter
 * @param {boolean} props.isDark
 * @param {boolean} props.showLineNumbers
 * @param {number} props.maxHeight - Altura máxima; a altura real acompanha o código
 */
export default function PlaygroundEditor({
  code,
  onChange,
  onRun,
  isDark,
  showLineNumbers,
  maxHeight,
}) {
  const textareaRef = useRef(null);
  // Depois de Esc, o próximo Tab volta a mover o foco (convenção de
  // acessibilidade de editores embutidos); clique/foco rearma a captura.
  const tabCapturesRef = useRef(true);

  const insertText = (text) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    // execCommand preserva o histórico de desfazer nativo e dispara o
    // evento input (logo o onChange do React). Fallback manual se falhar.
    let inserted = false;
    try {
      inserted = document.execCommand('insertText', false, text);
    } catch (e) {
      inserted = false;
    }
    if (!inserted) {
      const { selectionStart, selectionEnd, value } = textarea;
      onChange(value.slice(0, selectionStart) + text + value.slice(selectionEnd));
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + text.length;
      });
    }
  };

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      onRun();
      return;
    }
    if (event.key === 'Escape') {
      tabCapturesRef.current = false;
      return;
    }
    if (event.key === 'Tab' && !event.shiftKey && tabCapturesRef.current) {
      event.preventDefault();
      insertText('  ');
    }
  };

  const rearmTab = () => {
    tabCapturesRef.current = true;
  };

  return (
    <Highlight
      code={code}
      language="javascript"
      theme={isDark ? darkCodeTheme : lightCodeTheme}
    >
      {({ tokens, getLineProps, getTokenProps, style }) => (
        <div
          className={styles.editorScroll}
          style={{ maxHeight, backgroundColor: style.backgroundColor }}
        >
          <div className={styles.editorInner}>
            <pre
              aria-hidden="true"
              className={`${styles.pre} ${styles.codeFont}`}
              style={{ color: style.color }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className={styles.line}>
                  {showLineNumbers && (
                    <span className={styles.lineNumber}>{i + 1}</span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
            <textarea
              ref={textareaRef}
              className={`${styles.textarea} ${styles.codeFont} ${
                showLineNumbers ? styles.textareaWithGutter : ''
              }`}
              style={{ caretColor: style.color }}
              value={code}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={handleKeyDown}
              onClick={rearmTab}
              onFocus={rearmTab}
              wrap="off"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="none"
              autoComplete="off"
              data-gramm="false"
              aria-label="Editor de código JavaScript (pressione Esc e depois Tab para sair)"
            />
          </div>
        </div>
      )}
    </Highlight>
  );
}
