# Guia de Tradução - SICP.js

## Estrutura e Interpretação de Programas de Computador - Adaptação em JavaScript

Este documento fornece diretrizes e boas práticas para contribuir com a tradução do livro SICP (Structure and Interpretation of Computer Programs) - JavaScript Adaptation para o português brasileiro.

## Índice

- [Visão Geral](#visão-geral)
- [Como Contribuir](#como-contribuir)
- [Processo de Tradução](#processo-de-tradução)
- [Glossário de Termos Técnicos](#glossário-de-termos-técnicos)
- [Convenções de Estilo](#convenções-de-estilo)
- [Ferramentas e Qualidade](#ferramentas-e-qualidade)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Dicas e Melhores Práticas](#dicas-e-melhores-práticas)

## Visão Geral

Este é um projeto colaborativo de tradução do livro SICP.js para português brasileiro (pt-BR). O livro original em inglês está disponível em: https://sourceacademy.org/sicpjs/index

### Objetivos

- Traduzir todo o conteúdo do SICP.js para português brasileiro
- Manter a qualidade e precisão técnica do conteúdo original
- Tornar o conhecimento acessível para a comunidade de língua portuguesa
- Preservar exemplos de código e formatação adequada

## Como Contribuir

### 1. Configuração Inicial

```bash
# Clone o repositório
git clone https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript.git
cd estrutura-e-interpretacao-de-programas-de-computador-javascript

# Instale as dependências (requer Node.js e Python)
make install
```

### 2. Escolha uma Seção para Traduzir

- Verifique as [issues abertas](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) para ver quais seções ainda precisam ser traduzidas
- Deixe um comentário informando que você começará a tradução
- Ou abra uma nova issue para reivindicar uma seção específica

### 3. Crie uma Branch

```bash
# Crie uma branch com nome descritivo
git checkout -b traducao-secao-X.Y.Z
```

### 4. Traduza o Conteúdo

- Traduza o arquivo Markdown correspondente
- Mantenha a formatação original (cabeçalhos, listas, código, etc.)
- Não traduza código JavaScript ou nomes de funções/variáveis
- Adicione novos termos técnicos ao dicionário `.github/wordlist.txt` se necessário

### 5. Verifique a Qualidade

```bash
# Execute os testes de qualidade
make check

# Ou execute cada verificação individualmente:
make lint           # Verifica formatação Markdown
make spell-check    # Verifica ortografia em português
make link-check     # Verifica links quebrados (se disponível)
```

### 6. Envie sua Contribuição

```bash
# Adicione e commit suas mudanças
git add .
git commit -m "Traduz seção X.Y.Z - [nome da seção]"

# Envie para o GitHub
git push origin traducao-secao-X.Y.Z

# Abra um Pull Request no GitHub
```

## Processo de Tradução

### Estrutura de Capítulos

O projeto está organizado por capítulos e seções:

```text
00/                    # Prefácios e introdução
├── foreword84.md      # Prefácio de 1984
├── prefaces03.md      # Prefácio de 2003
└── prefaces96.md      # Prefácio de 1996

01/                    # Capítulo 1: Construindo Abstrações com Funções
├── 1.0.md            # Introdução do capítulo
├── 1.1.md            # Seção 1.1
├── 1.1.1.md          # Subseção 1.1.1
└── ...
```

### O Que Traduzir

✅ **Traduza:**

- Todo o texto explicativo
- Comentários em código
- Legendas e descrições
- Títulos e cabeçalhos
- Notas de rodapé

❌ **NÃO traduza:**

- Código JavaScript (nomes de funções, variáveis, etc.)
- Palavras-chave da linguagem (`function`, `const`, `let`, `return`, etc.)
- URLs e links
- Nomes próprios (pessoas, instituições)
- Termos técnicos consolidados (veja o glossário)

### Exemplo de Tradução

**Original (inglês):**

```markdown
## 1.1 The Elements of Programming

Every powerful language has three mechanisms for combining simple ideas
to form more complex ideas:

- **primitive expressions**, which represent the simplest entities the
  language is concerned with,
```

**Traduzido (português):**

```markdown
## 1.1 Os Elementos da Programação

Toda linguagem poderosa possui três mecanismos para combinar ideias simples
e formar ideias mais complexas:

- **expressões primitivas**, que representam as entidades mais simples com
  as quais a linguagem se preocupa,
```

## Glossário de Termos Técnicos

Mantenha consistência na tradução de termos técnicos. Aqui estão alguns termos comuns:

| Inglês | Português | Observação |
|--------|-----------|------------|
| function | função | Sempre traduzir |
| procedure | procedimento | Sempre traduzir |
| expression | expressão | Sempre traduzir |
| statement | declaração / instrução | Depende do contexto |
| variable | variável | Sempre traduzir |
| constant | constante | Sempre traduzir |
| parameter | parâmetro | Sempre traduzir |
| argument | argumento | Sempre traduzir |
| scope | escopo | Sempre traduzir |
| closure | closure | **Não traduzir** (termo técnico consolidado) |
| callback | callback | **Não traduzir** (termo técnico consolidado) |
| debugging | depuração | Sempre traduzir |
| bug | bug | Pode manter em inglês |
| framework | framework | **Não traduzir** |
| recursion | recursão | Sempre traduzir |
| iteration | iteração | Sempre traduzir |
| array | array | **Não traduzir** (termo técnico consolidado) |
| object | objeto | Sempre traduzir |
| primitive | primitivo/primitiva | Sempre traduzir |
| abstraction | abstração | Sempre traduzir |
| environment | ambiente | Sempre traduzir |
| interpreter | interpretador | Sempre traduzir |
| evaluation | avaliação | Sempre traduzir |

**Nota:** Quando em dúvida, verifique como outros tradutores de documentação técnica em português lidam com o termo.

## Convenções de Estilo

### Formatação Markdown

- Use cabeçalhos ATX (`#`, `##`, `###`) ao invés de Setext
- Use listas com hífen (`-`) para listas não ordenadas
- Deixe uma linha em branco antes e depois de cabeçalhos
- Use três crases (```) para blocos de código
- Sempre especifique a linguagem em blocos de código (ex: ```javascript)
- Mantenha linhas de até 3000 caracteres (configuração do projeto)

### Código JavaScript

```javascript
// Comentários devem ser traduzidos
function quadrado(x) {  // Nome da função traduzido apenas em contexto didático
  return x * x;
}

// Código de exemplo do livro deve manter nomenclatura original
function square(x) {
  return x * x;
}
```

### Aspas e Pontuação

- Use aspas duplas (`"`) para citações
- Use aspas simples (`'`) para termos técnicos ou ênfase
- Mantenha espaçamento consistente após pontuação
- Em listas, use ponto final apenas se os itens forem frases completas

### Gênero e Formalidade

- Use linguagem neutra quando possível
- Mantenha um tom formal, mas acessível
- Use "você" ao invés de "tu" ou formas muito formais
- Evite jargões excessivos

## Ferramentas e Qualidade

### Makefile - Comandos Disponíveis

O projeto inclui um Makefile com diversos comandos úteis:

```bash
make help              # Mostra todos os comandos disponíveis
make install           # Instala todas as dependências
make lint              # Verifica formatação Markdown
make spell-check       # Verifica ortografia em português
make link-check        # Verifica links quebrados
make check             # Executa lint + spell-check
make format            # Formata arquivos Markdown automaticamente
make clean             # Remove arquivos temporários
make translation-status # Mostra progresso da tradução
make ci-local          # Simula o pipeline de CI localmente
```

### Verificação de Ortografia

O projeto usa `pyspelling` com dicionário português (pt_BR). Se você usar termos técnicos ou nomes próprios que não estão no dicionário:

1. Adicione-os ao arquivo `.github/wordlist.txt`
2. Mantenha a lista em ordem alfabética
3. Execute `make reorder-wordlist` para reorganizar automaticamente

### Linter Markdown

O projeto usa `markdownlint` para garantir formatação consistente. Execute `make lint` antes de enviar suas mudanças.

## Estrutura do Projeto

```text
.
├── .github/
│   ├── workflows/
│   │   └── ci.yml                 # Pipeline de CI/CD
│   ├── markdownlint.yml           # Configuração do linter Markdown
│   ├── pyspelling.yml             # Configuração do verificador ortográfico
│   ├── markdown-link-check.json   # Configuração do verificador de links
│   └── wordlist.txt               # Dicionário de termos aprovados
├── 00/                            # Prefácios
├── 01/                            # Capítulo 1
├── 02/                            # Capítulo 2 (futuro)
├── 03/                            # Capítulo 3 (futuro)
├── 04/                            # Capítulo 4 (futuro)
├── 05/                            # Capítulo 5 (futuro)
├── Makefile                       # Comandos de desenvolvimento
├── README.md                      # Visão geral do projeto
├── TRANSLATION.md                 # Este arquivo
└── CONTRIBUTING.md                # Código de conduta
```

## Dicas e Melhores Práticas

### 1. Revise Traduções Anteriores

Antes de começar, leia seções já traduzidas para entender o estilo e terminologia usados.

### 2. Traduza em Blocos Pequenos

É melhor traduzir e revisar pequenas seções por vez do que tentar traduzir capítulos inteiros de uma vez.

### 3. Mantenha o Contexto

Entenda o contexto da seção que está traduzindo. Leia o conteúdo adjacente no original em inglês.

### 4. Use Ferramentas de Apoio

- **DeepL** ou **Google Translate** podem ajudar, mas sempre revise e ajuste
- **Linguee** é excelente para verificar traduções técnicas
- **Dicionários técnicos** de programação em português

### 5. Preserve Links e Referências

- Mantenha todos os links para o material original
- Não quebre referências cruzadas entre seções
- Verifique que âncoras (`#section-name`) ainda funcionam

### 6. Peça Revisão

- Não tenha medo de pedir revisão de outros contribuidores
- Use os comentários do Pull Request para discutir escolhas de tradução
- Seja aberto a sugestões e melhorias

### 7. Documente Decisões

Se você fizer uma escolha de tradução não-óbvia, documente no PR ou em comentários no código.

### 8. Seja Consistente

- Use sempre os mesmos termos para os mesmos conceitos
- Verifique o glossário antes de traduzir termos técnicos
- Mantenha o mesmo estilo de formatação

## Recursos Úteis

### Documentação Original

- **SICP.js Original:** https://sourceacademy.org/sicpjs/index
- **SICP Original (Scheme):** https://mitpress.mit.edu/sites/default/files/sicp/index.html

### Referências de Tradução

- **MDN Web Docs (pt-BR):** https://developer.mozilla.org/pt-BR/
- **Tradução JavaScript.info:** https://javascript.info/
- **Glossário Microsoft de Terminologia:** https://www.microsoft.com/pt-br/language

### Comunidade

- **Discussões GitHub:** Use as discussions do projeto para tirar dúvidas
- **Issues:** Para reportar problemas ou sugerir melhorias
- **Pull Requests:** Para contribuir com traduções

## Perguntas Frequentes

### Como sei quais seções ainda precisam ser traduzidas?

Verifique as issues abertas com a tag `tradução` ou `translation`. Você também pode executar `make translation-status` para ver o progresso.

### E se eu encontrar um erro em uma tradução existente?

Abra uma issue descrevendo o erro ou, melhor ainda, envie um Pull Request com a correção!

### Posso traduzir fora de ordem?

Sim, mas é preferível traduzir seções em sequência para manter consistência terminológica.

### Como adicionar palavras ao dicionário?

Edite `.github/wordlist.txt` e adicione a palavra em ordem alfabética, ou adicione e execute `make reorder-wordlist`.

### O CI falhou no meu PR, o que fazer?

Execute `make check` localmente para reproduzir os erros. Corrija os problemas apontados pelo linter e spell-checker.

## Reconhecimentos

Agradecemos a todos os contribuidores que dedicam seu tempo para tornar este conhecimento acessível em português!

Lista de contribuidores principais: https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/graphs/contributors

## Licença

Este projeto mantém a mesma licença do original. Veja o arquivo `LICENSE` para detalhes.

---

**Dúvidas?** Abra uma issue ou discussão no GitHub!

**Quer ajudar?** Toda contribuição é bem-vinda, seja traduzindo, revisando, ou melhorando a infraestrutura do projeto!
