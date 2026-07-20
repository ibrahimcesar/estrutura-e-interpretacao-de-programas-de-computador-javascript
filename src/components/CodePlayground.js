import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import PlaygroundEditor from './PlaygroundEditor';
import { createRunner } from './playgroundRunner';
import { registerBlock, getSessionPrefix } from './playgroundSession';
import styles from './CodePlayground.module.css';

const RUN_TIMEOUT_MS = 5000;
const MAX_RENDERED_ENTRIES = 200;

const ENTRY_CLASS = {
  log: 'entryLog',
  warn: 'entryWarn',
  error: 'entryError',
  result: 'entryResult',
  status: 'entryStatus',
};

/**
 * Playground de Código Interativo
 *
 * Permite ver, editar e executar JavaScript diretamente no navegador, com
 * semântica de REPL: o valor da última instrução de expressão é exibido
 * (137 + 349; → 486), junto com a saída de console.log e erros. O código
 * roda em um Web Worker descartável, então laços/recursões infinitas são
 * interrompidos por timeout sem congelar a página.
 *
 * @param {Object} props
 * @param {string} props.code - Código JavaScript exibido no editor
 * @param {string} props.hiddenCode - Código auxiliar oculto (funções de dependência)
 * @param {string} props.session - Blocos da mesma página com a mesma session compartilham o ambiente: declarações dos blocos anteriores valem nos seguintes
 * @param {Array<{name: string, code: string, hidden?: boolean}>} props.files - Descontinuado; usa o primeiro arquivo visível
 * @param {string} props.title - Título do exemplo (null oculta a barra)
 * @param {boolean} props.showLineNumbers - Mostrar números de linha (padrão: true)
 * @param {boolean} props.showConsole - Mostrar saída de console.log/warn (padrão: true)
 * @param {boolean} props.autorun - Executar automaticamente ao carregar (padrão: false)
 * @param {number} props.height - Altura do editor (padrão: 300)
 */
export default function CodePlayground({
  code,
  hiddenCode,
  session,
  files,
  title = "Exemplo de Código",
  showLineNumbers = true,
  showConsole = true,
  autorun = false,
  height = 300,
}) {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  let initialCode = code;
  if (initialCode == null && Array.isArray(files) && files.length > 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        'CodePlayground: a prop "files" foi descontinuada; usando o primeiro arquivo visível.'
      );
    }
    initialCode = (files.find((f) => !f.hidden) || files[0]).code;
  }
  initialCode = initialCode || '';

  const [editorCode, setEditorCode] = useState(initialCode);
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | running | done

  const runnerRef = useRef(null); // { worker, timer }
  const pendingRef = useRef([]);
  const rafRef = useRef(null);
  const entryCountRef = useRef(0);

  // Identidade estável do bloco na sessão; devolve sempre o programa atual
  // do bloco (hiddenCode + código do editor).
  const editorCodeRef = useRef(editorCode);
  editorCodeRef.current = editorCode;
  const hiddenCodeRef = useRef(hiddenCode);
  hiddenCodeRef.current = hiddenCode;
  const getCodeRef = useRef(null);
  if (getCodeRef.current === null) {
    getCodeRef.current = () =>
      hiddenCodeRef.current
        ? hiddenCodeRef.current + '\n' + editorCodeRef.current
        : editorCodeRef.current;
  }
  const sessionKeyRef = useRef(null);

  useEffect(() => {
    if (!session) return undefined;
    const key = window.location.pathname + '::' + session;
    sessionKeyRef.current = key;
    return registerBlock(key, getCodeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const flushEntries = () => {
    rafRef.current = null;
    const batch = pendingRef.current;
    pendingRef.current = [];
    if (batch.length === 0) return;
    setEntries((prev) => {
      if (prev.length > MAX_RENDERED_ENTRIES) return prev;
      const next = prev.concat(batch);
      if (next.length > MAX_RENDERED_ENTRIES) {
        return next
          .slice(0, MAX_RENDERED_ENTRIES)
          .concat({ kind: 'status', text: '— saída truncada —' });
      }
      return next;
    });
  };

  const pushEntry = (entry) => {
    entryCountRef.current += 1;
    pendingRef.current.push(entry);
    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(flushEntries);
    }
  };

  const stopRunner = () => {
    const current = runnerRef.current;
    if (current) {
      current.worker.onmessage = null;
      current.worker.terminate();
      clearTimeout(current.timer);
      runnerRef.current = null;
    }
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    pendingRef.current = [];
  };

  useEffect(() => stopRunner, []);

  const run = () => {
    stopRunner();
    setEntries([]);
    entryCountRef.current = 0;
    setStatus('running');

    const parts = [];
    if (session && sessionKeyRef.current) {
      const prefix = getSessionPrefix(sessionKeyRef.current, getCodeRef.current);
      if (prefix) parts.push(prefix);
    }
    if (hiddenCode) parts.push(hiddenCode);
    parts.push(editorCode);
    const source = parts.join('\n');

    const handleMessage = (worker) => (msg) => {
      if (runnerRef.current == null || runnerRef.current.worker !== worker) return;
      switch (msg.type) {
        case 'log':
        case 'warn':
          if (showConsole) pushEntry({ kind: msg.type, text: msg.text });
          break;
        case 'error':
          pushEntry({ kind: 'error', text: msg.text });
          break;
        case 'result':
          if (!msg.isUndefined) pushEntry({ kind: 'result', text: msg.text });
          break;
        case 'truncated':
          pushEntry({ kind: 'status', text: '— saída truncada —' });
          break;
        case 'done':
          clearTimeout(runnerRef.current.timer);
          if (entryCountRef.current === 0) {
            pushEntry({ kind: 'status', text: '✓ Executado (nenhum valor a exibir)' });
          }
          setStatus('done');
          // O worker fica vivo até a próxima execução (ou desmontagem)
          // para que logs assíncronos tardios ainda apareçam.
          break;
        default:
          break;
      }
    };

    const worker = createRunner(source, (msg) => handleMessage(worker)(msg));
    const timer = setTimeout(() => {
      if (runnerRef.current == null || runnerRef.current.worker !== worker) return;
      stopRunner();
      pushEntry({
        kind: 'error',
        text:
          'Tempo de execução esgotado (5 segundos). A execução foi interrompida — ' +
          'verifique se há recursão ou laço infinito.',
      });
      setStatus('done');
    }, RUN_TIMEOUT_MS);
    runnerRef.current = { worker, timer };
  };

  const reset = () => {
    stopRunner();
    setEditorCode(initialCode);
    setEntries([]);
    setStatus('idle');
  };

  useEffect(() => {
    if (autorun) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edited = editorCode !== initialCode;

  return (
    <div className={styles.wrapper}>
      {title && <div className={styles.titleBar}>{title}</div>}
      <PlaygroundEditor
        code={editorCode}
        onChange={setEditorCode}
        onRun={run}
        isDark={isDark}
        showLineNumbers={showLineNumbers}
        height={height}
      />
      <div className={styles.toolbar}>
        <button
          type="button"
          className="button button--primary button--sm"
          onClick={run}
          disabled={status === 'running'}
        >
          {status === 'running' ? 'Executando…' : '▶ Executar'}
        </button>
        {edited && (
          <button
            type="button"
            className="button button--secondary button--outline button--sm"
            onClick={reset}
          >
            Restaurar
          </button>
        )}
        <span className={styles.hint}>Código editável · Ctrl+Enter executa</span>
      </div>
      {status !== 'idle' && (
        <div className={styles.output} aria-live="polite">
          {entries.map((entry, index) => (
            <div key={index} className={styles[ENTRY_CLASS[entry.kind]]}>
              {entry.kind === 'result' && (
                <span className={styles.resultPrompt}>{'› '}</span>
              )}
              {entry.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
