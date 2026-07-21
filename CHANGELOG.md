# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.2.0] - 2026-07-21

### ✨ Adicionado

- **Soluções oficiais para todos os 223 exercícios da tradução** — os 33 que
  faltavam no capítulo 4 (avaliador metacircular, Teorema da Parada, toda a
  seção `amb` e a inferência lógica de 4.4.3) e o exercício 5.7
- Página **[/progresso](https://sicpjs.com/pt_BR/progresso)**: acompanhe os
  exercícios resolvidos por capítulo e seção, com marcação manual em cada
  solução e automática quando as verificações de um exercício passam
- **[Glossário](https://sicpjs.com/pt_BR/glossario)** de termos técnicos EN → PT, refletindo as escolhas reais da tradução
- **PWA**: o site pode ser instalado (Adicionar à Tela Inicial) e lido offline, playgrounds incluídos
- Google Analytics (GA4) com eventos de uso real: execuções de playground, soluções abertas, exercícios concluídos, capítulos terminados
- Dois exercícios adicionais próprios desta edição no capítulo 4.1.2,
  claramente marcados como fora da numeração oficial

### 🔧 Modificado

- **Renumeração canônica dos capítulos 4 e 5**: a numeração de exercícios
  agora bate 1:1 com a edição JS oficial (verificada contra o código-fonte
  e o site da Source Academy) — números duplicados e deslocados corrigidos,
  com todas as referências cruzadas atualizadas
- Pipeline de eBooks reescrito: os capítulos `.mdx` (o livro inteiro) agora
  entram no EPUB/PDF — antes, apenas prefácios e apêndices eram incluídos

### 🐛 Corrigido

- Exercício duplicado no capítulo 4 (o 4.1 aparecia de novo como "4.4")
- Solução do exercício 5.1 exposta sem spoiler; referência "exercício 2.29"
  que deveria ser 4.61

## [2.1.0] - 2026-07-21

### ✨ Adicionado

- Soluções oficiais para os 5 capítulos (192 exercícios nesta versão), cada
  uma atrás de um spoiler "tente primeiro", com código executável verificado
  pela auditoria de CI
- Índice de soluções em [/solucoes](https://sicpjs.com/pt_BR/solucoes)

## [2.0.0] - 2026-07-20

### ✨ Adicionado

- **Playground próprio** (REPL): todo bloco de código do livro é editável e
  executável, com eco do valor da última expressão como no livro
- Biblioteca SICP JS embutida (`pair`, `list`, `display`, streams, …),
  sessões por página (blocos posteriores enxergam declarações anteriores),
  diagramas caixa-e-ponteiro, árvore de chamadas, inspetor de streams,
  verificações de exercício com celebração, persistência de edições e
  compartilhamento por link
- Busca local em português, página /playground, modo leitura,
  barra de progresso com confete no fim de cada capítulo
- Testes semânticos do playground + auditoria que executa todos os blocos
  do livro no CI

### 🔧 Modificado

- Licença corrigida para CC BY-SA 4.0 com atribuição completa no rodapé
- CI reconstruído (lint, ortografia pt-BR, playgrounds, links não bloqueante)

### 🚮 Removido

- Sandpack (substituído pelo playground próprio)
- Percy e automações não utilizadas

## [1.0.0] - 2024-XX-XX

### ✨ Lançamento Inicial

- Estrutura base do projeto com Docusaurus 3.5.2
- Tradução inicial dos prefácios e capítulo 1
- Sistema de navegação por capítulos
- Integração com Source Academy para exemplos
- Licença CC BY-SA 4.0
- Infraestrutura de contribuição colaborativa

---

## Como Usar Este Changelog

Este CHANGELOG documenta todas as mudanças significativas no projeto. Contribuidores devem:

1. **Adicionar entradas na seção [Não Lançado]** quando fazem PRs
2. **Usar categorias apropriadas**:
   - `✨ Adicionado` - novas funcionalidades
   - `🔧 Modificado` - mudanças em funcionalidades existentes
   - `🗑️ Descontinuado` - funcionalidades que serão removidas
   - `🚮 Removido` - funcionalidades removidas
   - `🐛 Corrigido` - correções de bugs
   - `🔒 Segurança` - correções de vulnerabilidades

3. **Seguir conventional commits** para facilitar geração automática

### Exemplo de Entrada

```markdown
### ✨ Adicionado

- Tradução completa do Capítulo 2 (#123) @usuario
- Novo componente para visualização de árvores (#456) @usuario

### 🐛 Corrigido

- Link quebrado na seção 1.2.3 (#789) @usuario
- Erro de digitação no exemplo de recursão (#012) @usuario
```

## Geração Automática (Futuro)

No futuro, este CHANGELOG poderá ser gerado automaticamente com:

```bash
npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
```

Isso funcionará porque usamos Conventional Commits em todos os commits.

## Versionamento

Este projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/):

- **MAJOR** (X.0.0): Mudanças incompatíveis (raramente usado em tradução)
- **MINOR** (1.X.0): Novas funcionalidades compatíveis (novos capítulos, features)
- **PATCH** (1.0.X): Correções e pequenas melhorias (typos, links, formatação)

Exemplo de releases futuras:

- `1.0.0` - Capítulo 1 completo
- `1.1.0` - Capítulo 2 completo
- `1.1.1` - Correções no Capítulo 1 e 2
- `2.0.0` - Todos os capítulos completos

---

**Nota**: Datas seguem formato ISO 8601 (YYYY-MM-DD) para facilitar parsing automático.

<!-- spellcheck: disable -->

[Não Lançado]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/releases/tag/v1.0.0

<!-- spellcheck: enable -->
