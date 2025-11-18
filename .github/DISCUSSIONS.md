# 💬 Guia de GitHub Discussions

Este documento explica como usar o GitHub Discussions para conversas e colaboração no projeto SICP.js PT-BR.

## 🎯 Issues vs Discussions: Quando Usar Cada Um?

### 📝 Use **Issues** para:

- ✅ **Bugs e Erros** - Algo está quebrado ou incorreto
  - Erro de tradução (palavra errada, termo técnico incorreto)
  - Link quebrado
  - Erro de ortografia
  - Código de exemplo que não funciona
  - Problema no site (navegação, layout)

- ✅ **Solicitações de Tradução** - Reivindicar seção para traduzir
  - "Quero traduzir a seção 2.3.1"
  - "Estou trabalhando no Capítulo 3"

- ✅ **Melhorias Específicas** - Feature requests concretos
  - "Adicionar busca no site"
  - "Melhorar navegação mobile"
  - "Adicionar exemplos interativos"

- ✅ **Tarefas Rastreáveis** - Algo que precisa ser "feito" e "fechado"
  - Atualizar dependência
  - Corrigir formatação de arquivo específico
  - Implementar feature específica

### 💬 Use **Discussions** para:

- ✅ **Perguntas Abertas** - Dúvidas sem resposta certa/errada
  - "Como devo traduzir o termo 'closure'?"
  - "Qual a melhor forma de explicar recursão?"
  - "Como vocês lidam com termos ambíguos?"

- ✅ **Discussões de Tradução** - Debate sobre escolhas
  - "Devemos traduzir 'higher-order function' como 'função de ordem superior' ou 'função de alta ordem'?"
  - "Como manter consistência entre capítulos?"

- ✅ **Ideias e Brainstorming** - Explorando possibilidades
  - "E se adicionássemos quizzes ao final de cada capítulo?"
  - "Poderíamos criar um glossário interativo?"

- ✅ **Compartilhar Experiências** - Show and Tell
  - "Aprendi algo interessante traduzindo esta seção"
  - "Aqui está como apliquei os conceitos do SICP"

- ✅ **Anúncios e Atualizações** - Comunicação da comunidade
  - Novos recursos disponíveis
  - Marcos alcançados
  - Mudanças importantes no projeto

- ✅ **Conversas Gerais** - Tópicos não específicos
  - Feedback sobre o projeto
  - Sugestões amplas
  - Networking com outros tradutores

## 📂 Categorias de Discussions

### 📢 Announcements (Anúncios)
**Uso**: Comunicados oficiais do projeto
**Quem pode postar**: Mantenedores
**Exemplos**:
- "Capítulo 2 completo! 🎉"
- "Nova funcionalidade: Exemplos interativos"
- "Mudança no processo de contribuição"

### ❓ Questions & Help (Perguntas e Ajuda)
**Uso**: Tirar dúvidas sobre qualquer aspecto
**Quem pode postar**: Todos
**Exemplos**:
- "Como faço para rodar o projeto localmente?"
- "Qual ferramenta usar para editar Markdown?"
- "Como funciona o processo de revisão?"
- "Não entendi o conceito de X no SICP"

### 🌍 Translation Discussions (Discussões de Tradução)
**Uso**: Debate sobre escolhas de tradução
**Quem pode postar**: Todos
**Exemplos**:
- "Como traduzir 'side effect'?"
- "Glossário de termos técnicos: sugestões"
- "Consistência na tradução de exemplos"
- "Manter termos em inglês ou traduzir?"

### 💡 Feature Requests (Solicitações de Funcionalidade)
**Uso**: Ideias para melhorar o projeto
**Quem pode postar**: Todos
**Exemplos**:
- "Seria legal ter um modo de estudo com anotações"
- "Adicionar exercícios práticos"
- "Integração com plataforma de código"
- "Sistema de progresso de leitura"

**Nota**: Se a ideia for bem definida e pronta para implementar, abra uma **Issue** ao invés de Discussion.

### 🎨 Show and Tell (Mostre seu Trabalho)
**Uso**: Compartilhar projetos e aprendizados
**Quem pode postar**: Todos
**Exemplos**:
- "Implementei os exercícios do Capítulo 1"
- "Criei um visualizador para árvores recursivas"
- "Como o SICP me ajudou a entender X"
- "Projeto inspirado pelos conceitos do livro"

### 💬 General (Geral)
**Uso**: Tópicos que não se encaixam nas outras categorias
**Quem pode postar**: Todos
**Exemplos**:
- Feedback sobre o projeto
- Meta-discussões sobre processos
- Networking e apresentações
- Off-topic relacionado a programação

## 🎯 Exemplos Práticos

### Exemplo 1: Encontrou um Erro
❌ **NÃO use Discussion**
✅ **USE Issue** → Template "Bug Report"

**Por quê?** Erros são problemas rastreáveis que precisam ser corrigidos e fechados.

### Exemplo 2: Dúvida sobre Tradução
✅ **USE Discussion** → Categoria "Translation Discussions"
❌ **NÃO use Issue**

**Por quê?** É uma conversa aberta sem "solução" definitiva, pode ter múltiplas opiniões válidas.

### Exemplo 3: Ideia Vaga
✅ **USE Discussion** → Categoria "Feature Requests"
**Depois de refinada** → Crie Issue com proposta concreta

**Por quê?** Discussion permite explorar a ideia, Issues são para execução.

### Exemplo 4: Como Contribuir
✅ **USE Discussion** → Categoria "Questions & Help"
✅ **OU veja** → [FAQ](../FAQ.md) e [CONTRIBUTING.md](../CONTRIBUTING.md)

**Por quê?** Dúvidas gerais são melhor respondidas em Discussions ou FAQ.

## 📋 Boas Práticas

### Ao Criar Discussion

1. **Escolha a categoria certa** - Ajuda outros a encontrarem
2. **Título claro e descritivo** - "Como traduzir X?" não "Dúvida"
3. **Contexto suficiente** - Explique o problema/pergunta
4. **Seja respeitoso** - Lembre do [Código de Conduta](../CONTRIBUTING.md)
5. **Pesquise antes** - Sua dúvida pode já ter sido respondida

### Ao Responder

1. **Seja útil e construtivo**
2. **Cite fontes** quando possível
3. **Marque como resposta** se resolveu sua dúvida
4. **Agradeça** quem ajudou
5. **Compartilhe conhecimento** - outros lerão depois

### Convertendo Discussion → Issue

Se uma Discussion chegar a conclusão acionável:

1. Resuma a decisão
2. Crie Issue com proposta clara
3. Referencie a Discussion original
4. Marque Discussion como "Answered"

**Exemplo**:
```markdown
Discussion decidiu: usar "função de ordem superior"

Criar Issue:
- Título: "Atualizar glossário com termo 'higher-order function'"
- Body: "Conforme discussão #123, padronizar como 'função de ordem superior'"
- Label: documentation
```

## 🔗 Links Úteis

- [GitHub Discussions do Projeto](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions)
- [FAQ do Projeto](../FAQ.md)
- [Guia de Contribuição](../CONTRIBUTING.md)
- [Guia de Tradução](../TRANSLATION.md)
- [Issues do Projeto](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues)

## ❓ Ainda com Dúvida?

Se não sabe se deve usar Issue ou Discussion:

1. **Pergunte a si mesmo**: "Isso tem uma solução clara e fechável?"
   - **Sim** → Issue
   - **Não** → Discussion

2. **Na dúvida** → Comece com Discussion
   - É mais fácil converter Discussion → Issue
   - Do que Issue → Discussion

3. **Veja exemplos** nos links acima

## 🙏 Obrigado!

Discussions são um espaço para nossa comunidade crescer e colaborar. Use-as para:

- 🤝 Conhecer outros contribuidores
- 💡 Compartilhar ideias
- 🧠 Aprender em conjunto
- 🌟 Construir algo incrível

**Lembre-se**: Não existe pergunta boba. Todos estamos aprendendo juntos! ✨
