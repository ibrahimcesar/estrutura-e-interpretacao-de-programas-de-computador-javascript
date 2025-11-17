// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SICP.js em Português',
  tagline: 'Estrutura e Interpretação de Programas de Computador - Adaptação JavaScript',
  favicon: 'img/favicon.svg',

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
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Social card and metadata
      image: 'img/sicp-social-card.jpg',
      metadata: [
        {name: 'theme-color', content: '#f7df1e'},
        {name: 'apple-mobile-web-app-capable', content: 'yes'},
        {name: 'apple-mobile-web-app-status-bar-style', content: '#f7df1e'},
      ],
      navbar: {
        title: 'SICP.js',
        logo: {
          alt: 'SICP.js Logo',
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
              {
                label: 'Prefácios',
                to: '/prefaces/foreword84',
              },
              {
                label: 'Capítulo 1',
                to: '/chapter-1/intro',
              },
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
                label: 'Como Contribuir',
                to: '/como-contribuir',
              },
              {
                label: 'Source Academy',
                href: 'https://sourceacademy.org',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Projeto SICP.js PT-BR. Conteúdo licenciado sob CC BY-SA 4.0.`,
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
