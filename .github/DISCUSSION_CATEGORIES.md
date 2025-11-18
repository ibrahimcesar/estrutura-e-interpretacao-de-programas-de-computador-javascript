# 📂 GitHub Discussions - Categorias

Este documento descreve as categorias de GitHub Discussions e como configurá-las.

## 🎯 Categorias Recomendadas

### 1. 📢 Announcements (Anúncios)

**Configuração**:
- **Formato**: Announcement
- **Emoji**: 📢
- **Descrição**: Novidades e comunicados oficiais sobre o projeto

**Permissões**: Apenas mantenedores podem criar tópicos

**Uso**:
- Lançamento de novos capítulos traduzidos
- Mudanças importantes no projeto
- Marcos alcançados (ex: "500 commits!", "Capítulo 1 completo!")
- Novas funcionalidades do site

---

### 2. ❓ Questions & Help (Perguntas e Ajuda)

**Configuração**:
- **Formato**: Q&A (Question and Answer)
- **Emoji**: ❓
- **Descrição**: Tire suas dúvidas sobre contribuição, ferramentas e uso

**Permissões**: Todos podem criar e responder

**Uso**:
- Dúvidas sobre como contribuir
- Problemas com ferramentas (Git, Node, etc.)
- Perguntas sobre o conteúdo do SICP
- Como usar funcionalidades do site
- Questões sobre o processo de tradução

**Features**:
- Permite marcar resposta como "Accepted Answer"
- Útil para criar base de conhecimento

---

### 3. 🌍 Translation Discussions (Discussões de Tradução)

**Configuração**:
- **Formato**: Discussion
- **Emoji**: 🌍
- **Descrição**: Debate sobre escolhas de tradução e terminologia técnica

**Permissões**: Todos podem criar e responder

**Uso**:
- Debate sobre como traduzir termos específicos
- Consistência de terminologia
- Glossário de termos técnicos
- Nuances da língua portuguesa
- Regionalismo (PT-BR vs PT-PT)

**Tópicos típicos**:
- "Como traduzir 'higher-order function'?"
- "Devemos manter 'lambda' ou traduzir?"
- "Sugestões para o glossário"

---

### 4. 💡 Feature Requests (Solicitações de Funcionalidade)

**Configuração**:
- **Formato**: Discussion
- **Emoji**: 💡
- **Descrição**: Ideias para melhorar o projeto e o site

**Permissões**: Todos podem criar e responder

**Uso**:
- Novas funcionalidades para o site
- Melhorias no processo de tradução
- Ferramentas e automações
- Recursos educacionais adicionais

**Nota**: Quando uma ideia está madura, converta para Issue

---

### 5. 🎨 Show and Tell (Mostre seu Trabalho)

**Configuração**:
- **Formato**: Discussion
- **Emoji**: 🎨
- **Descrição**: Compartilhe projetos, aprendizados e aplicações do SICP

**Permissões**: Todos podem criar e responder

**Uso**:
- Projetos inspirados pelo SICP
- Implementações de exercícios
- Visualizações e ferramentas criadas
- Experiências de aprendizado
- Aplicações práticas dos conceitos

---

### 6. 💬 General (Geral)

**Configuração**:
- **Formato**: Discussion
- **Emoji**: 💬
- **Descrição**: Conversas gerais sobre o projeto e comunidade

**Permissões**: Todos podem criar e responder

**Uso**:
- Apresentações de novos membros
- Feedback sobre o projeto
- Meta-discussões
- Tópicos que não se encaixam em outras categorias
- Networking

---

## 🔧 Como Configurar no GitHub

### Passo 1: Habilitar Discussions

1. Acesse o repositório no GitHub
2. Settings → General
3. Em "Features", marque **Discussions**
4. Clique em **Set up discussions**

### Passo 2: Criar Categorias

1. Vá para a aba **Discussions**
2. Clique no ícone de engrenagem (⚙️) → **Categories**
3. Crie cada categoria conforme descrito acima

### Passo 3: Configurar Permissões

Para **Announcements**:
1. Ao criar a categoria, selecione formato **Announcement**
2. Isso automaticamente restringe criação de tópicos

Para outras categorias:
1. Selecione formato **Discussion** ou **Q&A**
2. Permissões padrão (todos podem criar) estão OK

### Passo 4: Pin de Tópicos Importantes

Crie e fixe tópicos de boas-vindas:

**"👋 Welcome! Start Here"** em General:
```markdown
# Bem-vindo ao SICP.js PT-BR! 👋

Obrigado por se juntar à nossa comunidade!

## 🎯 Por Onde Começar?

1. Leia o [Guia de Contribuição](link)
2. Veja o [FAQ](link) para dúvidas comuns
3. Confira as [Issues abertas](link) para encontrar tarefas
4. Apresente-se aqui! Adoraríamos conhecê-lo(a)

## 📚 Recursos Úteis

- [Guia de Tradução](link)
- [SICP.js Original](link)
- [GitHub Discussions - Guia Completo](link)

## 🤝 Código de Conduta

Este projeto segue o [Contributor Covenant](link). Seja respeitoso e acolhedor!
```

**"🌍 Glossário de Termos Técnicos"** em Translation Discussions:
```markdown
# Glossário de Termos Técnicos

Neste tópico, mantemos uma lista de termos técnicos e suas traduções.

| Inglês | Português | Notas |
|--------|-----------|-------|
| higher-order function | função de ordem superior | Decidido em #123 |
| closure | closure | Mantido em inglês |
| ... | ... | ... |

**Quer sugerir um termo?** Comente abaixo ou crie novo tópico!
```

---

## 📊 Estrutura Recomendada de Labels

Para organizar ainda mais, crie labels:

- `good-first-discussion` - Bom para iniciantes
- `needs-decision` - Precisa de decisão da comunidade
- `consensus-reached` - Consenso alcançado
- `convert-to-issue` - Pronto para virar issue

---

## 🎯 Boas Práticas de Moderação

### Como Mantenedor

1. **Seja presente** - Responda discussions regularmente
2. **Guie conversas** - Redirecione para categorias corretas
3. **Marque respostas** - Em Q&A, marque respostas corretas
4. **Converta para Issues** - Quando discussions chegarem a conclusões acionáveis
5. **Archive quando necessário** - Discussions obsoletas podem ser arquivadas
6. **Fixe recursos importantes** - Glossários, guias, FAQs

### Incentive a Comunidade

- ⭐ Dê reações em contribuições úteis
- 🏆 Reconheça membros ativos
- 📢 Compartilhe discussions interessantes
- 🙏 Agradeça contribuições

---

## 📈 Métricas de Sucesso

Acompanhe:
- Número de discussions ativas
- Taxa de respostas
- Tempo médio de resposta
- Conversões discussion → issue
- Participação da comunidade

---

## 🔗 Referências

- [GitHub Discussions Documentation](https://docs.github.com/en/discussions)
- [Best Practices for Discussions](https://github.com/community/community/discussions/categories/discussions)
- [Moderating Discussions](https://docs.github.com/en/discussions/managing-discussions-for-your-community/moderating-discussions)

---

## ✅ Checklist de Setup

- [ ] Habilitar Discussions no repositório
- [ ] Criar 6 categorias conforme especificado
- [ ] Configurar permissões (Announcements restrito)
- [ ] Criar tópico de boas-vindas fixado
- [ ] Criar glossário fixado em Translation Discussions
- [ ] Adicionar link para Discussions no README
- [ ] Atualizar templates de issues com link para Discussions
- [ ] Documentar quando usar Issues vs Discussions
- [ ] Anunciar lançamento das Discussions
- [ ] Monitorar e moderar regularmente

---

**Pronto para lançar!** 🚀

Discussions bem organizadas criam uma comunidade forte e engajada.
