/**
 * Percy Screenshot Script
 *
 * Captura screenshots de páginas específicas do SICP.js PT-BR
 * para visual regression testing com Percy.
 *
 * Usage: npx percy exec -- node .github/percy/percy-script.js
 */

const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

const BASE_URL = 'http://localhost:3000/pt_BR';

// Lista de páginas para capturar
const pages = [
  {
    name: 'Home Page',
    path: '/',
    widths: [375, 768, 1280, 1920]
  },
  {
    name: 'Home Page - Dark Mode',
    path: '/',
    widths: [1280],
    beforeSnapshot: async (page) => {
      // Switch to dark mode
      await page.evaluate(() => {
        const toggle = document.querySelector('[aria-label*="dark"]') ||
                      document.querySelector('[data-theme]');
        if (toggle) toggle.click();
      });
      await page.waitForTimeout(500); // Wait for theme transition
    }
  },
  // Prefácios
  {
    name: 'Foreword 1984',
    path: '/prefaces/foreword84',
    widths: [768, 1280]
  },
  {
    name: 'Foreword 1996',
    path: '/prefaces/foreword96',
    widths: [768, 1280]
  },
  {
    name: 'Preface 1984',
    path: '/prefaces/preface84',
    widths: [768, 1280]
  },
  {
    name: 'Preface 1996',
    path: '/prefaces/preface96',
    widths: [768, 1280]
  },
  {
    name: 'Preface JavaScript',
    path: '/prefaces/preface-js',
    widths: [768, 1280]
  },
  {
    name: 'Acknowledgments',
    path: '/prefaces/acknowledgments',
    widths: [768, 1280]
  },
  // Capítulo 1
  {
    name: 'Chapter 1 - Introduction',
    path: '/chapter-1/intro',
    widths: [768, 1280]
  },
  {
    name: 'Chapter 1 - Section 1.1',
    path: '/chapter-1/section-1.1',
    widths: [768, 1280]
  },
  // Adicione mais páginas conforme necessário
];

async function captureScreenshots() {
  console.log('🚀 Iniciando captura de screenshots com Percy...\n');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const pageConfig of pages) {
    const url = `${BASE_URL}${pageConfig.path}`;
    console.log(`📸 Capturando: ${pageConfig.name}`);
    console.log(`   URL: ${url}`);

    try {
      // Navigate to page
      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for content to load
      await page.waitForSelector('article, main, .container', {
        timeout: 10000
      }).catch(() => {
        console.log('   ⚠️ Timeout esperando por seletor, continuando...');
      });

      // Execute before snapshot hook if provided
      if (pageConfig.beforeSnapshot) {
        await pageConfig.beforeSnapshot(page);
      }

      // Take Percy snapshot
      await percySnapshot(page, pageConfig.name, {
        widths: pageConfig.widths || [768, 1280],
        minHeight: 1024,
        percyCSS: `
          /* Hide dynamic elements */
          .navbar__item--github-stars,
          .announcement-bar {
            display: none !important;
          }

          /* Disable animations */
          * {
            animation-duration: 0s !important;
            transition-duration: 0s !important;
          }
        `
      });

      console.log(`   ✅ Screenshot capturado\n`);
    } catch (error) {
      console.error(`   ❌ Erro capturando ${pageConfig.name}:`, error.message);
      console.log('');
    }
  }

  await browser.close();
  console.log('✅ Captura de screenshots concluída!');
}

// Run
captureScreenshots().catch(error => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
