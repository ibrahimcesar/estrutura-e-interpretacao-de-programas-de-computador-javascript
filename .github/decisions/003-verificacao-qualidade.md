# ADR-003: Implementar Verificação de Qualidade Automatizada

**Status:** Aceito

**Data:** 2024-11-17

**Responsáveis:** @ibrahimcesar

## Contexto

Um projeto de tradução técnica colaborativa precisa manter alta qualidade em:

- **Formatação Markdown**: Consistência visual e estrutural
- **Ortografia**: Correção em português brasileiro
- **Links**: Garantir que referências não quebrem
- **Estilo**: Padrões de código e documentação

Problemas que precisam ser evitados:
- Erros de ortografia em palavras técnicas
- Links quebrados para recursos externos
- Markdown mal formatado
- Inconsistências entre contribuições

Manualmente verificar tudo a cada PR é:
- Demorado
- Sujeito a erro humano
- Desmotivante para revisores
- Não escalável

## Decisão

Implementaremos um sistema de **verificação de qualidade automatizada** usando GitHub Actions com três pilares:

1. **Markdown Linting** - markdownlint-cli
2. **Spell Checking** - pyspelling + aspell-pt-br
3. **Link Validation** - markdown-link-check

### Arquitetura

```
.github/workflows/ci.yml
├── Job: lint (markdownlint)
├── Job: spelling (pyspelling)
├── Job: link-check (markdown-link-check)
└── Job: summary (consolida resultados)
```

### Ferramentas Escolhidas

#### 1. markdownlint-cli
- **O que faz**: Valida formatação Markdown
- **Configuração**: `.github/markdownlint.yml`
- **Regras**: MD001-MD053 (headings, links, spacing, etc.)

#### 2. pyspelling + aspell-pt-br
- **O que faz**: Verifica ortografia em português
- **Configuração**: `.github/pyspelling.yml`
- **Wordlist**: `.github/wordlist.txt` (termos técnicos permitidos)
- **Script auxiliar**: `.github/reorder-wordlist.sh` (mantém wordlist ordenada)

#### 3. markdown-link-check
- **O que faz**: Valida URLs em Markdown
- **Configuração**: `.github/markdown-link-check.json`
- **Features**: Retry, timeout, ignore patterns

### Integração com Makefile

Comandos locais espelham CI:

```bash
make lint           # Roda markdownlint
make spell-check    # Roda pyspelling
make link-check     # Roda markdown-link-check
make check          # Roda todos os três
make format         # Auto-fix markdownlint
```

### Execução no CI

**Triggers:**
- Push para `main`
- Push para branches `claude/**`
- Pull Requests para `main`
- Workflow manual (`workflow_dispatch`)

**Resultado:**
- ✅ Todos passam: PR pode ser merged
- ❌ Algum falha: Bloqueia merge, indica problema

## Consequências

### Positivas

- **Qualidade consistente**: Todos PRs seguem os mesmos padrões
- **Feedback rápido**: Contribuidores veem erros em minutos
- **Economia de tempo**: Revisores focam em conteúdo, não em formatação
- **Documentação técnica correta**: Spell check pega erros sutis
- **Links sempre funcionais**: Link check previne links quebrados
- **Processo educativo**: Contribuidores aprendem padrões ao ver erros
- **Execução local**: `make check` permite testar antes de push
- **Wordlist compartilhada**: Termos técnicos aceitos documentados

### Negativas

- **CI mais lento**: ~2-3 minutos por PR (aceitável)
- **Falsos positivos**: Termos técnicos precisam ser adicionados à wordlist
- **Manutenção da wordlist**: Cresce com novos termos
- **Links externos instáveis**: Sites podem ficar offline temporariamente
- **Curva de aprendizado**: Novos contribuidores precisam entender erros

### Neutras

- **Dependências Python e Node**: Necessário para CI e desenvolvimento local
- **Configuração em múltiplos arquivos**: Cada ferramenta tem seu config
- **GitHub Actions usage**: Usa minutos do plano gratuito (suficiente)

## Alternativas Consideradas

### Alternativa 1: Verificação Manual

**Descrição:** Revisores verificam manualmente formatação, ortografia e links

**Por que foi rejeitada:**
- Não escala com múltiplos contribuidores
- Sujeito a erro humano
- Lento e desmotivante
- Inconsistente entre revisores

### Alternativa 2: Pre-commit Hooks Locais

**Descrição:** Hooks Git locais verificam antes de cada commit

**Por que foi rejeitada:**
- Requer setup adicional de cada contribuidor
- Fácil de bypasear (`--no-verify`)
- Não garante que todos usem
- CI ainda seria necessário como fallback

### Alternativa 3: Apenas Linter, Sem Spell Check

**Descrição:** Usar apenas markdownlint e link-check

**Por que foi rejeitada:**
- Erros de ortografia são comuns em traduções
- Palavras técnicas em PT-BR são desafiadoras
- Qualidade do texto é crucial para livro educacional

### Alternativa 4: Vale.sh

**Descrição:** Ferramenta de linting de prosa mais avançada

**Por que foi rejeitada:**
- Mais complexo de configurar
- Overkill para necessidades atuais
- Pyspelling + markdownlint são suficientes
- Menor comunidade e documentação

## Referências

- [markdownlint Rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [pyspelling Documentation](https://facelessuser.github.io/pyspelling/)
- [markdown-link-check](https://github.com/tcort/markdown-link-check)
- [GitHub Actions Best Practices](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)

## Notas de Implementação

### Estrutura de Arquivos

```
.github/
├── workflows/
│   ├── ci.yml                      # Pipeline principal
│   └── link-check-monthly.yml      # Verificação mensal agendada
├── markdownlint.yml                # Regras de formatação
├── pyspelling.yml                  # Config de spell check
├── markdown-link-check.json        # Config de link check
├── wordlist.txt                    # Termos permitidos
└── reorder-wordlist.sh             # Mantém wordlist ordenada
```

### Wordlist Management

A wordlist contém termos técnicos permitidos:

```
# Termos de programação
JavaScript
TypeScript
React
Docusaurus

# Termos SICP
higher-order
lambda
recursão
```

**Ordenação automática:**
```bash
./.github/reorder-wordlist.sh
```

### Link Check Configuration

Configurações importantes:

```json
{
  "timeout": "30s",
  "retryOn429": true,
  "retryCount": 3,
  "ignorePatterns": [
    { "pattern": "^http://localhost" },
    { "pattern": "example\\.com" }
  ]
}
```

### Verificação Mensal Agendada

Além do CI em PRs, temos verificação mensal:
- Cron: 1º dia do mês às 9:00 UTC
- Cria issue com links quebrados
- Mantém wordlist atualizada

### Expandindo no Futuro

Possíveis adições:

1. **Vale.sh** para regras de estilo de escrita
2. **Alex.js** para linguagem inclusiva
3. **markdownlint-cli2** com plugins adicionais
4. **Proselint** para verificações de prosa
5. **textlint** para regras customizadas em PT-BR

### Troubleshooting Comum

**Problema:** Link check falha por timeout
- **Solução:** Adicionar domínio a `ignorePatterns` temporariamente

**Problema:** Palavra técnica flagged incorretamente
- **Solução:** Adicionar a `.github/wordlist.txt` e rodar `reorder-wordlist.sh`

**Problema:** Markdown lint falha mas não sei a regra
- **Solução:** Ver mensagem de erro para código da regra (ex: MD001), consultar [documentação](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)

---

**Histórico de Revisões:**

| Data | Responsável | Mudança |
|------|-------------|---------|
| 2024-11-17 | @ibrahimcesar | Criação inicial do ADR |
