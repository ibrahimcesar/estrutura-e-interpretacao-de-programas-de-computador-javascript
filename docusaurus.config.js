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

  onBrokenLinks: 'throw',

  // Markdown configuration
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
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

  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],

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
          alt: '🧙 SICP.js',
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
                to: '/chapter-1/1.0',
              },
              {
                label: 'Capítulo 2',
                to: '/chapter-2/2.0',
              },
              {
                label: 'Capítulo 3',
                to: '/chapter-3/3.0',
              },
              {
                label: 'Capítulo 4',
                to: '/chapter-4/4.0',
              },
              {
                label: 'Capítulo 5',
                to: '/chapter-5/5.0',
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
            title: 'Sobre',
            items: [
              {
                label: 'Sobre o Projeto',
                to: '/sobre-o-projeto',
              },
              {
                label: 'Referências',
                to: '/referencias',
              },
              {
                label: 'Agradecimentos',
                to: '/agradecimentos',
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
                label: 'Código de Conduta',
                to: '/como-contribuir',
              },
              {
                label: 'Source Academy',
                href: 'https://sourceacademy.org',
              },
            ],
          },
        ],
        copyright: `Tradução de <a href="https://sourceacademy.org/sicpjs/index" target="_blank" rel="noopener noreferrer"><em>Structure and Interpretation of Computer Programs — JavaScript Edition</em></a>, de Harold Abelson e Gerald Jay Sussman, adaptado para JavaScript por Martin Henz e Tobias Wrigstad (MIT Press / Source Academy), licenciado sob CC BY-SA 4.0. Este trabalho está licenciado sob <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`,
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
    }),
};

export default config;
