/**
 * Executor de código dos playgrounds.
 *
 * Cada execução acontece em um Web Worker novo (thread separada), o que
 * permite interromper laços/recursões infinitas com worker.terminate() sem
 * congelar a página. O código do worker vive em ./playgroundWorker.js como
 * JavaScript comum e legível — o prefixo `!!raw-loader!` o importa como
 * TEXTO (sem passar pelo babel), e um Blob URL o transforma em worker.
 *
 * Protocolo (worker → página):
 *   log/warn/error  { text }
 *   result          { text, isUndefined, tree? }  tree = caixa-e-ponteiro
 *   check           { expression, expected, actual, pass }
 *   done            { elapsed }  ms da avaliação principal
 *   truncated       —
 */

// eslint-disable-next-line import/no-webpack-loader-syntax
import WORKER_SOURCE from '!!raw-loader!./playgroundWorker.js';

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
 * Cria um worker novo, envia o código (e verificações opcionais) e entrega
 * cada mensagem a onMessage. O chamador é responsável por terminate() e
 * pelo timeout.
 *
 * @param {{source: string, checks?: Array<{expression: string, expected: string}>}} payload
 * @param {(msg: Object) => void} onMessage
 * @returns {Worker}
 */
export function createRunner(payload, onMessage) {
  const worker = new Worker(getWorkerUrl());
  worker.onmessage = (event) => onMessage(event.data);
  worker.postMessage(payload);
  return worker;
}
