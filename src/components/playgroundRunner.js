/**
 * Executor de código dos playgrounds.
 *
 * Cada execução acontece em um Web Worker novo (thread separada), o que
 * permite interromper laços/recursões infinitas com worker.terminate() sem
 * congelar a página. O valor de conclusão do programa (última instrução de
 * expressão) é ecoado como em um REPL: eval("137 + 349;") → 486.
 *
 * O worker expõe a biblioteca padrão do SICP JS (Source Academy): pair,
 * head, tail, list, display, error, math_*, etc., para que os exemplos do
 * livro rodem sem preâmbulo. Declarações do leitor com o mesmo nome
 * simplesmente as sobrescrevem.
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
  if (depth > 6) return Array.isArray(v) ? '[...]' : '{...}';
  seen.add(v);
  var out;
  if (Array.isArray(v)) {
    if (v.length === 2) {
      // Par do SICP: a espinha da lista não aumenta a profundidade, para
      // que listas longas sejam exibidas por inteiro.
      out = '[' + fmt(v[0], seen, depth + 1) + ', ' + fmt(v[1], seen, depth) + ']';
    } else {
      out = '[' + v.map(function (x) { return fmt(x, seen, depth + 1); }).join(', ') + ']';
    }
  } else {
    out = '{ ' + Object.entries(v).map(function (kv) {
      return kv[0] + ': ' + fmt(kv[1], seen, depth + 1);
    }).join(', ') + ' }';
  }
  seen.delete(v); // backtracking: estrutura compartilhada não é ciclo
  return out;
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

// --- Biblioteca padrão do SICP JS (subconjunto do Source Academy) ---
self.pair = function (h, t) { return [h, t]; };
self.is_pair = function (x) { return Array.isArray(x) && x.length === 2; };
self.head = function (p) {
  if (!self.is_pair(p)) throw new Error('head espera um par, recebeu: ' + fmtResult(p));
  return p[0];
};
self.tail = function (p) {
  if (!self.is_pair(p)) throw new Error('tail espera um par, recebeu: ' + fmtResult(p));
  return p[1];
};
self.set_head = function (p, v) {
  if (!self.is_pair(p)) throw new Error('set_head espera um par, recebeu: ' + fmtResult(p));
  p[0] = v;
};
self.set_tail = function (p, v) {
  if (!self.is_pair(p)) throw new Error('set_tail espera um par, recebeu: ' + fmtResult(p));
  p[1] = v;
};
self.is_null = function (x) { return x === null; };
self.list = function () {
  var r = null;
  for (var i = arguments.length - 1; i >= 0; i--) r = [arguments[i], r];
  return r;
};
self.display = function (v, s) {
  emit('log', (s === undefined ? '' : String(s) + ' ') + fmt(v));
  return v;
};
self.stringify = function (v) { return fmtResult(v); };
self.error = function (v, s) {
  throw new Error((s === undefined ? '' : String(s) + ' ') + fmt(v));
};
self.is_number = function (x) { return typeof x === 'number'; };
self.is_string = function (x) { return typeof x === 'string'; };
self.is_boolean = function (x) { return typeof x === 'boolean'; };
self.is_function = function (x) { return typeof x === 'function'; };
self.is_undefined = function (x) { return x === undefined; };
self.char_at = function (s, i) { return i < s.length ? s.charAt(i) : undefined; };
self.get_time = function () { return Date.now(); };
Object.getOwnPropertyNames(Math).forEach(function (k) {
  self['math_' + k] = Math[k];
});
var opTable = Object.create(null);
self.put = function (op, type, item) { opTable[op + '|' + fmtResult(type)] = item; };
self.get = function (op, type) { return opTable[op + '|' + fmtResult(type)]; };
var coercionTable = Object.create(null);
self.put_coercion = function (t1, t2, fn) { coercionTable[t1 + '|' + t2] = fn; };
self.get_coercion = function (t1, t2) { return coercionTable[t1 + '|' + t2]; };
self.apply_in_underlying_javascript = function (fn, args) {
  var a = [];
  while (args !== null) { a.push(args[0]); args = args[1]; }
  return fn.apply(null, a);
};
// --- fim da biblioteca ---

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
