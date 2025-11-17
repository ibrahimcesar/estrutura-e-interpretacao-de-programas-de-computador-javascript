# Proposta: Adicionar IDE Interativo ao Projeto SICP.js em Português

## Problema Atual

O site original em https://sourceacademy.org/sicpjs/ possui um IDE interativo onde os leitores podem executar código JavaScript diretamente no navegador. Nossa tradução atualmente consiste apenas de arquivos Markdown sem nenhuma infraestrutura de site, o que limita a experiência de aprendizado.

## Objetivo

Criar um site estático com IDE interativo para executar exemplos de código JavaScript, similar ao site original, mas com conteúdo em português.

## Soluções Propostas

### Opção 1: Docusaurus + CodeSandbox/StackBlitz (Recomendado)

**Vantagens:**

- ✅ Framework moderno e popular para documentação técnica
- ✅ Suporte nativo para React/MDX (markdown com componentes interativos)
- ✅ Deploy automático via GitHub Pages
- ✅ Busca integrada e tradução i18n
- ✅ Ótima performance e SEO
- ✅ Usado por Meta, React, Jest, Redux

**Implementação:**

1. Configurar Docusaurus no projeto
2. Migrar arquivos `.md` para a estrutura do Docusaurus
3. Adicionar componentes customizados para código interativo
4. Integrar com CodeSandbox Sandpack ou StackBlitz WebContainers

**Exemplo de código interativo:**

```jsx
import { Sandpack } from "@codesandbox/sandpack-react";

<Sandpack
  template="vanilla"
  files={{
    "/index.js": `function square(x) {
  return x * x;
}

console.log(square(5)); // 25`
  }}
  theme="dark"
  options={{
    showNavigator: false,
    showLineNumbers: true,
  }}
/>
```

**Custo:** Gratuito
**Dificuldade:** Média
**Tempo estimado:** 2-3 dias para configuração inicial

---

### Opção 2: VitePress + Codapi

**Vantagens:**

- ✅ Extremamente rápido (built on Vite)
- ✅ Sintaxe Vue-based, mais simples que React
- ✅ Usado pela documentação do Vue.js
- ✅ Codapi é leve e suporta múltiplas linguagens
- ✅ Fácil configuração de código interativo

**Implementação:**

```md
# Exemplo de código interativo com Codapi

\`\`\`javascript
function square(x) {
  return x * x;
}

console.log(square(5));
\`\`\`

<codapi-snippet sandbox="javascript" editor="basic"></codapi-snippet>
```

**Custo:** Gratuito
**Dificuldade:** Baixa-Média
**Tempo estimado:** 1-2 dias

---

### Opção 3: MkDocs + PyScript/Brython

**Vantagens:**

- ✅ Configuração muito simples (Python-based)
- ✅ Material Theme é extremamente bonito
- ✅ Ótima para documentação técnica
- ✅ Suporte a temas customizados

**Desvantagens:**

- ⚠️ Precisa de integração manual para IDE JavaScript
- ⚠️ Menos moderno que as outras opções

**Custo:** Gratuito
**Dificuldade:** Baixa
**Tempo estimado:** 1-2 dias

---

### Opção 4: Integração com Source Academy (Mais Simples)

**Vantagens:**

- ✅ Usa a mesma infraestrutura do site original
- ✅ Apenas link para o playground deles
- ✅ Sem necessidade de manter infraestrutura própria
- ✅ Implementação imediata

**Implementação:**
Adicionar botões "Executar no Source Academy" em cada exemplo de código:

```markdown
\`\`\`javascript
function square(x) {
  return x * x;
}
\`\`\`

[▶️ Executar este código no Source Academy](https://sourceacademy.org/playground#code=...)
```

**Custo:** Gratuito
**Dificuldade:** Muito Baixa
**Tempo estimado:** Algumas horas

**Desvantagens:**

- ⚠️ Depende de serviço externo
- ⚠️ Interface não está em português
- ⚠️ Leitores precisam sair do site

---

## Comparação de Soluções

| Solução | Custo | Dificuldade | Manutenção | IDE Integrado | Performance | Recomendação |
|---------|-------|-------------|------------|---------------|-------------|--------------|
| **Docusaurus + Sandpack** | Gratuito | Média | Média | ✅ Sim | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **VitePress + Codapi** | Gratuito | Baixa-Média | Baixa | ✅ Sim | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **MkDocs + Custom** | Gratuito | Baixa | Baixa | ⚠️ Manual | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Source Academy Links** | Gratuito | Muito Baixa | Muito Baixa | ❌ Externo | ⭐⭐⭐⭐⭐ | ⭐⭐ |

---

## Recomendação Final

### 🎯 Solução Recomendada: Docusaurus + Sandpack

**Por quê?**

1. **Ecossistema robusto:** Usado por grandes projetos open-source
2. **IDE embutido:** Sandpack oferece experiência similar ao Source Academy
3. **Internacionalização:** Suporte nativo para múltiplos idiomas
4. **Busca avançada:** Algolia DocSearch gratuito para projetos open-source
5. **Community:** Grande comunidade e muitos exemplos
6. **Deploy:** GitHub Pages automático

### 🚀 Plano de Implementação (Fase 1 - MVP)

#### Semana 1: Configuração Básica

- [ ] Instalar e configurar Docusaurus
- [ ] Migrar estrutura de capítulos 00/ e 01/
- [ ] Configurar tema e branding em português
- [ ] Setup de GitHub Actions para deploy automático

#### Semana 2: IDE Interativo

- [ ] Integrar Sandpack (CodeSandbox)
- [ ] Criar componente customizado para exemplos de código
- [ ] Adicionar botão "Executar código" em todos exemplos
- [ ] Testar em diferentes navegadores

#### Semana 3: Features Extras

- [ ] Adicionar busca (Algolia)
- [ ] Criar página de progresso da tradução
- [ ] Adicionar navegação entre capítulos
- [ ] Otimizar para mobile

#### Semana 4: Lançamento

- [ ] Testes finais
- [ ] Documentação de contribuição atualizada
- [ ] Deploy em GitHub Pages
- [ ] Anúncio para comunidade

---

## Estrutura do Projeto (Após Implementação)

```text
estrutura-e-interpretacao-de-programas-de-computador-javascript/
├── docs/                          # Conteúdo em Markdown
│   ├── 00-prefacios/
│   │   ├── foreword84.md
│   │   ├── prefaces03.md
│   │   └── prefaces96.md
│   ├── 01-construindo-abstracoes/
│   │   ├── 1.0-introducao.md
│   │   ├── 1.1-elementos.md
│   │   └── ...
│   └── intro.md
├── src/
│   ├── components/
│   │   ├── CodePlayground.js    # Componente de IDE interativo
│   │   ├── ChapterNav.js
│   │   └── TranslationProgress.js
│   └── css/
│       └── custom.css
├── static/
│   └── img/
├── docusaurus.config.js          # Configuração principal
├── sidebars.js                   # Estrutura de navegação
├── package.json
└── README.md
```

---

## Exemplos de Sites Similares com Docusaurus

1. **React Docs:** https://react.dev/
2. **Redux Toolkit:** https://redux-toolkit.js.org/
3. **Jest:** https://jestjs.io/pt-BR/
4. **Docusaurus (self-hosted):** https://docusaurus.io/

---

## Recursos e Referências

### Docusaurus

- Documentação: https://docusaurus.io/
- Tutorial: https://docusaurus.io/docs/tutorial/create-a-doc

### Sandpack (CodeSandbox)

- Documentação: https://sandpack.codesandbox.io/
- Exemplos: https://sandpack.codesandbox.io/docs/getting-started/usage

### Codapi (Alternativa)

- Site: https://codapi.org/
- Integração: https://codapi.org/embed/

### Deploy

- GitHub Pages: https://docusaurus.io/docs/deployment#deploying-to-github-pages
- Netlify: https://docusaurus.io/docs/deployment#deploying-to-netlify
- Vercel: https://docusaurus.io/docs/deployment#deploying-to-vercel

---

## Alternativa Rápida (Implementação Imediata)

Se você quer algo **agora mesmo** sem esperar pela implementação completa do Docusaurus:

### Solução Temporária: GitHub Pages + Docsify

**Vantagens:**

- ✅ Zero build, apenas arquivos estáticos
- ✅ Não precisa npm/node para rodar
- ✅ Funciona direto com Markdown existente
- ✅ Setup em 10 minutos

**Implementação:**

1. Criar `index.html` na raiz:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>SICP.js - Português</title>
  <meta name="description" content="Estrutura e Interpretação de Programas de Computador">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
</head>
<body>
  <div id="app"></div>
  <script>
    window.$docsify = {
      name: 'SICP.js em Português',
      repo: 'ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript',
      loadSidebar: true,
      auto2top: true,
      search: 'auto',
      plugins: [
        function(hook, vm) {
          hook.doneEach(function() {
            // Adicionar botão "Executar" em blocos de código
          });
        }
      ]
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
</body>
</html>
```

1. Ativar GitHub Pages nas configurações do repositório
2. Pronto! Site rodando em `https://ibrahimcesar.github.io/estrutura-e-interpretacao-de-programas-de-computador-javascript/`

---

## Próximos Passos

1. **Decisão:** Escolher qual solução implementar
2. **Planning:** Criar issues no GitHub para cada tarefa
3. **Implementação:** Começar com MVP básico
4. **Iteração:** Adicionar features progressivamente

## Perguntas para Discussão

1. Qual o timeline desejado? (urgente, médio prazo, longo prazo)
2. Há preferência por React (Docusaurus) vs Vue (VitePress)?
3. Quantas pessoas vão contribuir com o desenvolvimento do site?
4. Já existe domínio customizado ou vamos usar GitHub Pages?
5. Precisa de analytics/tracking de uso?

---

**Autor:** Claude AI
**Data:** 2025-11-17
**Status:** Proposta para discussão
