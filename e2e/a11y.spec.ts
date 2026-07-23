// @ts-check
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type * as axe from 'axe-core';

declare global {
  interface Window {
    axe: typeof axe;
  }
}

/**
 * Portão de acessibilidade (A11Y-PLAN, "Technical Check" do Definition of
 * Done): axe-core sobre as páginas representativas, nos dois temas. Falha
 * em qualquer violação WCAG A/AA de impacto serious ou critical.
 */

const AXE = readFileSync('node_modules/axe-core/axe.min.js', 'utf8');

const PAGES = [
  '',                    // início
  'chapter-1/1.1.1',     // playgrounds + comentários
  'chapter-1/1.1.6',     // exercícios com soluções
  'chapter-4/4.4.3',     // exercícios em <Exercise>
  'progresso',
  'glossario',
];

for (const theme of ['light', 'dark']) {
  for (const path of PAGES) {
    test(`axe ${theme}: /${path || '(início)'}`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.goto(path || '.', { waitUntil: 'networkidle' });
      await page.addScriptTag({ content: AXE });
      const violations = await page.evaluate(async () => {
        const res = await window.axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
          },
        });
        return res.violations
          .filter((v) => v.impact === 'serious' || v.impact === 'critical')
          .map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
          }));
      });
      expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
    });
  }
}
