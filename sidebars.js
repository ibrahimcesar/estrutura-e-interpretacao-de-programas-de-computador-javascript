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
            'chapter-1/1.1.6',
            'chapter-1/1.1.7',
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
      type: 'category',
      label: 'Capítulo 3: Modularidade, Objetos e Estado',
      link: {
        type: 'doc',
        id: 'chapter-3/3.0',
      },
      items: [
        {
          type: 'category',
          label: '3.1 Atribuição e Estado Local',
          link: {
            type: 'doc',
            id: 'chapter-3/3.1',
          },
          items: [
            'chapter-3/3.1.1',
            'chapter-3/3.1.2',
            'chapter-3/3.1.3',
          ],
        },
        {
          type: 'category',
          label: '3.2 O Modelo de Ambiente de Avaliação',
          link: {
            type: 'doc',
            id: 'chapter-3/3.2',
          },
          items: [
            'chapter-3/3.2.1',
            'chapter-3/3.2.2',
            'chapter-3/3.2.3',
            'chapter-3/3.2.4',
            'chapter-3/3.2.5',
          ],
        },
        {
          type: 'category',
          label: '3.3 Modelando com Dados Mutáveis',
          link: {
            type: 'doc',
            id: 'chapter-3/3.3',
          },
          items: [
            'chapter-3/3.3.1',
            'chapter-3/3.3.2',
            'chapter-3/3.3.3',
            'chapter-3/3.3.4',
            'chapter-3/3.3.5',
          ],
        },
        {
          type: 'category',
          label: '3.4 Concorrência: Tempo é da Essência',
          link: {
            type: 'doc',
            id: 'chapter-3/3.4',
          },
          items: [
            'chapter-3/3.4.1',
            'chapter-3/3.4.2',
          ],
        },
        {
          type: 'category',
          label: '3.5 Streams',
          link: {
            type: 'doc',
            id: 'chapter-3/3.5',
          },
          items: [
            'chapter-3/3.5.1',
            'chapter-3/3.5.2',
            'chapter-3/3.5.3',
            'chapter-3/3.5.4',
            'chapter-3/3.5.5',
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
