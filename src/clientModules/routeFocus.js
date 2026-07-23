/**
 * Gestão de foco em navegação SPA (A11Y-PLAN item 4, SC 2.4.3).
 *
 * Sem isto, após clicar num link interno o foco fica no <body> e leitores
 * de tela não anunciam a nova página. Movemos o foco para o título
 * principal do conteúdo — o mesmo destino do skip link.
 */
export function onRouteDidUpdate({ location, previousLocation }) {
  if (!previousLocation || location.pathname === previousLocation.pathname) return;
  // navegação por âncora dentro da página não deve roubar o foco
  if (location.hash) return;
  // espera o React pintar o conteúdo da nova rota antes de focar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const target =
        document.querySelector('main h1') || document.querySelector('main');
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}
