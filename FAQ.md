---
title: Perguntas Frequentes (FAQ)
description: Respostas para dúvidas comuns sobre o projeto SICP.js PT-BR
---

# ❓ Perguntas Frequentes (FAQ)

## 📚 Sobre o Projeto

### O que é SICP?

SICP (*Structure and Interpretation of Computer Programs*) é um dos livros mais influentes sobre ciência da computação e programação. Originalmente escrito por Harold Abelson e Gerald Jay Sussman, é usado no MIT há décadas para ensinar fundamentos de programação.

### O que é SICP.js?

É uma adaptação do SICP original (que usava Scheme/Lisp) para JavaScript. A adaptação foi feita pela equipe do [Source Academy](https://sourceacademy.org/) da National University of Singapore.

### Por que traduzir para português?

Para tornar este conhecimento fundamental acessível à comunidade brasileira e lusófona. Muitos desenvolvedores têm dificuldade com textos técnicos em inglês, e uma tradução de qualidade pode democratizar o acesso a este conteúdo excepcional.

### Este projeto é oficial?

Este é um projeto comunitário não-oficial de tradução. O SICP.js original está disponível em [sourceacademy.org/sicpjs](https://sourceacademy.org/sicpjs).

### Qual a licença do conteúdo?

O conteúdo está licenciado sob [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), permitindo uso, adaptação e redistribuição com atribuição adequada.

## 🚀 Como Contribuir

### Preciso saber programação para contribuir?

**Não!** Existem várias formas de contribuir:

- **Tradução**: Conhecimento de português e inglês
- **Revisão**: Leitura atenta e conhecimento da língua portuguesa
- **Reportar erros**: Apenas leia e reporte problemas encontrados
- **Melhorias técnicas**: Para quem conhece Docusaurus, GitHub Actions, etc.

### Como começo a contribuir?

1. Leia o [Guia de Contribuição](CONTRIBUTING.md)
2. Veja as [issues abertas](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues)
3. Escolha uma seção para traduzir ou revisar
4. Faça um fork do repositório
5. Envie seu Pull Request

### Não sei usar Git/GitHub, posso contribuir?

Sim! Você pode:

1. Abrir uma [issue](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) reportando erros
2. Participar das [discussões](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions)
3. Enviar sugestões por email ou comentários

Se quiser aprender Git, temos um [guia básico no CONTRIBUTING.md](CONTRIBUTING.md).

### Como escolho o que traduzir?

1. Verifique as [issues com label "tradução"](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/labels/tradução)
2. Veja o status da tradução: `make translation-status`
3. Escolha uma seção não traduzida
4. Comente na issue que vai trabalhar nela (evita duplicação)

### Quanto tempo leva para meu PR ser revisado?

Geralmente entre **3-7 dias**. PRs menores tendem a ser revisados mais rapidamente.

## 🛠️ Aspectos Técnicos

### Quais ferramentas preciso instalar?

Para contribuir com tradução:

- **Git** - controle de versão
- **Node.js ≥18** - para rodar o site localmente
- **Editor de texto** - VS Code, Sublime, Vim, qualquer um

Para instalar tudo:

```bash
make install
```

### Como rodo o site localmente?

```bash
# Instalar dependências
make install

# Iniciar servidor de desenvolvimento
make start
```

O site estará disponível em `http://localhost:3000`

### O que é o Makefile?

Um arquivo com comandos automatizados para facilitar tarefas comuns:

```bash
make help              # Lista todos os comandos
make lint              # Verifica formatação
make spell-check       # Verifica ortografia
make link-check        # Verifica links
make check             # Roda todas as verificações
make pr                # Workflow completo para criar PR
```

### Meu PR falhou no CI, o que fazer?

O CI executa 3 verificações:

1. **Markdown Lint** - formatação incorreta
   - Execute `make lint` localmente
   - Veja o erro e corrija
   - Ou rode `make format` para auto-fix

2. **Spell Check** - erro de ortografia
   - Execute `make spell-check` localmente
   - Se for termo técnico correto, adicione a `.github/wordlist.txt`
   - Rode `.github/reorder-wordlist.sh` para ordenar

3. **Link Check** - link quebrado
   - Execute `make link-check` localmente
   - Corrija o link ou remova se obsoleto

### O que é esse "conventional commits"?

Uma convenção para mensagens de commit que facilita entender o histórico:

```bash
✨ feat: adicionar capítulo 3
🐛 fix: corrigir link quebrado
📝 docs: atualizar guia de tradução
```

O comando `make pr` automatiza isso para você.

### Posso usar o GitHub Codespaces?

**Sim!** O projeto funciona perfeitamente no GitHub Codespaces. Clique em "Code" → "Codespaces" → "Create codespace on main".

## 📖 Sobre Tradução

### Como traduzir termos técnicos?

Consulte o [Glossário no Guia de Tradução](TRANSLATION.md#glossário). Para termos não listados:

- Busque traduções estabelecidas na comunidade PT-BR
- Prefira termos que já têm uso consagrado
- Se não houver consenso, mantenha o termo em inglês
- Adicione nota explicativa se necessário

### Devo traduzir nomes de funções JavaScript?

**Não!** Mantenha código em inglês:

- ✅ Correto: "a função `map` aplica..."
- ❌ Errado: "a função `mapear` aplica..."

### E os exemplos de código?

- **Código**: Manter em inglês (nomes de variáveis, funções)
- **Comentários no código**: Traduzir para português
- **Output/console**: Traduzir strings que aparecem

### Como lidar com trocadilhos ou referências culturais?

1. Tente encontrar equivalente em português
2. Se não houver, traduza literalmente
3. Adicione nota de rodapé explicando o original
4. Em casos extremos, mantenha original com explicação

## 🔧 Problemas Comuns

### Erro: "command not found: make"

**macOS**: `xcode-select --install`
**Windows**: Use Git Bash ou WSL
**Linux**: `sudo apt-get install build-essential`

### Erro: "Node version not compatible"

Este projeto requer Node.js ≥18.0:

```bash
# Usando nvm (recomendado)
nvm install 18
nvm use 18

# Ou baixe de nodejs.org
```

### Erro no pyspelling: "aspell not found"

```bash
# macOS
brew install aspell

# Linux
sudo apt-get install aspell aspell-pt-br

# Windows (WSL)
sudo apt-get install aspell aspell-pt-br
```

### Site não carrega após `make start`

1. Limpe o cache: `make clear`
2. Reinstale dependências: `rm -rf node_modules && make install`
3. Verifique se porta 3000 está livre
4. Tente usar porta diferente: `npm start -- --port 3001`

### Como atualizar meu fork?

```bash
# Adicionar upstream (apenas uma vez)
git remote add upstream https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript.git

# Atualizar sempre que necessário
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 📊 Status e Progresso

### Como ver o progresso da tradução?

```bash
make translation-status
```

Ou veja o badge no [README.md](README.md).

### Quando o projeto estará completo?

O SICP tem 5 capítulos principais. É um projeto de longo prazo que depende de contribuições da comunidade. Veja o progresso atual com `make translation-status`.

### Posso ser notificado de atualizações?

Sim! No GitHub:

1. Clique em "Watch" no topo do repositório
2. Escolha "Custom"
3. Selecione os eventos de interesse (Issues, PRs, Releases)

## 🤝 Comunidade

### Onde posso tirar dúvidas?

- **Issues**: [github.com/.../issues](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues)
- **Discussions**: [github.com/.../discussions](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions)
- **Email**: Veja contatos no [CONTRIBUTING.md](CONTRIBUTING.md)

### Como posso ajudar além de traduzir?

- ⭐ Dê uma estrela no repositório
- 📢 Divulgue o projeto nas redes sociais
- 👀 Revise Pull Requests de outros
- 🐛 Reporte bugs e problemas
- 💡 Sugira melhorias
- 📝 Melhore a documentação

### Existe chat ou grupo para contribuidores?

Atualmente usamos GitHub Discussions. Se houver demanda, podemos criar:

- Discord server
- Telegram group
- Matrix room

Vote ou sugira em [Discussions](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions).

## 📚 Recursos Adicionais

### Onde encontro o livro original?

- **SICP.js (JavaScript)**: [sourceacademy.org/sicpjs](https://sourceacademy.org/sicpjs)
- **SICP original (Scheme)**: [mitpress.mit.edu/sicp](https://mitpress.mit.edu/sites/default/files/sicp/index.html)

### Existem outras traduções do SICP?

Sim! Há traduções em vários idiomas:

- Russo
- Chinês
- Francês
- Espanhol (Scheme)

Não conhecemos outra tradução PT-BR completa do SICP.js.

### Onde aprender mais sobre os conceitos do SICP?

- **Curso MIT 6.001**: Vídeos no YouTube
- **Source Academy**: Plataforma interativa
- **r/lisp** e **r/scheme**: Comunidades Reddit
- **Exercism**: Prática de Scheme/JavaScript

### Como contribuir para o SICP.js original?

Visite o repositório oficial: [github.com/source-academy/sicp](https://github.com/source-academy/sicp)

---

## 💬 Não encontrou sua pergunta?

Abra uma [issue](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) ou [discussão](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions) - ficaremos felizes em ajudar! ✨
