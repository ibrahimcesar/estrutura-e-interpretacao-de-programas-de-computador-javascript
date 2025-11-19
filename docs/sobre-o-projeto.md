---
id: sobre-o-projeto
title: Sobre o Projeto SICP JS
sidebar_label: Sobre o Projeto
---

# Sobre o Projeto SICP JS

## Contexto

A adaptação para JavaScript do SICP é um esforço comunitário de código aberto. O software e os dados necessários para criar estas páginas web e a edição em PDF estão contidos no repositório GitHub [source-academy/sicp](https://github.com/source-academy/sicp), e melhorias, extensões e discussões são gerenciadas neste repositório usando `git`.

Martin Henz começou a traduzir o SICP para JavaScript em 2008. Ele obteve os fontes LaTeX originais da segunda edição de Gerald Jay Sussman e os converteu para um formato XML personalizado. Os fontes originais são mantidos no formato XML, o que permite gerar a [edição comparativa](https://sicp.sourceacademy.org). Um sistema de processamento escrito em XSLT resultou na primeira versão da adaptação para JavaScript por volta de 2009, cobrindo as primeiras seções do SICP. O conteúdo do SICP JS contido nos arquivos XML está em constante melhoria pelos adaptadores Martin Henz e Tobias Wrigstad, e pela comunidade de leitores do SICP JS, usando o repositório GitHub.

No livro, fragmentos de programa frequentemente requerem outros fragmentos de programa. Para coletar e executar os programas necessários, as tags `SNIPPET` correspondentes nos arquivos XML incluem tags `REQUIRES`. Os processadores XML usam essas tags para montar os programas executáveis. O projeto pode, portanto, ser visto como um *sistema de programação literária*, feito sob medida para autoria do SICP JS.

## SICP JS Interativo

O [SICP JS Interativo](https://sourceacademy.org/sicpjs) foi projetado e implementado por Samuel Fang em 2021. Os fontes do livro em XML são traduzidos para um formato JSON, que são então lidos e renderizados por um componente dedicado da Source Academy.

## Edição Comparativa

O precursor da edição comparativa foi a edição web amigável para dispositivos móveis do SICP JS, projetada e implementada por Liu Hang em 2017. Feng Piaopiao melhorou o sistema em 2018. He Xinyue e Wang Qian desenvolveram a [edição comparativa](https://sicp.sourceacademy.org/) em 2020. As fórmulas são mantidas nos arquivos HTML resultantes e são compostas pelo navegador do leitor em tempo real, usando o sistema MathJax. A edição comparativa é mantida por Martin Henz.

## Edição em PDF

As primeiras edições em PDF (2010-2018) usavam XSLT para gerar LaTeX a partir dos fontes XML. A primeira versão em Node.js da edição em PDF foi projetada e implementada por Chan Ger Hean em 2019. Tobias Wrigstad e Martin Henz são os principais desenvolvedores deste sistema.

## Figuras

A maioria das figuras são adaptadas da [versão HTML5/EPUB3 do SICP](https://github.com/sarabander/sicp) por Andres Raba. As figuras são licenciadas sob a Licença Creative Commons Attribution-ShareAlike 4.0 International [(cc by-sa)](https://creativecommons.org/licenses/by-sa/4.0). As adaptações das figuras para JavaScript foram feitas por Tobias Wrigstad usando Inkscape e uso generoso de `sed`.
