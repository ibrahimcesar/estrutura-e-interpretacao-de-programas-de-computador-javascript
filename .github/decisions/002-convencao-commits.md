# ADR-002: Adotar Conventional Commits com Emojis

**Status:** Aceito

**Data:** 2024-11-17

**Responsáveis:** @ibrahimcesar

## Contexto

O projeto precisa de uma convenção clara para mensagens de commit que:

- Facilite a geração automática de CHANGELOG
- Permita identificar rapidamente o tipo de mudança
- Seja fácil de entender e seguir
- Melhore a comunicação entre contribuidores
- Suporte automação (semantic versioning, releases)

Commits inconsistentes dificultam:
- Entender o histórico do projeto
- Gerar releases automáticos
- Identificar breaking changes
- Rastrear features e bugs

## Decisão

Adotaremos **Conventional Commits** com prefixo de **emojis** para maior clareza visual.

### Formato do Commit

```
<emoji> <tipo>: <descrição em minúsculas>

[corpo opcional]

[rodapé opcional]
```

### Tipos de Commit e Emojis

| Tipo | Emoji | Descrição | Exemplo |
|------|-------|-----------|---------|
| `feat` | ✨ | Nova funcionalidade | `✨ feat: adicionar capítulo 3` |
| `fix` | 🐛 | Correção de bug | `🐛 fix: corrigir link quebrado na seção 2.1` |
| `docs` | 📝 | Documentação | `📝 docs: atualizar guia de tradução` |
| `style` | 💄 | Formatação, CSS | `💄 style: melhorar contraste no tema escuro` |
| `refactor` | ♻️ | Refatoração | `♻️ refactor: reorganizar estrutura de pastas` |
| `test` | ✅ | Testes | `✅ test: adicionar teste de links` |
| `chore` | 🔧 | Manutenção | `🔧 chore: atualizar dependências` |
| `perf` | ⚡ | Performance | `⚡ perf: otimizar imagens` |

### Implementação no Workflow

O comando `make pr` implementa este padrão:

1. Solicita ao usuário o tipo de mudança (1-8)
2. Solicita descrição (convertida para minúsculas)
3. Gera branch no formato: `tipo/descricao-em-kebab-case`
4. Cria commit: `emoji tipo: descrição em minúsculas`
5. Adiciona metadados do Claude Code quando aplicável

### Exemplos de Commits Válidos

```bash
✨ feat: adicionar seção sobre higher-order functions
🐛 fix: corrigir erro de digitação no exemplo 1.2.3
📝 docs: atualizar readme com novas instruções
💄 style: melhorar espaçamento dos blocos de código
♻️ refactor: simplificar lógica do makefile
✅ test: adicionar verificação de ortografia
🔧 chore: atualizar docusaurus para v3.5.2
⚡ perf: reduzir tamanho do bundle
```

## Consequências

### Positivas

- **Histórico legível**: Commits são auto-explicativos
- **Emojis visuais**: Facilita scan rápido do git log
- **Automação futura**: Preparado para changelog automático
- **Consistência**: Todo contribuidor segue o mesmo padrão
- **Categorização**: Fácil filtrar por tipo (`git log --grep="feat:"`)
- **Semantic versioning**: Breaking changes identificáveis
- **Processo simplificado**: `make pr` guia o usuário

### Negativas

- **Curva de aprendizado**: Novos contribuidores precisam aprender
- **Emojis opcionais**: Alguns podem não gostar de emojis em commits
- **Enforcement manual**: Sem validação automática (pode adicionar hook)
- **Overhead inicial**: Pensar no tipo antes de commitar

### Neutras

- **Commits mais longos**: Prefixo adiciona caracteres
- **Necessita documentação**: Precisa estar no CONTRIBUTING.md
- **Git hooks futuros**: Pode requerer commitlint para validação

## Alternativas Consideradas

### Alternativa 1: Conventional Commits Puro (sem emojis)

**Descrição:** Usar apenas `tipo: descrição` sem emojis

**Por que foi rejeitada:**
- Menos visual no git log
- Emojis não atrapalham e adicionam clareza
- Comunidade moderna adota emojis (ex: Angular, Vue)

### Alternativa 2: Gitmoji

**Descrição:** Usar apenas emojis sem tipo textual

**Por que foi rejeitada:**
- Menos explícito que texto
- Dificulta busca/grep
- Emojis podem ter interpretações diferentes
- Não compatível com ferramentas de changelog

### Alternativa 3: Commits Livres

**Descrição:** Sem convenção, cada um escreve como quiser

**Por que foi rejeitada:**
- Impossível gerar changelog automático
- Histórico inconsistente
- Dificulta code review
- Não profissional para projeto colaborativo

### Alternativa 4: Angular Commit Convention

**Descrição:** Convenção do Angular (scope, breaking changes)

**Por que foi rejeitada:**
- Muito verboso para projeto de tradução
- Scopes não são tão relevantes aqui
- Overhead desnecessário
- Conventional Commits é mais simples e suficiente

## Referências

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Gitmoji Guide](https://gitmoji.dev/)
- [Semantic Versioning](https://semver.org/)
- [Angular Commit Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)

## Notas de Implementação

### Integração com Makefile

O comando `make pr` automatiza todo o processo:

```bash
make pr
# 1. Mostra menu com tipos (1-8)
# 2. Usuário escolhe tipo
# 3. Usuário descreve mudança
# 4. Script converte para minúsculas
# 5. Cria branch: tipo/descricao-kebab
# 6. Faz commit: emoji tipo: descrição
# 7. Push e retorna para main
```

### Validação Futura (Opcional)

Pode-se adicionar `commitlint` com hook:

```bash
npm install --save-dev @commitlint/{cli,config-conventional}
```

E configurar `.husky/commit-msg` para validar automaticamente.

### Changelog Automático Futuro

Com commits padronizados, pode-se gerar changelog com:

```bash
npx conventional-changelog-cli -p angular -i CHANGELOG.md -s
```

### Migração de Commits Antigos

Commits anteriores à adoção desta convenção não precisam ser reescritos. A convenção se aplica apenas a novos commits.

---

**Histórico de Revisões:**

| Data | Responsável | Mudança |
|------|-------------|---------|
| 2024-11-17 | @ibrahimcesar | Criação inicial do ADR |
