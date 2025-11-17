/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Prefácios',
      link: {
        type: 'generated-index',
        title: 'Prefácios',
        description: 'Contexto histórico e filosófico do SICP através das décadas.',
        slug: '/prefaces',
      },
      items: [
        'prefaces/foreword84',
        'prefaces/prefaces96',
        'prefaces/prefaces03',
      ],
    },
    {
      type: 'category',
      label: 'Capítulo 1: Construindo Abstrações com Funções',
      link: {
        type: 'doc',
        id: 'chapter-1/1.0',
      },
      items: [
        {
          type: 'category',
          label: '1.1 Os Elementos da Programação',
          link: {
            type: 'doc',
            id: 'chapter-1/1.1',
          },
          items: [
            'chapter-1/1.1.1',
            'chapter-1/1.1.2',
            'chapter-1/1.1.3',
            'chapter-1/1.1.4',
            'chapter-1/1.1.5',
            'chapter-1/1.1.8',
          ],
        },
        {
          type: 'category',
          label: '1.2 Funções e os Processos que geram',
          link: {
            type: 'doc',
            id: 'chapter-1/1.2',
          },
          items: [
            'chapter-1/1.2.2',
          ],
        },
        {
          type: 'category',
          label: '1.3 Abstrações de Ordem Superior',
          link: {
            type: 'doc',
            id: 'chapter-1/1.3',
          },
          items: [
            'chapter-1/1.3.4',
          ],
        },
      ],
    },
    {
      type: 'doc',
      id: 'guia-traducao',
      label: 'Guia de Tradução',
    },
    {
      type: 'doc',
      id: 'como-contribuir',
      label: 'Como Contribuir',
    },
  ],
};

export default sidebars;
