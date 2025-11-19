// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SICP.js em Português',
  tagline: 'Estrutura e Interpretação de Programas de Computador - Adaptação JavaScript',
  favicon: 'img/favicon.svg',

  // Performance optimizations
  headTags: [
    // Preload KaTeX CSS for better performance
    {
      tagName: 'link',
      attributes: {
        rel: 'preload',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css',
        as: 'style',
      },
    },
    // DNS prefetch for CDN
    {
      tagName: 'link',
      attributes: {
        rel: 'dns-prefetch',
        href: 'https://cdn.jsdelivr.net',
      },
    },
    // Structured Data (Schema.org) for SEO
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Book',
        name: 'Estrutura e Interpretação de Programas de Computador - Edição JavaScript',
        alternateName: 'SICP.js em Português',
        description: 'Tradução em português brasileiro do clássico livro de ciência da computação Structure and Interpretation of Computer Programs, adaptado para JavaScript.',
        inLanguage: 'pt-BR',
        url: 'https://sicpjs.com/pt_BR/',
        author: [
          {
            '@type': 'Person',
            name: 'Harold Abelson',
            affiliation: 'Massachusetts Institute of Technology',
          },
          {
            '@type': 'Person',
            name: 'Gerald Jay Sussman',
            affiliation: 'Massachusetts Institute of Technology',
          },
          {
            '@type': 'Person',
            name: 'Martin Henz',
            affiliation: 'National University of Singapore',
          },
          {
            '@type': 'Person',
            name: 'Tobias Wrigstad',
            affiliation: 'Uppsala University',
          },
        ],
        translator: {
          '@type': 'Organization',
          name: 'Comunidade SICP.js PT-BR',
          url: 'https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript',
        },
        isBasedOn: {
          '@type': 'Book',
          name: 'Structure and Interpretation of Computer Programs, JavaScript Edition',
          url: 'https://sourceacademy.org/sicpjs',
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Ciência da Computação',
          },
          {
            '@type': 'Thing',
            name: 'Programação Funcional',
          },
          {
            '@type': 'Thing',
            name: 'JavaScript',
          },
          {
            '@type': 'Thing',
            name: 'Algoritmos',
          },
        ],
        educationalUse: 'Ensino Superior',
        audience: {
          '@type': 'EducationalAudience',
          educationalRole: 'student',
        },
        license: 'https://creativecommons.org/licenses/by-sa/4.0/',
      }),
    },
  ],

  // Set the production url of your site here
  url: 'https://sicpjs.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/pt_BR/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ibrahimcesar', // Usually your GitHub org/user name.
  projectName: 'estrutura-e-interpretacao-de-programas-de-computador-javascript', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Markdown configuration
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR'],
  },

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-R0nUaCl9XdK7gGZ5cqPvTdSBzkA3KTB/Wq3s9KJeD1h3Z0j0r6c7tWQCkF9rEZ3b',
      crossorigin: 'anonymous',
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve docs at the site's root
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false, // Disable the blog plugin
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['pt', 'en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/',
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true,
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card and metadata
      image: 'img/sicp-social-card.jpg',
      metadata: [
        { name: 'theme-color', content: '#f7df1e' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#f7df1e' },
      ],
      navbar: {
        title: 'SICP.js',
        logo: {
          alt: 'Logo SICP.js - Estrutura e Interpretação de Programas de Computador em JavaScript',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Livro',
          },
          {
            to: '/guia-traducao',
            label: 'Guia de Tradução',
            position: 'left',
          },
          {
            to: '/como-contribuir',
            label: 'Como Contribuir',
            position: 'left',
          },
          {
            href: 'https://sourceacademy.org/sicpjs',
            label: 'Original (EN)',
            position: 'right',
          },
          {
            href: 'https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Conteúdo',
            items: [
              { label: 'Prefácios', to: '/prefaces/foreword84' },
              { label: 'Cap. 1: Construindo Abstrações com Funções', to: '/chapter-1/1.1' },
              { label: 'Cap. 2: Construindo Abstrações com Dados', to: '/chapter-2/2.1' },
              { label: 'Cap. 3: Modularity, Objects e State', to: '/chapter-3/3.1' },
              { label: 'Cap. 4: Suporte Linguístico Metalinguístico', to: '/chapter-4/4.1' },
              { label: 'Cap. 5: Computação com Máquinas de Registro', to: '/chapter-5/5.1' },
            ],
          },
          {
            title: 'Comunidade',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions',
              },
              {
                label: 'Issues',
                href: 'https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues',
              },
            ],
          },
          {
            title: 'Mais',
            items: [
              {
                label: 'Guia de Tradução',
                to: '/guia-traducao',
              },
              {
                label: 'Source Academy',
                href: 'https://sourceacademy.org',
              },
              {
                label: 'Ibrahim Cesar',
                href: 'https://sibrahimcesar.com',
              },
            ],
          },
        ],
        copyright: `Este trabalho está licenciado sob <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['javascript', 'typescript', 'jsx', 'tsx'],
      },
      // Algolia Search (pode ser configurado depois)
      // algolia: {
      //   appId: 'YOUR_APP_ID',
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //   indexName: 'sicp-js-pt-br',
      // },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      announcementBar: {
        id: 'work_in_progress',
        content:
          '🚧 Este site está em desenvolvimento. Quer ajudar? <a target="_blank" rel="noopener noreferrer" href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript">Contribua no GitHub</a>! 🚧',
        backgroundColor: '#ffd700',
        textColor: '#091E42',
        isCloseable: true,
      },
    }),
};

export default config;
