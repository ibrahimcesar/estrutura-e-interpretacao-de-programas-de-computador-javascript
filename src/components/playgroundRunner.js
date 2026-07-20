/**
 * Executor de código dos playgrounds.
 *
 * Cada execução acontece em um Web Worker novo (thread separada), o que
 * permite interromper laços/recursões infinitas com worker.terminate() sem
 * congelar a página. O valor de conclusão do programa (última instrução de
 * expressão) é ecoado como em um REPL: eval("137 + 349;") → 486.
 *
 * Toda a saída é formatada em string DENTRO do worker, então postMessage
 * nunca falha com valores não-serializáveis (funções, objetos circulares).
 */

const WORKER_SOURCE = `
'use strict';
var post = function (type, extra) {
  self.postMessage(Object.assign({ type: type }, extra));
};
var sent = 0;
var emit = function (type, text) {
  sent += 1;
  if (sent === 500) { post('truncated'); return; }
  if (sent < 500) post(type, { text: text });
};
function fmt(v, seen, depth) {
  seen = seen || new WeakSet();
  depth = depth || 0;
  if (v === null) return 'null';
  var t = typeof v;
  if (t === 'string') return depth === 0 ? v : JSON.stringify(v);
  if (t === 'function') {
    var s = String(v);
    return s.length > 120 ? s.slice(0, 117) + '...' : s;
  }
  if (t !== 'object') return String(v);
  if (v instanceof Error) return v.name + ': ' + v.message;
  if (seen.has(v)) return '[circular]';
  if (depth > 4) return Array.isArray(v) ? '[...]' : '{...}';
  seen.add(v);
  if (Array.isArray(v)) {
    return '[' + v.map(function (x) { return fmt(x, seen, depth + 1); }).join(', ') + ']';
  }
  return '{ ' + Object.entries(v).map(function (kv) {
    return kv[0] + ': ' + fmt(kv[1], seen, depth + 1);
  }).join(', ') + ' }';
}
var fmtResult = function (v) {
  return typeof v === 'string' ? JSON.stringify(v) : fmt(v);
};
['log', 'info', 'warn', 'error'].forEach(function (level) {
  console[level] = function () {
    var args = Array.prototype.slice.call(arguments);
    emit(level === 'info' ? 'log' : level, args.map(function (x) { return fmt(x); }).join(' '));
  };
});
self.prompt = self.alert = self.confirm = function () {
  throw new Error('prompt/alert/confirm não são suportados neste playground; use console.log para exibir valores');
};
self.addEventListener('error', function (e) {
  e.preventDefault();
  emit('error', e.message);
});
self.addEventListener('unhandledrejection', function (e) {
  e.preventDefault();
  emit('error', 'Promise rejeitada: ' + fmt(e.reason));
});
self.onmessage = function (e) {
  var value;
  try {
    value = (0, eval)(e.data.source);
    post('result', { text: fmtResult(value), isUndefined: value === undefined });
  } catch (err) {
    emit('error', (err && err.name ? err.name + ': ' : '') + ((err && err.message) || String(err)));
  }
  post('done');
};
`;

let workerUrl = null;

function getWorkerUrl() {
  if (workerUrl === null) {
    workerUrl = URL.createObjectURL(
      new Blob([WORKER_SOURCE], { type: 'application/javascript' })
    );
  }
  return workerUrl;
}

/**
 * Cria um worker novo, envia o código e entrega cada mensagem a onMessage.
 * O chamador é responsável por terminate() e pelo timeout.
 *
 * @param {string} source - código a executar
 * @param {(msg: {type: string, text?: string, isUndefined?: boolean}) => void} onMessage
 * @returns {Worker}
 */
export function createRunner(source, onMessage) {
  const worker = new Worker(getWorkerUrl());
  worker.onmessage = (event) => onMessage(event.data);
  worker.postMessage({ source });
  return worker;
}
