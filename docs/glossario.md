---
id: glossario
title: Glossário
description: Como os termos técnicos do SICP JS foram traduzidos para o português brasileiro — e por quê.
---

# Glossário

Este glossário registra as escolhas de tradução usadas em todo o livro. Ele serve
a dois públicos: quem lê esta edição em paralelo com a [edição original em
inglês](https://sourceacademy.org/sicpjs/index) e quer saber a que termo original
uma palavra corresponde; e quem contribui com a tradução e precisa manter a
consistência (veja também o [Guia de Tradução](/guia-traducao)).

A regra geral: traduzimos quando existe termo consolidado em português técnico;
mantemos o inglês quando a tradução criaria mais confusão do que clareza. Nos
identificadores de código (`stream_tail`, `head`, `pair`), o inglês é sempre
preservado — o código é o da edição original.

<!-- spellcheck: disable -->

## Fundamentos (Capítulo 1)

| Inglês | Português | Observação |
| --- | --- | --- |
| expression | expressão | |
| statement | instrução | *expression statement* → instrução de expressão |
| declaration | declaração | de constante, de função, de variável |
| function | função | |
| parameter / argument | parâmetro / argumento | parâmetro na declaração, argumento na aplicação |
| scope | escopo | |
| evaluation | avaliação | |
| substitution model | modelo de substituição | |
| applicative order / normal order | ordem aplicativa / ordem normal | |
| recursive / iterative process | processo recursivo / processo iterativo | processo ≠ função: uma função recursiva pode gerar um processo iterativo |
| tail recursion | recursão de cauda | |
| higher-order function | função de ordem superior | |
| fixed point | ponto fixo | |
| predicate | predicado | |

## Dados (Capítulo 2)

| Inglês | Português | Observação |
| --- | --- | --- |
| data abstraction | abstração de dados | |
| abstraction barrier | barreira de abstração | |
| pair | par | as funções continuam `pair`, `head`, `tail` |
| box-and-pointer diagram | diagrama de caixa e ponteiro | os diagramas interativos dos playgrounds usam essa notação |
| tree | árvore | |
| dispatch | despacho | *dispatch on type* → despacho por tipo |
| data-directed programming | programação dirigida por dados | |
| tagged data | dados etiquetados | |
| arity | aridade | |

## Estado e modularidade (Capítulo 3)

| Inglês | Português | Observação |
| --- | --- | --- |
| assignment | atribuição | |
| state / local state | estado / estado local | |
| environment | ambiente | |
| frame | quadro | no modelo de ambientes |
| queue / stack | fila / pilha | |
| stream | stream (fluxo) | mantemos *stream* pela proximidade com o código (`stream_tail`, …); "fluxo" aparece como apoio na prosa |
| delayed / lazy evaluation | avaliação atrasada / avaliação preguiçosa | |
| memoization | memoização | |
| aliasing | aliasing | **não traduzir** (termo técnico consolidado) |
| closure | closure | **não traduzir** quando se refere a funções que capturam seu ambiente |

## Linguagens e máquinas (Capítulos 4 e 5)

| Inglês | Português | Observação |
| --- | --- | --- |
| metacircular evaluator | avaliador metacircular | |
| parsing | análise sintática | |
| thunk | thunk | **não traduzir** (termo técnico consolidado) |
| nondeterministic | não determinístico | |
| register machine | máquina de registradores | |
| garbage collection | coleta de lixo | *stop-and-copy* mantido em inglês |
| compiler / interpreter | compilador / interpretador | |
| target / linkage | destino / ligação | nos registradores do compilador |

## Termos gerais de programação

| Inglês | Português | Observação |
| --- | --- | --- |
| array | array | **não traduzir** (termo técnico consolidado) |
| bug | bug | pode manter em inglês |
| callback | callback | **não traduzir** (termo técnico consolidado) |
| debugging | depuração | |
| framework | framework | **não traduzir** |
| iteration | iteração | |
| loop | laço | |
| object | objeto | |
| primitive | primitivo / primitiva | |
| recursion | recursão | |
| variable / constant | variável / constante | |

<!-- spellcheck: enable -->

Encontrou uma inconsistência no texto — um termo traduzido de um jeito numa
seção e de outro jeito em outra? [Abra uma
issue](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues):
consistência terminológica é exatamente o tipo de contribuição que mantém uma
tradução viva.
