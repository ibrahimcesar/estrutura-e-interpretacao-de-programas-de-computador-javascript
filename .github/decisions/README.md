# Architecture Decision Records (ADR)

Este diretório contém os Architecture Decision Records (ADRs) - registros de decisões arquiteturais importantes tomadas neste projeto.

## O que são ADRs?

ADRs são documentos que capturam uma decisão importante tomada junto com seu contexto e consequências. Eles ajudam a:

- Documentar o "porquê" de decisões técnicas importantes
- Facilitar onboarding de novos contribuidores
- Evitar refazer discussões já resolvidas
- Fornecer contexto histórico para decisões passadas

## Formato

Cada ADR segue este formato:

```markdown
# ADR-XXX: Título da Decisão

**Status:** [Proposto | Aceito | Rejeitado | Substituído | Descontinuado]

**Data:** YYYY-MM-DD

**Responsáveis:** @username1, @username2

## Contexto

Descreve o cenário e o problema que motivou a decisão.

## Decisão

Descreve a decisão tomada e como ela resolve o problema.

## Consequências

### Positivas
- Lista os benefícios da decisão

### Negativas
- Lista os trade-offs ou desvantagens

### Neutras
- Lista outros impactos que não são claramente positivos ou negativos

## Alternativas Consideradas

Lista outras opções que foram consideradas e por que foram rejeitadas.

## Referências

- Links relevantes, discussões, documentação, etc.
```

## Índice de ADRs

| ADR | Título | Status | Data |
|-----|--------|--------|------|
| [001](001-usar-docusaurus.md) | Usar Docusaurus para o site | Aceito | 2024-XX-XX |
| [002](002-convencao-commits.md) | Adotar Conventional Commits | Aceito | 2024-XX-XX |
| [003](003-verificacao-qualidade.md) | Implementar verificação de qualidade automatizada | Aceito | 2024-XX-XX |

## Como Criar um Novo ADR

1. Use o template em [template-adr.md](template-adr.md)
2. Numere sequencialmente (próximo número disponível)
3. Dê um nome descritivo ao arquivo: `XXX-titulo-kebab-case.md`
4. Abra um Pull Request para discussão
5. Após aprovação, atualize o índice acima

## Quando Criar um ADR

Crie um ADR quando:

- Mudar framework ou biblioteca principal
- Adotar nova convenção de código ou processo
- Fazer mudança significativa na arquitetura
- Tomar decisão que afetará contribuidores futuros
- Resolver debate técnico importante

**Não** é necessário ADR para:

- Correções de bugs simples
- Melhorias incrementais
- Atualizações de dependências
- Mudanças cosméticas
