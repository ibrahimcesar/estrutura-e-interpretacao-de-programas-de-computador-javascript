/**
 * Sessões de playground: blocos de uma mesma página que compartilham a prop
 * `session` formam um "ambiente" contínuo, como o REPL do livro — ao executar
 * um bloco, o código ATUAL dos blocos anteriores da sessão é avaliado antes,
 * de modo que declarações como `const size = 2;` ficam visíveis nos blocos
 * seguintes (`size;` → 2). Cada execução ainda usa um worker novo, então
 * reexecutar um bloco não causa erro de redeclaração.
 *
 * O registro segue a ordem de montagem dos componentes, que corresponde à
 * ordem dos blocos no documento.
 */

const sessions = new Map(); // chave -> { entries: [{ getCode }] }

/**
 * Registra um bloco na sessão. Retorna a função de desregistro (para o
 * cleanup do useEffect).
 */
export function registerBlock(sessionKey, getCode) {
  let session = sessions.get(sessionKey);
  if (!session) {
    session = { entries: [] };
    sessions.set(sessionKey, session);
  }
  const entry = { getCode };
  session.entries.push(entry);
  return () => {
    const index = session.entries.indexOf(entry);
    if (index !== -1) session.entries.splice(index, 1);
    if (session.entries.length === 0) sessions.delete(sessionKey);
  };
}

/**
 * Código concatenado dos blocos registrados ANTES do bloco identificado por
 * getCode, na ordem do documento.
 */
export function getSessionPrefix(sessionKey, getCode) {
  const session = sessions.get(sessionKey);
  if (!session) return '';
  const codes = [];
  for (const entry of session.entries) {
    if (entry.getCode === getCode) break;
    codes.push(entry.getCode());
  }
  return codes.join('\n');
}
