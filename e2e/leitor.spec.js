// @ts-check
import { test, expect } from '@playwright/test';

/**
 * A jornada do leitor, de ponta a ponta, contra o build de produção:
 * REPL, sessões, soluções, progresso, diagramas, ambiente, compartilhar.
 * A auditoria (npm test) garante a SEMÂNTICA dos blocos; estes testes
 * garantem a EXPERIÊNCIA — que os controles existem e respondem.
 *
 * Nota: os caminhos são RELATIVOS (sem / inicial) para compor com o
 * baseURL /pt_BR/ — barra inicial descartaria o prefixo.
 */

/** o playground (wrapper) cujo editor contém o trecho dado */
async function blockWith(page, snippet) {
  const editors = page.locator('textarea');
  const count = await editors.count();
  for (let i = 0; i < count; i += 1) {
    if ((await editors.nth(i).inputValue()).includes(snippet)) {
      return editors.nth(i).locator('xpath=ancestor::div[contains(@class, "wrapper")][1]');
    }
  }
  throw new Error(`nenhum editor contém: ${snippet}`);
}

test('REPL: 137 + 349 ecoa 486 na página 1.1.1', async ({ page }) => {
  await page.goto('chapter-1/1.1.1');
  const block = await blockWith(page, '137 + 349');
  await block.getByRole('button', { name: /Executar/ }).click();
  const output = block.locator('div[aria-live="polite"]');
  await expect(output).toContainText('486');
  await expect(output).toContainText('›');
});

test('sessão: bloco posterior de 1.1.2 enxerga declarações anteriores', async ({ page }) => {
  await page.goto('chapter-1/1.1.2');
  const block = await blockWith(page, '5 * size');
  await block.getByRole('button', { name: /Executar/ }).click();
  const output = block.locator('div[aria-live="polite"]');
  await expect(output).toContainText('10');
  await expect(output).not.toContainText('ReferenceError');
  await expect(block.locator('text=⛓ sessão')).toBeVisible();
});

test('painel Ambiente: vinculações com badge de sessão', async ({ page }) => {
  await page.goto('chapter-1/1.1.2');
  const block = await blockWith(page, '5 * size');
  await block.getByRole('button', { name: /Executar/ }).click();
  await block.getByRole('button', { name: 'Ver ambiente' }).click();
  const panel = block.locator('div[class*="envPanel"]');
  await expect(panel).toBeVisible();
  await expect(panel).toContainText('size');
  await expect(panel).toContainText('⛓ sessão');
});

test('diagrama caixa-e-ponteiro para listas no /playground', async ({ page }) => {
  await page.goto('playground');
  await page.locator('textarea').first().fill('list(1, 2, 3);');
  await page.getByRole('button', { name: /Executar/ }).first().click();
  await page.getByRole('button', { name: /Ver diagrama caixa-e-ponteiro/ }).click();
  await expect(page.locator('svg[class*="diagramSvg"]').first()).toBeVisible();
});

test('solução: spoiler fechado por padrão, abre, e marca progresso', async ({ page }) => {
  await page.goto('chapter-1/1.1.6');
  const spoiler = page.locator('details[class*="solution"]').first();
  await expect(spoiler).not.toHaveAttribute('open', '');
  await spoiler.locator('summary').click();
  await expect(spoiler).toHaveAttribute('open', '');
  const mark = page.locator('label[class*="markRow"]').first();
  await mark.locator('input').check();
  await page.goto('progresso');
  await expect(page.locator('main')).toContainText('1 de 223');
});

test('progresso: checkbox na página marca e desmarca', async ({ page }) => {
  await page.goto('progresso');
  await page.locator('details > summary').first().click();
  const pill = page.locator('span[class*="pill"]').first();
  await pill.locator('input').check();
  await expect(page.locator('main')).toContainText('1 de 223');
  await pill.locator('input').uncheck();
  await expect(page.locator('main')).not.toContainText('1 de 223');
});

test('exercício com verificação: código correto celebra e auto-marca', async ({ page }) => {
  await page.goto('chapter-3/3.1.1');
  const block = await blockWith(page, 'make_accumulator');
  await block.locator('textarea').fill(
    'function make_accumulator(initial) {\n' +
    '    let total = initial;\n' +
    '    return amount => {\n' +
    '        total = total + amount;\n' +
    '        return total;\n' +
    '    };\n' +
    '}\n' +
    'const a = make_accumulator(5);\n'
  );
  await block.getByRole('button', { name: /Executar/ }).click();
  await expect(block.locator('div[aria-live="polite"]')).toContainText('Exercício concluído');
  await page.goto('progresso');
  await expect(page.locator('main')).toContainText('1 de 223');
});

test('compartilhar: copia link com âncora do bloco', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('chapter-1/1.1.1');
  await page.getByRole('button', { name: 'Copiar link direto para este bloco' }).first().click();
  await expect(page.getByRole('button', { name: 'Link copiado!' }).first()).toBeVisible();
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(url).toContain('#pg-');
});

test('a11y: navegação SPA move o foco para o título da nova página', async ({ page }) => {
  await page.goto('chapter-1/1.1.1');
  await page.click('a.pagination-nav__link--next');
  await page.waitForURL(/1\.1\.2/);
  await expect
    .poll(async () => page.evaluate(() => document.activeElement?.tagName))
    .toBe('H1');
});

test('glossário e solucoes acessíveis pela navegação', async ({ page }) => {
  await page.goto('glossario');
  await expect(page.locator('h1')).toContainText('Glossário');
  await page.goto('solucoes');
  await expect(page.locator('main')).toContainText('223');
});

test('página restaurada 3.4.2 exibe conteúdo completo', async ({ page }) => {
  await page.goto('chapter-3/3.4.2');
  await expect(page.locator('article')).toContainText('Exercício 3.39');
  await expect(page.locator('article')).toContainText('serializador');
});

test('comentários: seção presente no rodapé das páginas de conteúdo', async ({ page }) => {
  await page.goto('chapter-1/1.1.1');
  await expect(
    page.getByRole('button', { name: /Comentários desta página/ })
  ).toBeVisible();
});
