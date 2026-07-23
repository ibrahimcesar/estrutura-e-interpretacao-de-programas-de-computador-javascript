/**
 * O contrato tipado do protocolo entre CodePlayground e o Web Worker.
 *
 * A implementação vive em src/components/playgroundWorker.js — que
 * permanece JavaScript puro DE PROPÓSITO: o arquivo é importado como
 * texto (raw-loader) e executado literalmente num Blob worker, sem
 * passar por nenhum transpilador; além disso, ele é material didático
 * do projeto e deve ser legível como o JavaScript do livro.
 *
 * Estes tipos são a especificação que a implementação deve honrar
 * (e que os testes semânticos em scripts/playground-tests.mjs exercitam).
 */

/** Árvore caixa-e-ponteiro serializada de um resultado. */
export type PgTree =
  | { k: 'pair'; id: number; h: PgTree; t: PgTree }
  | { k: 'ref'; id: number }
  | { k: 'val'; text: string }
  | { k: 'null' }
  | { k: 'more' };

/** Nó da árvore de chamadas do rastreador (trace). */
export interface TraceNode {
  /** rótulo "nome(args…)" */
  l: string;
  /** valor de retorno formatado, ou "⚠ erro" */
  v: string | null;
  /** chamadas internas */
  c: TraceNode[];
}

export interface ExerciseCheck {
  expression: string;
  expected: string;
}

/** Vinculação exibida no painel "Ambiente". */
export interface EnvBinding {
  name: string;
  kind: 'const' | 'let' | 'var' | 'function';
  type: string;
  text: string;
  tree: PgTree | null;
  /** declarada antes do código do próprio bloco (sessão/hiddenCode) */
  inherited: boolean;
}

/** Mensagens da página PARA o worker. */
export type WorkerRequest =
  | { source: string; checks: ExerciseCheck[]; envOwnLine?: number }
  | { streamNext: true }
  | { envRequest: true };

/** Mensagens do worker PARA a página. */
export type WorkerMessage =
  | { type: 'log'; text: string }
  | { type: 'warn'; text: string }
  | { type: 'error'; text: string }
  | {
      type: 'result';
      text: string;
      isUndefined: boolean;
      tree: PgTree | null;
      isStream: boolean;
    }
  | { type: 'trace'; roots: TraceNode[]; truncated: boolean }
  | {
      type: 'streamElement';
      index?: number;
      text?: string;
      end: boolean;
      error?: string;
    }
  | {
      type: 'check';
      expression: string;
      expected: string;
      actual: string;
      pass: boolean;
    }
  | { type: 'env'; bindings?: EnvBinding[]; error?: string }
  | { type: 'truncated' }
  | { type: 'done'; elapsed: number };
