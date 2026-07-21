/**
 * Eventos personalizados do Google Analytics (GA4).
 *
 * O `window.gtag` só existe no build de produção (plugin gtag do
 * Docusaurus); em desenvolvimento e no SSR a função vira no-op.
 * Nenhum dado pessoal é enviado — apenas nomes de eventos e
 * parâmetros descritivos (página, resultado, capítulo).
 */
export function track(event, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}
