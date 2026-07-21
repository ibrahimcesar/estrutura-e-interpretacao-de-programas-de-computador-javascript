<div align="center">

  <img src="http://source-academy.github.io/sicp/sicp.png" alt="Structure and Interpretation of Computer Programs
— JavaScript Adaptation" />

  <h1>Estrutura e Interpretação de Programas de Computador</h1>
  <h2>Adaptação em JavaScript</h2>

  <p>
    <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/actions/workflows/ci.yml">
      <img src="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/workflows/CI/badge.svg" alt="CI Status">
    </a>
    <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/actions/workflows/deploy.yml">
      <img src="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/workflows/Deploy%20to%20GitHub%20Pages/badge.svg" alt="Deploy Status">
    </a>
    <a href="https://creativecommons.org/licenses/by-sa/4.0/">
      <img src="https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg" alt="License: CC BY-SA 4.0">
    </a>
    <a href="package.json">
      <img src="https://img.shields.io/badge/node-%3E%3D22.0-brightgreen" alt="Node Version">
    </a>
    <a href="CONTRIBUTING.md">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/tradução-completa-brightgreen" alt="Translation Progress">
    <img src="https://img.shields.io/badge/idioma-português-green.svg" alt="Portuguese">
    <a href="https://docusaurus.io/">
      <img src="https://img.shields.io/badge/Made%20with-Docusaurus-blue" alt="Made with Docusaurus">
    </a>
    <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/graphs/contributors">
      <img src="https://img.shields.io/github/contributors/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript" alt="Contributors">
    </a>
    <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues">
      <img src="https://img.shields.io/github/issues/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript" alt="Issues">
    </a>
    <a href="https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/commits/main">
      <img src="https://img.shields.io/github/last-commit/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript" alt="Last Commit">
    </a>
  </p>

</div>

Tradução em pt-br de [Structure and Interpretation of Computer Programs — JavaScript Adaptation](https://sourceacademy.org/sicpjs/index)

## 📖 Leia online: **[sicpjs.com](https://sicpjs.com)**

O livro completo, com exemplos de código **executáveis e editáveis** direto na página (semântica de REPL, como no livro original), modo escuro e modo de leitura focada.

## 📚 Sobre o Projeto

Este é um projeto colaborativo de tradução para português brasileiro do livro **SICP (Structure and Interpretation of Computer Programs)** - JavaScript Adaptation. O SICP é um dos livros mais influentes sobre ciência da computação e programação, originalmente escrito por Harold Abelson e Gerald Jay Sussman.

A tradução dos 5 capítulos está **completa** e publicada em [sicpjs.com](https://sicpjs.com). Os exemplos de código rodam na própria página: cada bloco é um pequeno REPL que ecoa o valor da última expressão, com a biblioteca padrão do SICP JS (`pair`, `list`, `head`, `tail`…) disponível e blocos de uma mesma página compartilhando o ambiente, como no interpretador do livro.

## 🎯 Objetivos

- Tornar este conhecimento fundamental acessível para a comunidade de língua portuguesa
- Manter a qualidade técnica e didática do material original
- Oferecer uma experiência de leitura interativa, com todos os exemplos executáveis no navegador

## 🚀 Como Contribuir

Contribuições são muito bem-vindas! Você pode ajudar traduzindo novas seções, revisando traduções existentes ou melhorando a infraestrutura do projeto.

### Configuração Rápida

```bash
# 1. Clone o repositório
git clone https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript.git
cd estrutura-e-interpretacao-de-programas-de-computador-javascript

# 2. Instale as dependências
make install

# 3. Execute os testes de qualidade
make check
```

### Comandos Disponíveis

```bash
make help              # Mostra todos os comandos disponíveis
make dev               # Servidor de desenvolvimento do site (localhost:3000)
make build             # Build de produção do site
make lint              # Verifica formatação Markdown
make spell-check       # Verifica ortografia em português
make link-check        # Verifica links quebrados
make check             # Executa todas as verificações
npm test               # Testes do playground + auditoria dos exemplos do livro
```

### Guia de Tradução

Para informações detalhadas sobre o processo de tradução, convenções de estilo, glossário de termos técnicos e melhores práticas, consulte o **[Guia de Tradução](TRANSLATION.md)**.

## 📖 Estrutura do Projeto

```
docs/
  prefaces/     # Prefácios (1984, 1996, 2003)
  chapter-1/    # Capítulo 1: Construindo Abstrações com Funções
  chapter-2/    # Capítulo 2: Construindo Abstrações com Dados
  chapter-3/    # Capítulo 3: Modularidade, Objetos e Estado
  chapter-4/    # Capítulo 4: Abstração Metalinguística
  chapter-5/    # Capítulo 5: Computação com Máquinas de Registradores
src/            # Componentes do site (playgrounds interativos, tema)
scripts/        # Testes dos playgrounds e auditoria dos exemplos
```

## 🛠️ Tecnologias

- **[Docusaurus 3](https://docusaurus.io/)** + **React** - Site estático
- **CodePlayground próprio** - Exemplos executáveis em Web Worker com semântica de REPL e biblioteca padrão do SICP JS
- **KaTeX** e **Mermaid** - Matemática e diagramas
- **markdownlint** / **pyspelling** - Formatação e ortografia em português
- **GitHub Actions** - CI (lint, ortografia, testes dos playgrounds) e deploy no GitHub Pages

## 📋 Status da Tradução

### Progresso Geral

```
Tradução: ✅ Completa (5/5 capítulos)
Site: https://sicpjs.com
```

### Detalhamento por Capítulo

#### 📖 Capítulo 0: Prefácios e Introdução
- ✅ Prefácio de 1984 (foreword84.md)
- ✅ Prefácio de 1996 (prefaces96.md)
- ✅ Prefácio de 2003 (prefaces03.md)

**Status: ✅ Completo (3/3)**

---

#### 📖 Capítulo 1: Construindo Abstrações com Funções

##### 1.0 Introdução
- ✅ 1.0.md

##### 1.1 Os Elementos da Programação
- ✅ 1.1.md (Introdução da seção)
- ✅ 1.1.1 Expressões
- ✅ 1.1.2 Nomenclatura e o Ambiente
- ✅ 1.1.3 Avaliando Combinações de Operadores
- ✅ 1.1.4 Funções Compostas
- ✅ 1.1.5 O Modelo de Substituição para Aplicação de Função
- ✅ 1.1.6 Expressões Condicionais e Predicados
- ✅ 1.1.7 Exemplo: Raiz Quadrada pelo Método de Newton
- ✅ 1.1.8 Funções como Abstrações de Caixa Preta

##### 1.2 Funções e os Processos que Geram
- ✅ 1.2.md (Introdução da seção)
- ✅ 1.2.1 Recursão Linear e Iteração
- ✅ 1.2.2 Recursão em Árvore
- ✅ 1.2.3 Ordens de Crescimento
- ✅ 1.2.4 Exponenciação
- ✅ 1.2.5 Máximo Divisor Comum
- ✅ 1.2.6 Exemplo: Testando Primalidade

##### 1.3 Formulação de Abstrações com Funções de Ordem Superior
- ✅ 1.3.mdx (Introdução da seção)
- ✅ 1.3.1 Funções como Argumentos
- ✅ 1.3.2 Construindo Funções Usando Expressões Lambda
- ✅ 1.3.3 Funções como Métodos Gerais
- ✅ 1.3.4 Funções como Retorno

**Status: ✅ Completo (22/22 - 100%)**

---

#### 📖 Capítulo 2: Construindo Abstrações com Dados

##### 2.0 Introdução
- ✅ 2.0.md

##### 2.1 Introdução à Abstração de Dados
- ✅ 2.1.md (Introdução da seção)
- ✅ 2.1.1 Exemplo: Operações Aritméticas para Números Racionais
- ✅ 2.1.2 Barreiras de Abstração
- ✅ 2.1.3 O Que Se Entende por Dados?
- ✅ 2.1.4 Exercício Estendido: Aritmética de Intervalos

##### 2.2 Dados Hierárquicos e a Propriedade de Closure
- ✅ 2.2.md (Introdução da seção)
- ✅ 2.2.1 Representando Sequências
- ✅ 2.2.2 Estruturas Hierárquicas
- ✅ 2.2.3 Sequências como Interfaces Convencionais
- ✅ 2.2.4 Exemplo: Uma Linguagem de Imagens

##### 2.3 Dados Simbólicos
- ✅ 2.3.md (Introdução da seção)
- ✅ 2.3.1 Strings como Objetos de Dados
- ✅ 2.3.2 Exemplo: Diferenciação Simbólica
- ✅ 2.3.3 Exemplo: Representando Conjuntos
- ✅ 2.3.4 Exemplo: Árvores de Codificação de Huffman

##### 2.4 Múltiplas Representações para Dados Abstratos
- ✅ 2.4.md (Introdução da seção)
- ✅ 2.4.1 Representações para Números Complexos
- ✅ 2.4.2 Dados Etiquetados
- ✅ 2.4.3 Programação Orientada a Dados e Aditividade

##### 2.5 Sistemas com Operações Genéricas
- ✅ 2.5.md (Introdução da seção)
- ✅ 2.5.1 Operações Aritméticas Genéricas
- ✅ 2.5.2 Combinando Dados de Diferentes Tipos
- ✅ 2.5.3 Exemplo: Álgebra Simbólica

**Status: ✅ Completo (24/24 - 100%)**

---

#### 📖 Capítulo 3: Modularidade, Objetos e Estado

##### 3.0 Introdução
- ✅ 3.0.md

##### 3.1 Atribuição e Estado Local
- ✅ 3.1.md (Introdução da seção)
- ✅ 3.1.1 Variáveis de Estado Local
- ✅ 3.1.2 Os Benefícios de Introduzir Atribuição
- ✅ 3.1.3 Os Custos de Introduzir Atribuição

##### 3.2 O Modelo de Ambiente de Avaliação
- ✅ 3.2.md (Introdução da seção)
- ✅ 3.2.1 As Regras para Avaliação
- ✅ 3.2.2 Aplicando Funções Simples
- ✅ 3.2.3 Quadros como Repositório de Estado Local
- ✅ 3.2.4 Declarações Internas
- ✅ 3.2.5 Máquina CSE

##### 3.3 Modelando com Dados Mutáveis
- ✅ 3.3.md (Introdução da seção)
- ✅ 3.3.1 Estrutura de Lista Mutável
- ✅ 3.3.2 Representando Filas
- ✅ 3.3.3 Representando Tabelas
- ✅ 3.3.4 Um Simulador para Circuitos Digitais
- ✅ 3.3.5 Propagação de Restrições

##### 3.4 Concorrência: Tempo é da Essência
- ✅ 3.4.md (Introdução da seção)
- ✅ 3.4.1 A Natureza do Tempo em Sistemas Concorrentes
- ✅ 3.4.2 Mecanismos para Controlar Concorrência

##### 3.5 Streams
- ✅ 3.5.md (Introdução da seção)
- ✅ 3.5.1 Streams São Listas Atrasadas
- ✅ 3.5.2 Streams Infinitos
- ✅ 3.5.3 Explorando o Paradigma de Streams
- ✅ 3.5.4 Streams e Avaliação Atrasada
- ✅ 3.5.5 Modularidade de Programas Funcionais e Modularidade de Objetos

**Status: ✅ Completo (26/26 - 100%)**

---

#### 📖 Capítulo 4: Abstração Metalinguística

- ✅ 4.0 Introdução do capítulo
- ✅ 4.1 O Avaliador Metacircular (4.1.1–4.1.7)
- ✅ 4.2 Avaliação Preguiçosa (4.2.1–4.2.3)
- ✅ 4.3 Computação Não-Determinística (4.3.1–4.3.3)
- ✅ 4.4 Programação Lógica (4.4.1–4.4.4)

**Status: ✅ Completo**

---

#### 📖 Capítulo 5: Computação com Máquinas de Registradores

- ✅ 5.0 Introdução do capítulo
- ✅ 5.1 Projetando Máquinas de Registradores (5.1.1–5.1.5)
- ✅ 5.2 Um Simulador de Máquina de Registradores (5.2.1–5.2.4)
- ✅ 5.3 Alocação de Armazenamento e Coleta de Lixo (5.3.1–5.3.2)
- ✅ 5.4 O Avaliador de Controle Explícito (5.4.1–5.4.4)
- ✅ 5.5 Compilação (5.5.1–5.5.7)

**Status: ✅ Completo**

---

### 🎯 Próximas Prioridades

1. **Exemplos interativos**: estender as sessões de playground (`session`) a mais páginas dos capítulos 2 e 3
2. **Notas de rodapé**: migrar as âncoras legadas para a sintaxe `[^N]` do Markdown

### 📊 Como Acompanhar o Progresso

Para ver o status detalhado da tradução, execute:

```bash
make translation-status
```

### 🔗 Fonte Original

Toda tradução é baseada no repositório oficial: [Source Academy SICP](https://github.com/source-academy/sicp)

## 🤝 Código de Conduta

Este projeto adota o [Contributor Covenant](docs/como-contribuir.md). Ao participar, você concorda em seguir seus termos.

## 📝 Licença

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br) — a mesma licença da obra original, *Structure and Interpretation of Computer Programs — JavaScript Edition* (Abelson, Sussman, Henz, Wrigstad / MIT Press, Source Academy). Veja o arquivo [LICENSE](LICENSE) para o texto completo.

## 🙏 Agradecimentos

Agradecemos a todos os [contribuidores](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/graphs/contributors) que dedicam seu tempo para tornar este conhecimento acessível em português!

## 🔗 Links Úteis

- [SICP.js Original (inglês)](https://sourceacademy.org/sicpjs/index)
- [Repositório Source Academy SICP (GitHub)](https://github.com/source-academy/sicp)
- [SICP Original (Scheme)](https://mitpress.mit.edu/sites/default/files/sicp/index.html)
- [Guia de Tradução](TRANSLATION.md)
- [Como Contribuir](CONTRIBUTING.md)
- [Perguntas Frequentes (FAQ)](FAQ.md)
- [Histórico de Mudanças (CHANGELOG)](CHANGELOG.md)

<!-- spellcheck: disable -->

## 🌍 Translations to Other Languages

Would you like to see SICP.js translated into another language? We encourage and support the creation of translations into different languages!

### How to Add a New Language

If you are interested in creating a translation into another language:

1. **Open an issue** in this repository describing:
   - The language you want to translate to
   - Your interest and availability to coordinate the project
   - Any previous experience with technical translations

2. **We will provide**:
   - Guidance on how to structure the translation project
   - Access to the resources and tools we use
   - Support for initial setup
   - Sharing of best practices learned from this project

3. **You can create** your own repository following the structure and processes we use here

We believe that quality knowledge should be accessible to everyone, regardless of language. We will be happy to help you start a translation into your language!

<!-- spellcheck: enable -->

---

**Quer ajudar?** Veja as [issues abertas](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues), reporte erros de tradução ou sugira melhorias para os exemplos interativos!
