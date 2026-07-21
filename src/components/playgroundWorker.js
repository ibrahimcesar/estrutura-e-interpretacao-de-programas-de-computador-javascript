/**
 * Código que roda DENTRO do Web Worker de cada playground.
 *
 * Este arquivo é importado como texto (raw-loader) por playgroundRunner.js
 * e transformado em um worker via Blob URL — por isso ele é JavaScript
 * "clássico" (sem imports) e todo estado vive no escopo global do worker.
 *
 * O que ele faz:
 *   1. Redefine console.* para enviar a saída à página via postMessage.
 *   2. Expõe a biblioteca padrão do SICP JS (pair, list, head, tail,
 *      display, math_*, streams…) no escopo global.
 *   3. Avalia o programa recebido com eval indireto — o valor de
 *      conclusão da última instrução de expressão é o "eco" do REPL.
 *   4. Executa verificações de exercício (checks) e mede o tempo.
 *
 * Toda a saída é formatada em string AQUI DENTRO, então postMessage nunca
 * falha com valores não-serializáveis (funções, estruturas circulares).
 */

'use strict';
var post = function (type, extra) {
  self.postMessage(Object.assign({ type: type }, extra));
};
var sent = 0;
var muted = false; // silencia a saída durante a reexecução das verificações
var emit = function (type, text) {
  if (muted) return;
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

// Árvore caixa-e-ponteiro do resultado (compartilhamento e ciclos viram
// referências por id; limitada em nós para não explodir a página).
function toTree(value) {
  if (!Array.isArray(value) || value.length !== 2) return null;
  var ids = new Map();
  var nextId = 0;
  var budget = 80;
  function walk(v) {
    if (Array.isArray(v) && v.length === 2) {
      if (ids.has(v)) return { k: 'ref', id: ids.get(v) };
      if (budget <= 0) return { k: 'more' };
      budget -= 1;
      var id = nextId;
      nextId += 1;
      ids.set(v, id);
      return { k: 'pair', id: id, h: walk(v[0]), t: walk(v[1]) };
    }
    if (v === null) return { k: 'null' };
    var text = fmtResult(v);
    if (text.length > 10) text = text.slice(0, 9) + '…';
    return { k: 'val', text: text };
  }
  return walk(value);
}

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
// Streams (capítulo 3.5): par cuja cauda é adiada por uma função nula
self.stream_tail = function (s) {
  if (!self.is_pair(s)) throw new Error('stream_tail espera um stream, recebeu: ' + fmtResult(s));
  if (typeof s[1] !== 'function') throw new Error('stream_tail: a cauda do stream deve ser uma função');
  return s[1]();
};
self.is_stream = function (s) {
  return s === null || (self.is_pair(s) && typeof s[1] === 'function');
};
self.stream = function () {
  var args = Array.prototype.slice.call(arguments);
  function build(i) {
    return i >= args.length ? null : [args[i], function () { return build(i + 1); }];
  }
  return build(0);
};
self.list_to_stream = function (l) {
  return l === null ? null : [l[0], function () { return self.list_to_stream(l[1]); }];
};
self.stream_to_list = function (s) {
  var out = [];
  var guard = 0;
  while (s !== null) {
    if (++guard > 10000) throw new Error('stream_to_list: stream muito longo (é infinito?)');
    out.push(s[0]);
    s = s[1]();
  }
  var r = null;
  for (var i = out.length - 1; i >= 0; i--) r = [out[i], r];
  return r;
};
// Rastreador de chamadas (capítulo 1.2): trace("fib") embrulha a função
// global fib para registrar cada chamada e retorno — a página desenha a
// árvore do processo. Também aceita trace(fn), mas para rastrear as
// chamadas RECURSIVAS internas é preciso reatribuir: fib = trace(fib).
var traceRoots = [];
var traceStack = [];
var traceCount = 0;
var TRACE_LIMIT = 200;
function makeTraced(fn, name) {
  var label = name || fn.name || 'fn';
  return function () {
    if (traceCount >= TRACE_LIMIT) return fn.apply(this, arguments);
    traceCount += 1;
    var args = Array.prototype.slice.call(arguments);
    var node = {
      l: label + '(' + args.map(function (a) { return fmtResult(a); }).join(', ') + ')',
      v: null,
      c: [],
    };
    if (traceStack.length > 0) traceStack[traceStack.length - 1].c.push(node);
    else traceRoots.push(node);
    traceStack.push(node);
    try {
      var result = fn.apply(this, arguments);
      node.v = fmtResult(result);
      return result;
    } catch (err) {
      node.v = '⚠ ' + ((err && err.name) || 'erro');
      throw err;
    } finally {
      traceStack.pop();
    }
  };
}
self.trace = function (target, name) {
  if (typeof target === 'string') {
    if (typeof self[target] !== 'function') {
      throw new Error('trace: não há função global chamada "' + target + '"');
    }
    self[target] = makeTraced(self[target], target);
    return self[target];
  }
  if (typeof target !== 'function') {
    throw new Error('trace espera uma função ou o nome de uma função global');
  }
  return makeTraced(target, name);
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
var streamCursor = undefined; // stream do último resultado, para inspeção
var streamIndex = 0;

self.onmessage = function (e) {
  // Pedido de "puxar próximo elemento" do inspetor de streams
  if (e.data && e.data.streamNext) {
    if (!self.is_pair(streamCursor)) {
      post('streamElement', { end: true });
      return;
    }
    var element = streamCursor[0];
    var idx = streamIndex;
    streamIndex += 1;
    try {
      streamCursor = streamCursor[1]();
    } catch (errS) {
      streamCursor = null;
      post('streamElement', { index: idx, text: fmtResult(element), end: true,
        error: (errS && errS.message) || String(errS) });
      return;
    }
    post('streamElement', { index: idx, text: fmtResult(element), end: !self.is_pair(streamCursor) && streamCursor === null });
    return;
  }

  var checks = e.data.checks || [];
  traceRoots = [];
  traceStack = [];
  traceCount = 0;
  streamCursor = undefined;
  streamIndex = 0;
  var value;
  var failed = false;
  var t0 = Date.now();
  try {
    value = (0, eval)(e.data.source);
  } catch (err) {
    failed = true;
    emit('error', (err && err.name ? err.name + ': ' : '') + ((err && err.message) || String(err)));
  }
  var elapsed = Date.now() - t0;
  if (!failed) {
    var tree = null;
    try { tree = toTree(value); } catch (ignored) { tree = null; }
    var isStream = self.is_stream(value) && value !== null;
    if (isStream) { streamCursor = value; streamIndex = 0; }
    post('result', { text: fmtResult(value), isUndefined: value === undefined, tree: tree, isStream: isStream });
    if (traceRoots.length > 0) {
      post('trace', { roots: traceRoots, truncated: traceCount >= TRACE_LIMIT });
    }
    if (checks.length > 0) {
      // const/let dentro de um eval indireto não viram globais, então as
      // expressões de verificação não enxergariam o escopo do programa.
      // Reexecutamos o programa (com a saída silenciada) junto com thunks
      // que FECHAM sobre esse escopo, e avaliamos cada verificação por eles.
      var thunks = null;
      var setupError = null;
      muted = true;
      try {
        thunks = (0, eval)(
          e.data.source +
          '\n;[' +
          checks.map(function (c) { return 'function () { return (' + c.expression + '); }'; }).join(', ') +
          '];'
        );
      } catch (errSetup) {
        setupError = (errSetup && errSetup.message) || String(errSetup);
      }
      for (var i = 0; i < checks.length; i++) {
        var c = checks[i];
        var actual;
        var pass = false;
        if (setupError !== null) {
          actual = setupError;
        } else {
          try {
            actual = fmtResult(thunks[i]());
            pass = actual === c.expected;
          } catch (err2) {
            actual = (err2 && err2.name ? err2.name + ': ' : '') + ((err2 && err2.message) || String(err2));
          }
        }
        post('check', { expression: c.expression, expected: c.expected, actual: actual, pass: pass });
      }
      muted = false;
    }
  }
  post('done', { elapsed: elapsed });
};
