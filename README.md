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
      <img src="https://img.shields.io/badge/node-%3E%3D18.0-brightgreen" alt="Node Version">
    </a>
    <a href="CONTRIBUTING.md">
      <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome">
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/tradução-em%20andamento-yellow" alt="Translation Progress">
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

## 📚 Sobre o Projeto

Este é um projeto colaborativo de tradução para português brasileiro do livro **SICP (Structure and Interpretation of Computer Programs)** - JavaScript Adaptation. O SICP é um dos livros mais influentes sobre ciência da computação e programação, originalmente escrito por Harold Abelson e Gerald Jay Sussman.

## 🎯 Objetivos

- Traduzir todo o conteúdo do SICP.js para português brasileiro
- Tornar este conhecimento fundamental acessível para a comunidade de língua portuguesa
- Manter a qualidade técnica e didática do material original

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
make lint              # Verifica formatação Markdown
make spell-check       # Verifica ortografia em português
make link-check        # Verifica links quebrados
make check             # Executa todas as verificações
make format            # Formata arquivos Markdown
make translation-status # Mostra progresso da tradução
```

### Guia de Tradução

Para informações detalhadas sobre o processo de tradução, convenções de estilo, glossário de termos técnicos e melhores práticas, consulte o **[Guia de Tradução](TRANSLATION.md)**.

## 📖 Estrutura do Projeto

```
00/    # Prefácios e introdução
01/    # Capítulo 1: Construindo Abstrações com Funções
02/    # Capítulo 2: (em andamento)
...
```

## 🛠️ Tecnologias

- **Markdown** - Formato dos documentos
- **markdownlint** - Verificação de formatação
- **pyspelling** - Verificação ortográfica em português
- **GitHub Actions** - CI/CD

## 📋 Status da Tradução

### Progresso Geral

```
Tradução: 🟢 Em Andamento
Capítulos Concluídos: 1/5
Progresso Estimado: ~20%
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

##### 2.1 Introdução à Abstração de Dados
- ⬜ 2.1.md (Introdução da seção)
- ⬜ Todas as subseções

##### 2.2 Dados Hierárquicos e a Propriedade de Fechamento
- ⬜ 2.2.md (Introdução da seção)
- ⬜ Todas as subseções

##### 2.3 Dados Simbólicos
- ⬜ 2.3.md (Introdução da seção)
- ⬜ Todas as subseções

##### 2.4 Múltiplas Representações para Dados Abstratos
- ⬜ 2.4.md (Introdução da seção)
- ⬜ Todas as subseções

##### 2.5 Sistemas com Operações Genéricas
- ⬜ 2.5.md (Introdução da seção)
- ⬜ Todas as subseções

**Status: ⬜ Não Iniciado (0/~25)**

---

#### 📖 Capítulo 3: Modularidade, Objetos e Estado

##### 3.1 Atribuição e Estado Local
- ⬜ 3.1.md (Introdução da seção)
- ⬜ Todas as subseções

##### 3.2 O Modelo de Ambiente de Avaliação
- ⬜ 3.2.md (Introdução da seção)
- ⬜ Todas as subseções

##### 3.3 Modelando com Dados Mutáveis
- ⬜ 3.3.md (Introdução da seção)
- ⬜ Todas as subseções

##### 3.4 Concorrência: Tempo é da Essência
- ⬜ 3.4.md (Introdução da seção)
- ⬜ Todas as subseções

##### 3.5 Streams
- ⬜ 3.5.md (Introdução da seção)
- ⬜ Todas as subseções

**Status: ⬜ Não Iniciado (0/~25)**

---

#### 📖 Capítulo 4: Abstração Metalinguística

##### 4.1 O Avaliador Metacircular
- ⬜ 4.1.md (Introdução da seção)
- ⬜ Todas as subseções

##### 4.2 Variações sobre um Scheme - Avaliação Preguiçosa
- ⬜ 4.2.md (Introdução da seção)
- ⬜ Todas as subseções

##### 4.3 Variações sobre um Scheme - Computação Não-Determinística
- ⬜ 4.3.md (Introdução da seção)
- ⬜ Todas as subseções

##### 4.4 Programação Lógica
- ⬜ 4.4.md (Introdução da seção)
- ⬜ Todas as subseções

**Status: ⬜ Não Iniciado (0/~20)**

---

#### 📖 Capítulo 5: Computação com Máquinas de Registradores

##### 5.1 Projetando Máquinas de Registradores
- ⬜ 5.1.md (Introdução da seção)
- ⬜ Todas as subseções

##### 5.2 Um Simulador de Máquina de Registradores
- ⬜ 5.2.md (Introdução da seção)
- ⬜ Todas as subseções

##### 5.3 Alocação de Armazenamento e Coleta de Lixo
- ⬜ 5.3.md (Introdução da seção)
- ⬜ Todas as subseções

##### 5.4 O Avaliador Explícito-Control
- ⬜ 5.4.md (Introdução da seção)
- ⬜ Todas as subseções

##### 5.5 Compilação
- ⬜ 5.5.md (Introdução da seção)
- ⬜ Todas as subseções

**Status: ⬜ Não Iniciado (0/~25)**

---

### 🎯 Próximas Prioridades de Tradução

1. **Capítulo 2 - Construindo Abstrações com Dados**
   - Iniciar tradução das seções 2.1 em diante
   - Aproximadamente 25 seções a serem traduzidas

### 📊 Como Acompanhar o Progresso

Para ver o status detalhado da tradução, execute:

```bash
make translation-status
```

### 🔗 Fonte Original

Toda tradução é baseada no repositório oficial: [Source Academy SICP](https://github.com/source-academy/sicp)

## 🤝 Código de Conduta

Este projeto adota o [Contributor Covenant](CONTRIBUTING.md). Ao participar, você concorda em seguir seus termos.

## 📝 Licença

Veja o arquivo [LICENSE](LICENSE) para detalhes.

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

**Quer ajudar?** Veja as [issues abertas](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) ou abra uma nova para reivindicar uma seção para traduzir!
