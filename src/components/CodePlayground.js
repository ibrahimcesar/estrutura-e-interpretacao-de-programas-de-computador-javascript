import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import PlaygroundEditor from './PlaygroundEditor';
import BoxPointerDiagram from './BoxPointerDiagram';
import CallTreeDiagram from './CallTreeDiagram';
import { createRunner } from './playgroundRunner';
import { registerBlock, getSessionPrefix } from './playgroundSession';
import { track } from '@site/src/lib/analytics';
import { setMarked } from '@site/src/lib/progress';
import styles from './CodePlayground.module.css';

const RUN_TIMEOUT_MS = 5000;
const RETRY_TIMEOUT_MS = 30000;
const MAX_RENDERED_ENTRIES = 200;

const ENTRY_CLASS = {
  log: 'entryLog',
  warn: 'entryWarn',
  error: 'entryError',
  result: 'entryResult',
  status: 'entryStatus',
  checkPass: 'entryCheckPass',
  checkFail: 'entryCheckFail',
};

// Dicas em português para os erros mais comuns entre iniciantes.
function withHint(text) {
  if (text.includes('Maximum call stack size exceeded')) {
    return text + ' — dica: a recursão tem um caso base que é alcançado?';
  }
  if (text.startsWith('ReferenceError') && text.includes('is not defined')) {
    return text + ' — dica: o nome precisa ser declarado antes de usar (se for um exercício, implemente-o neste bloco)';
  }
  return text;
}

function formatElapsed(ms) {
  if (ms < 1) return '<1 ms';
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

// Chave estável por bloco para persistir edições do leitor: página + hash
// do código original + ordem de ocorrência (páginas repetem trechos).
const occurrenceCounters = new Map();

function simpleHash(text) {
  let h = 5381;
  for (let i = 0; i < text.length; i += 1) h = ((h << 5) + h + text.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

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
 * @param {Array<{expression: string, expected: string}>} props.checks - Verificações de exercício: cada expressão é avaliada após o código e comparada ao valor esperado
 * @param {string} props.exercise - Número do exercício ("3.1"); quando todas as verificações passam, ele é marcado como resolvido em /progresso
 * @param {Array<{name: string, code: string, hidden?: boolean}>} props.files - Descontinuado; usa o primeiro arquivo visível
 * @param {string} props.title - Título do exemplo (null oculta a barra)
 * @param {boolean} props.showLineNumbers - Mostrar números de linha (padrão: true)
 * @param {boolean} props.showConsole - Mostrar saída de console.log/warn (padrão: true)
 * @param {boolean} props.autorun - Executar automaticamente ao carregar (padrão: false)
 * @param {number} props.height - Altura máxima do editor (padrão: 300); a altura real acompanha o código
 */
export default function CodePlayground({
  code,
  hiddenCode,
  session,
  checks,
  exercise,
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
  const [elapsedMs, setElapsedMs] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [lastTree, setLastTree] = useState(null);
  const [showDiagram, setShowDiagram] = useState(false);
  const [traceData, setTraceData] = useState(null);
  const [showTrace, setShowTrace] = useState(false);
  const [streamActive, setStreamActive] = useState(false);
  const [envData, setEnvData] = useState(null);
  const [showEnv, setShowEnv] = useState(false);
  const [envTreeName, setEnvTreeName] = useState(null);
  const pullTimerRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const runnerRef = useRef(null); // { worker, timer }
  const pendingRef = useRef([]);
  const rafRef = useRef(null);
  const entryCountRef = useRef(0);
  const saveTimerRef = useRef(null);
  const storageKeyRef = useRef(null);
  const wrapperRef = useRef(null);
  const blockIdRef = useRef(null);
  const checkStatsRef = useRef({ pass: 0, fail: 0 });
  const errorSeenRef = useRef(false);

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

  // Persistência das edições do leitor (por bloco, neste navegador).
  useEffect(() => {
    const base = window.location.pathname + '|' + simpleHash(initialCode);
    const occurrence = occurrenceCounters.get(base) || 0;
    occurrenceCounters.set(base, occurrence + 1);
    const key = `pgcode:${base}:${occurrence}`;
    storageKeyRef.current = key;
    try {
      const saved = localStorage.getItem(key);
      if (saved !== null && saved !== initialCode) setEditorCode(saved);
    } catch (ignored) {
      // localStorage indisponível (modo privado etc.)
    }
    // Âncora estável do bloco (para links diretos e compartilhamento)
    const blockId = 'pg-' + simpleHash(base + ':' + occurrence);
    blockIdRef.current = blockId;
    if (wrapperRef.current) wrapperRef.current.id = blockId;
    // #pg-xxxx rola até o bloco; #pg-xxxx=<código> também carrega o código
    const hash = window.location.hash;
    if (hash === '#' + blockId || hash.startsWith('#' + blockId + '=')) {
      const encoded = hash.slice(blockId.length + 2);
      if (encoded) {
        try {
          const b64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
          setEditorCode(decodeURIComponent(escape(atob(b64))));
        } catch (ignored) {
          // hash malformado: ignora
        }
      }
      setTimeout(() => wrapperRef.current?.scrollIntoView({ block: 'center' }), 100);
    }
    return () => {
      occurrenceCounters.set(base, (occurrenceCounters.get(base) || 1) - 1);
      clearTimeout(saveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCodeChange = (nextCode) => {
    setEditorCode(nextCode);
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      const key = storageKeyRef.current;
      if (!key) return;
      try {
        if (nextCode === initialCode) localStorage.removeItem(key);
        else localStorage.setItem(key, nextCode);
      } catch (ignored) {
        // sem persistência disponível
      }
    }, 400);
  };

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

  useEffect(() => () => {
    stopRunner();
    clearTimeout(pullTimerRef.current);
  }, []);

  const run = (timeoutMs = RUN_TIMEOUT_MS) => {
    stopRunner();
    setEntries([]);
    entryCountRef.current = 0;
    setStatus('running');
    setElapsedMs(null);
    setTimedOut(false);
    setLastTree(null);
    setShowDiagram(false);
    setTraceData(null);
    setShowTrace(false);
    setStreamActive(false);
    setEnvData(null);
    setShowEnv(false);
    setEnvTreeName(null);
    clearTimeout(pullTimerRef.current);
    checkStatsRef.current = { pass: 0, fail: 0 };
    errorSeenRef.current = false;

    const parts = [];
    if (session && sessionKeyRef.current) {
      const prefix = getSessionPrefix(sessionKeyRef.current, getCodeRef.current);
      if (prefix) parts.push(prefix);
    }
    if (hiddenCode) parts.push(hiddenCode);
    const prefixText = parts.join('\n');
    parts.push(editorCode);
    const source = parts.join('\n');
    // linha em que começa o código do próprio bloco (para o painel Ambiente
    // distinguir vinculações herdadas da sessão/hiddenCode)
    const envOwnLine = prefixText ? prefixText.split('\n').length : 0;

    const handleMessage = (worker) => (msg) => {
      if (runnerRef.current == null || runnerRef.current.worker !== worker) return;
      switch (msg.type) {
        case 'log':
        case 'warn':
          if (showConsole) pushEntry({ kind: msg.type, text: msg.text });
          break;
        case 'error':
          errorSeenRef.current = true;
          pushEntry({ kind: 'error', text: withHint(msg.text) });
          break;
        case 'result':
          if (!msg.isUndefined) pushEntry({ kind: 'result', text: msg.text });
          if (msg.tree) setLastTree(msg.tree);
          if (msg.isStream) setStreamActive(true);
          break;
        case 'trace':
          setTraceData({ roots: msg.roots, truncated: msg.truncated });
          break;
        case 'env':
          setEnvData(msg);
          setShowEnv(true);
          break;
        case 'streamElement':
          clearTimeout(pullTimerRef.current);
          if (msg.text !== undefined) {
            pushEntry({ kind: 'log', text: `s[${msg.index}] = ${msg.text}` });
          }
          if (msg.error) pushEntry({ kind: 'error', text: msg.error });
          if (msg.end) {
            pushEntry({ kind: 'status', text: '— fim do stream —' });
            setStreamActive(false);
          }
          break;
        case 'check':
          checkStatsRef.current[msg.pass ? 'pass' : 'fail'] += 1;
          pushEntry({
            kind: msg.pass ? 'checkPass' : 'checkFail',
            text: msg.pass
              ? `✓ ${msg.expression} ⟹ ${msg.expected}`
              : `✗ ${msg.expression}: esperado ${msg.expected}, obteve ${msg.actual}`,
          });
          break;
        case 'truncated':
          pushEntry({ kind: 'status', text: '— saída truncada —' });
          break;
        case 'done':
          clearTimeout(runnerRef.current.timer);
          if (entryCountRef.current === 0) {
            pushEntry({ kind: 'status', text: '✓ Executado (nenhum valor a exibir)' });
          }
          if (typeof msg.elapsed === 'number') setElapsedMs(msg.elapsed);
          track('playground_run', {
            outcome: errorSeenRef.current ? 'error' : 'ok',
            edited: editorCodeRef.current !== initialCode,
            has_checks: Boolean(checks && checks.length > 0),
          });
          if (
            checks &&
            checks.length > 0 &&
            checkStatsRef.current.pass === checks.length &&
            checkStatsRef.current.fail === 0
          ) {
            track('exercise_pass', { checks: checks.length, exercise });
            if (exercise) setMarked(exercise, true);
            pushEntry({ kind: 'status', text: '🎉 Exercício concluído!' });
            const doneKey = storageKeyRef.current?.replace('pgcode:', 'pgdone:');
            if (doneKey) {
              try {
                localStorage.setItem(doneKey, new Date().toISOString());
              } catch (ignored) {
                // sem persistência
              }
            }
            import('canvas-confetti').then(({ default: confetti }) => {
              const rect = wrapperRef.current?.getBoundingClientRect();
              const origin = rect
                ? {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: Math.min(rect.bottom, window.innerHeight) / window.innerHeight,
                  }
                : { y: 0.7 };
              confetti({ particleCount: 70, spread: 60, origin, disableForReducedMotion: true });
            }).catch(() => {});
          }
          setStatus('done');
          // O worker fica vivo até a próxima execução (ou desmontagem)
          // para que logs assíncronos tardios ainda apareçam.
          break;
        default:
          break;
      }
    };

    const worker = createRunner(
      { source, checks: checks || [], envOwnLine },
      (msg) => handleMessage(worker)(msg)
    );
    const timer = setTimeout(() => {
      if (runnerRef.current == null || runnerRef.current.worker !== worker) return;
      stopRunner();
      pushEntry({
        kind: 'error',
        text:
          `Tempo de execução esgotado (${Math.round(timeoutMs / 1000)} segundos). ` +
          'A execução foi interrompida — verifique se há recursão ou laço infinito.',
      });
      setTimedOut(timeoutMs < RETRY_TIMEOUT_MS);
      setStatus('done');
      track('playground_run', { outcome: 'timeout' });
    }, timeoutMs);
    runnerRef.current = { worker, timer };
  };

  const pullStream = () => {
    const runner = runnerRef.current;
    if (!runner) {
      setStreamActive(false);
      return;
    }
    runner.worker.postMessage({ streamNext: true });
    clearTimeout(pullTimerRef.current);
    pullTimerRef.current = setTimeout(() => {
      // a cauda do stream travou (é infinita sem produzir?): descarta o worker
      stopRunner();
      pushEntry({
        kind: 'error',
        text: 'A cauda do stream não respondeu em 5 segundos — execução interrompida.',
      });
      setStreamActive(false);
    }, 5000);
  };

  const toggleEnv = () => {
    if (showEnv) {
      setShowEnv(false);
      return;
    }
    if (envData) {
      setShowEnv(true);
      return;
    }
    const runner = runnerRef.current;
    if (!runner) return;
    track('env_open');
    runner.worker.postMessage({ envRequest: true });
  };

  const reset = () => {
    stopRunner();
    setEditorCode(initialCode);
    setEntries([]);
    setStatus('idle');
    setElapsedMs(null);
    setTimedOut(false);
    setLastTree(null);
    setShowDiagram(false);
    const key = storageKeyRef.current;
    if (key) {
      try {
        localStorage.removeItem(key);
      } catch (ignored) {
        // sem persistência disponível
      }
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(editorCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (ignored) {
      // clipboard indisponível
    }
  };

  const share = async () => {
    const blockId = blockIdRef.current;
    if (!blockId) return;
    let hash = '#' + blockId;
    if (editorCode !== initialCode) {
      const b64 = btoa(unescape(encodeURIComponent(editorCode)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      hash += '=' + b64;
    }
    const url = window.location.origin + window.location.pathname + hash;
    try {
      await navigator.clipboard.writeText(url);
      track('playground_share', { edited: editorCode !== initialCode });
      setShared(true);
      setTimeout(() => setShared(false), 1500);
    } catch (ignored) {
      // clipboard indisponível
    }
  };

  useEffect(() => {
    if (autorun) run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const edited = editorCode !== initialCode;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {title && <div className={styles.titleBar}>{title}</div>}
      <PlaygroundEditor
        code={editorCode}
        onChange={handleCodeChange}
        onRun={run}
        isDark={isDark}
        showLineNumbers={showLineNumbers}
        maxHeight={height}
      />
      <div className={styles.toolbar}>
        <button
          type="button"
          className="button button--primary button--sm"
          onClick={() => run()}
          disabled={status === 'running'}
        >
          {status === 'running' ? 'Executando…' : '▶ Executar'}
        </button>
        <button
          type="button"
          className="button button--secondary button--outline button--sm"
          onClick={copy}
        >
          {copied ? 'Copiado!' : 'Copiar'}
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
        <button
          type="button"
          className="button button--secondary button--outline button--sm"
          onClick={share}
          aria-label={shared ? 'Link copiado!' : 'Copiar link direto para este bloco'}
          title="Copiar link direto para este bloco (inclui suas edições)"
        >
          {shared ? 'Link copiado!' : '🔗'}
        </button>
        {session && (
          <span
            className={styles.sessionBadge}
            title="Este bloco compartilha o ambiente da página: as declarações dos blocos anteriores são avaliadas antes dele (edite um bloco anterior e o resultado aqui muda)."
          >
            ⛓ sessão
            <span className="sr-only">
              {' '}— este bloco compartilha o ambiente da página: as declarações
              dos blocos anteriores são avaliadas antes dele
            </span>
          </span>
        )}
        <span className={styles.hint}>
          {elapsedMs != null && <span className={styles.execTime}>{formatElapsed(elapsedMs)} · </span>}
          Código editável · Ctrl+Enter executa · Esc solta o foco
        </span>
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
          {timedOut && status === 'done' && (
            <button
              type="button"
              className={`button button--secondary button--outline button--sm ${styles.retryButton}`}
              onClick={() => run(RETRY_TIMEOUT_MS)}
            >
              Tentar novamente com {Math.round(RETRY_TIMEOUT_MS / 1000)} s
            </button>
          )}
          {lastTree && (
            <button
              type="button"
              className={`button button--secondary button--outline button--sm ${styles.retryButton}`}
              onClick={() => setShowDiagram((v) => !v)}
            >
              {showDiagram ? 'Esconder diagrama' : 'Ver diagrama caixa-e-ponteiro'}
            </button>
          )}
          {traceData && (
            <button
              type="button"
              className={`button button--secondary button--outline button--sm ${styles.retryButton}`}
              onClick={() => setShowTrace((v) => !v)}
            >
              {showTrace ? 'Esconder árvore de chamadas' : 'Ver árvore de chamadas'}
            </button>
          )}
          {streamActive && status === 'done' && (
            <button
              type="button"
              className={`button button--secondary button--outline button--sm ${styles.retryButton}`}
              onClick={pullStream}
            >
              Puxar próximo elemento do stream
            </button>
          )}
          {status === 'done' && !timedOut && (
            <button
              type="button"
              className={`button button--secondary button--outline button--sm ${styles.retryButton}`}
              onClick={toggleEnv}
              title="Nomes declarados pelo programa e seus valores atuais — o quadro global do modelo de ambientes (seção 3.2)"
            >
              {showEnv ? 'Esconder ambiente' : 'Ver ambiente'}
            </button>
          )}
          {showDiagram && lastTree && <BoxPointerDiagram tree={lastTree} />}
          {showTrace && traceData && (
            <CallTreeDiagram roots={traceData.roots} truncated={traceData.truncated} />
          )}
          {showEnv && envData && (
            <div className={styles.envPanel}>
              {envData.error ? (
                <div className={styles.entryError}>
                  Não foi possível inspecionar o ambiente: {envData.error}
                </div>
              ) : !envData.bindings || envData.bindings.length === 0 ? (
                <div className={styles.entryStatus}>
                  Nenhum nome declarado no nível do programa — declare com{' '}
                  <code>const</code>, <code>let</code> ou <code>function</code> e
                  execute de novo.
                </div>
              ) : (
                <>
                  <div className={styles.envTitle}>
                    Ambiente global do programa (seção 3.2: cada linha é uma
                    vinculação nome → valor no quadro global)
                  </div>
                  {envData.bindings.map((b) => (
                    <React.Fragment key={b.name}>
                      <div className={styles.envRow}>
                        <span className={styles.envKind}>{b.kind}</span>
                        <span className={styles.envName}>{b.name}</span>
                        <span className={styles.envValue}>{b.text}</span>
                        {b.inherited && (
                          <span
                            className={styles.envInherited}
                            title="Declarado em um bloco anterior desta sessão (ou no código auxiliar oculto)"
                          >
                            ⛓ sessão
                          </span>
                        )}
                        {b.tree && (
                          <button
                            type="button"
                            className={styles.envTreeButton}
                            onClick={() =>
                              setEnvTreeName(envTreeName === b.name ? null : b.name)
                            }
                          >
                            {envTreeName === b.name ? 'esconder' : 'diagrama'}
                          </button>
                        )}
                      </div>
                      {envTreeName === b.name && b.tree && (
                        <BoxPointerDiagram
                          tree={b.tree}
                          label={`Diagrama caixa-e-ponteiro de ${b.name} = ${b.text}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
