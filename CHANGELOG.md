# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não Lançado]

### ✨ Adicionado

- Sistema de verificação de qualidade automatizada com CI/CD
  - Markdown linting com markdownlint-cli
  - Spell checking em português com pyspelling
  - Link validation com markdown-link-check
- Workflow de criação de PR com conventional commits (`make pr`)
- Verificação mensal automática de links quebrados
- Favicons personalizados com tema JavaScript
- EditorConfig para consistência de código
- CODEOWNERS para revisão automática
- Architecture Decision Records (ADRs)
- FAQ completo para contribuidores
- Suporte a fórmulas matemáticas com KaTeX
- Componente Sandpack para exemplos interativos
- Tema claro/escuro com persistência

### 🔧 Configuração

- Node.js ≥18.0 definido como requisito mínimo
- .nvmrc para gestão de versão do Node
- Conventional Commits com emojis
- Makefile com comandos automatizados
- GitHub Actions para CI/CD
- Deploy automático para GitHub Pages

### 📝 Documentação

- Guia de Tradução (TRANSLATION.md)
- Guia de Contribuição (CONTRIBUTING.md)
- FAQ para dúvidas comuns
- README com badges e instruções
- ADRs documentando decisões técnicas
- Comentários inline em configurações

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
[Não Lançado]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/releases/tag/v1.0.0
<!-- spellcheck: enable -->
