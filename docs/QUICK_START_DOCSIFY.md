# Guia Rápido: Docsify (Solução Temporária)

## Deploy Imediato em 5 Minutos

Esta é a solução **mais rápida** para ter um site funcionando com os arquivos Markdown existentes.

### Passo 1: Criar `index.html`

Crie um arquivo `index.html` na raiz do projeto:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>SICP.js - Estrutura e Interpretação de Programas de Computador</title>
  <meta name="description" content="Tradução em português do SICP JavaScript">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify@4/lib/themes/vue.css">
  <style>
    :root {
      --theme-color: #0066cc;
      --code-theme-background: #f6f8fa;
    }
  </style>
</head>
<body>
  <div id="app">Carregando...</div>
  <script>
    window.$docsify = {
      name: 'SICP.js em Português',
      repo: 'ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript',
      loadSidebar: true,
      loadNavbar: true,
      auto2top: true,
      maxLevel: 4,
      subMaxLevel: 3,

      // Busca
      search: {
        placeholder: 'Buscar...',
        noData: 'Nenhum resultado encontrado',
        paths: 'auto',
        depth: 6
      },

      // Paginação
      pagination: {
        previousText: 'Anterior',
        nextText: 'Próximo',
        crossChapter: true
      },

      // Plugins customizados
      plugins: [
        // Adicionar botão "Executar no Source Academy"
        function(hook, vm) {
          hook.doneEach(function() {
            const codeBlocks = document.querySelectorAll('pre[data-lang="javascript"]');
            codeBlocks.forEach(function(block) {
              if (!block.querySelector('.run-button')) {
                const code = block.querySelector('code').textContent;
                const encodedCode = encodeURIComponent(code);
                const button = document.createElement('button');
                button.className = 'run-button';
                button.innerHTML = '▶️ Executar no Source Academy';
                button.onclick = function() {
                  window.open(`https://sourceacademy.org/playground#chap=1&exec=${encodedCode}`, '_blank');
                };
                block.appendChild(button);
              }
            });
          });
        }
      ]
    }
  </script>

  <!-- Docsify core -->
  <script src="//cdn.jsdelivr.net/npm/docsify@4"></script>

  <!-- Plugins -->
  <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify-pagination/dist/docsify-pagination.min.js"></script>
  <script src="//cdn.jsdelivr.net/npm/docsify-copy-code@2"></script>
  <script src="//cdn.jsdelivr.net/npm/prismjs@1/components/prism-javascript.min.js"></script>
</body>
</html>
```

### Passo 2: Criar `_sidebar.md`

```markdown
<!-- _sidebar.md -->

* [Home](/)

* Prefácios
  * [Prefácio de 1984](00/foreword84.md)
  * [Prefácio de 1996](00/prefaces96.md)
  * [Prefácio de 2003](00/prefaces03.md)

* Capítulo 1: Construindo Abstrações com Funções
  * [Introdução](01/1.0.md)
  * [1.1 Os Elementos da Programação](01/1.1.md)
    * [1.1.1 Expressões](01/1.1.1.md)
    * [1.1.2 Nomeação e o Ambiente](01/1.1.2.md)
    * [1.1.3 Avaliando Combinações](01/1.1.3.md)
    * [1.1.4 Funções Compostas](01/1.1.4.md)
    * [1.1.5 O Modelo de Substituição](01/1.1.5.md)
    * [1.1.8 Funções como Abstrações](01/1.1.8.md)
  * [1.2 Funções e Processos](01/1.2.md)
  * [1.3 Abstrações de Ordem Superior](01/1.3.md)
    * [1.3.4 Funções como Valores de Retorno](01/1.3.4.md)
```

### Passo 3: Criar `_navbar.md` (opcional)

```markdown
<!-- _navbar.md -->

* [🏠 Home](/)
* [📖 Guia de Tradução](TRANSLATION.md)
* [🤝 Como Contribuir](CONTRIBUTING.md)
* [💻 GitHub](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript)
```

### Passo 4: Ativar GitHub Pages

1. Vá para Settings → Pages no repositório GitHub
2. Em "Source", selecione a branch `main` e pasta `/ (root)`
3. Clique em "Save"
4. Aguarde alguns minutos

Pronto! Seu site estará em:
```
https://ibrahimcesar.github.io/estrutura-e-interpretacao-de-programas-de-computador-javascript/
```

---

## Testar Localmente

Para testar localmente antes de fazer deploy:

```bash
# Opção 1: Python
python -m http.server 3000

# Opção 2: Node.js
npx serve .

# Opção 3: Docsify CLI
npm i docsify-cli -g
docsify serve .
```

Depois abra: http://localhost:3000

---

## Customizações Adicionais

### Adicionar CSS Customizado

Adicione no `<head>` do `index.html`:

```html
<style>
  /* Botão de executar código */
  .run-button {
    background: #0066cc;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 500;
  }

  .run-button:hover {
    background: #0052a3;
  }

  /* Estilo dos blocos de código */
  pre[data-lang] {
    position: relative;
  }

  /* Header customizado */
  .app-name-link {
    font-weight: 600;
  }
</style>
```

### Adicionar Google Analytics (opcional)

```html
<script>
  window.$docsify = {
    // ... outras configs ...

    ga: 'G-XXXXXXXXXX', // Seu ID do Google Analytics
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/ga.min.js"></script>
```

### Adicionar Tema Escuro

```html
<script src="//cdn.jsdelivr.net/npm/docsify-darklight-theme@latest/dist/index.min.js"></script>
```

---

## Limitações do Docsify

⚠️ **Esta é uma solução temporária.** O Docsify tem limitações:

1. ❌ Não executa código JavaScript nativamente (apenas links externos)
2. ❌ Performance não é tão boa quanto sites estáticos pré-renderizados
3. ❌ SEO limitado (conteúdo carregado via JavaScript)
4. ❌ Menos controle sobre componentes customizados

Para uma solução **profissional e permanente**, recomendamos migrar para **Docusaurus** conforme descrito no documento `INTERACTIVE_IDE_PROPOSAL.md`.

---

## Próximos Passos

Depois de ter o Docsify funcionando, você pode:

1. ✅ Compartilhar o link do site com a comunidade
2. ✅ Coletar feedback sobre usabilidade
3. ✅ Continuar traduzindo seções
4. 🔄 Planejar migração para Docusaurus (solução permanente)

---

## Exemplo de Pull Request

Quando estiver pronto, crie um PR com:

- `index.html`
- `_sidebar.md`
- `_navbar.md`
- `.nojekyll` (arquivo vazio para GitHub Pages não processar como Jekyll)

Título do PR: `feat: Adiciona site Docsify para visualização da tradução`

---

**Tempo estimado:** 10-15 minutos
**Dificuldade:** Muito Baixa ⭐
**Resultado:** Site funcional imediatamente
