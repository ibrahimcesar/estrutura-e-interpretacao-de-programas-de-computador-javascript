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

Para ver o status atual da tradução, execute:

```bash
make translation-status
```

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
