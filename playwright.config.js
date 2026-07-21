// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Testes de ponta a ponta da experiência do leitor: playgrounds (REPL,
 * sessões, diagramas, ambiente), soluções com spoiler, progresso,
 * compartilhamento. Rodam contra o build de produção servido localmente.
 *
 * Local: npm run build && npx playwright test
 */
export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: process.env.CI ? [['list'], ['github']] : 'list',
  use: {
    baseURL: 'http://localhost:3100/pt_BR/',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npx docusaurus serve --port 3100 --no-open',
    url: 'http://localhost:3100/pt_BR/',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
