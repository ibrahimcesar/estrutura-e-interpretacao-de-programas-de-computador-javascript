/**
 * Mantido por compatibilidade de importação: o CodePlayground atual é leve
 * e seguro para SSR (o Web Worker só é criado ao executar), então o
 * carregamento adiado com BrowserOnly deixou de ser necessário.
 */
export { default } from './CodePlayground';
