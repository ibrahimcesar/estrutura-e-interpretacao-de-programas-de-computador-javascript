import { themes } from 'prism-react-renderer';

/**
 * Temas de realce de código do site (blocos estáticos e playgrounds).
 *
 * O tema claro é o "github" com dois tokens escurecidos para cumprir
 * WCAG AA (4.5:1) sobre o fundo #f6f8fa dos blocos:
 *   - function/tag: #d73a49 (4.3:1) → #b31d28 (6.3:1)
 *   - string:       #e3116c (4.3:1) → #c2255c (5.3:1)
 *   - attr-name:    #00a4db (2.7:1) → #036197 (6.2:1)
 * Entradas adicionadas ao FIM de styles têm precedência.
 */
export const lightCodeTheme = {
  ...themes.github,
  styles: [
    ...themes.github.styles,
    { types: ['function', 'deleted', 'tag'], style: { color: '#b31d28' } },
    { types: ['string', 'attr-value'], style: { color: '#c2255c' } },
    { types: ['attr-name'], style: { color: '#036197' } },
    // teal #36acaa (2.6:1) do github para números/booleanos/variáveis
    {
      types: ['entity', 'url', 'symbol', 'number', 'boolean', 'variable', 'constant', 'property', 'regex', 'inserted'],
      style: { color: '#116d6b' },
    },
  ],
};

export const darkCodeTheme = themes.dracula;
