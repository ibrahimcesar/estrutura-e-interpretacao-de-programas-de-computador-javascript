# 📸 Percy Visual Regression Testing

Este documento explica como o Percy está configurado para detectar regressões visuais no SICP.js PT-BR.

## 🎯 O que é Percy?

[Percy](https://percy.io) é uma plataforma de visual regression testing que:

- 📸 Captura screenshots de páginas
- 🔍 Detecta diferenças visuais entre builds
- ✅ Permite revisar e aprovar mudanças
- 🚫 Previne bugs visuais acidentais

## 🚀 Como Funciona

### Workflow Automático

O Percy roda automaticamente em:
- ✅ Todos os Pull Requests para `main`
- ✅ Pushes para `main` (baseline)

### Processo

1. **Build** - Site é construído com `npm run build`
2. **Serve** - Site é servido localmente
3. **Capture** - Screenshots são capturados
4. **Upload** - Imagens enviadas para Percy
5. **Compare** - Percy compara com baseline
6. **Review** - Diferenças são revisadas

## 📋 Páginas Testadas

O Percy captura screenshots de:

### Páginas Principais
- Home page (/, 4 viewports)
- Home page - Dark mode (1280px)

### Prefácios
- Foreword 1984
- Foreword 1996
- Preface 1984
- Preface 1996
- Preface JavaScript
- Acknowledgments

### Capítulos
- Chapter 1 - Introduction
- Chapter 1 - Section 1.1
- *(Mais seções serão adicionadas conforme tradução avança)*

## 🖥️ Viewports Testados

```yaml
Mobile:  375px
Tablet:  768px
Desktop: 1280px
Large:   1920px
```

## ⚙️ Configuração

### Arquivo Principal: `.percy.yml`

```yaml
version: 2
static:
  build-dir: build/pt_BR
  base-url: /pt_BR/

snapshot:
  widths: [375, 768, 1280, 1920]
  min-height: 1024
  enable-javascript: true
```

### Script Customizado: `.github/percy/percy-script.js`

Script Node.js que usa Puppeteer para:
- Navegar páginas específicas
- Executar ações (ex: trocar tema)
- Capturar screenshots com Percy

## 🔧 Setup

### 1. Criar Conta Percy

1. Acesse [percy.io](https://percy.io)
2. Crie uma conta (gratuita para projetos open source)
3. Crie um novo projeto: `sicp-js-pt-br`

### 2. Configurar Token

1. Obtenha o `PERCY_TOKEN` no dashboard
2. Adicione como secret no GitHub:
   - Settings → Secrets → Actions
   - Nome: `PERCY_TOKEN`
   - Valor: seu token do Percy

### 3. Primeiro Build

```bash
# Instalar Percy CLI
npm install --save-dev @percy/cli @percy/puppeteer

# Build do site
npm run build

# Servir localmente
npm run serve &

# Capturar screenshots
npx percy exec -- npx @percy/cli snapshot ./build

# Ou usar script customizado
npx percy exec -- node .github/percy/percy-script.js
```

## 🎨 Elementos Escondidos

Para screenshots consistentes, alguns elementos são escondidos:

```css
/* Elementos dinâmicos */
.navbar__item--github-stars { display: none !important; }
.announcement-bar { display: none !important; }

/* Desabilitar animações */
* {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}
```

## 📊 Revisando Mudanças

### No Percy Dashboard

1. Acesse [percy.io/ibrahimcesar/sicp-js-pt-br](https://percy.io/ibrahimcesar/sicp-js-pt-br)
2. Clique no build do seu PR
3. Revise cada screenshot:
   - **Verde (✓)**: Sem mudanças
   - **Amarelo (!)**: Mudanças detectadas
   - **Vermelho (✗)**: Falha na captura

### Aprovando Mudanças

Se as mudanças são intencionais:
1. Clique em cada screenshot alterado
2. Revise a diferença visual
3. Clique em **Approve**

Se as mudanças são acidentais:
1. Volte ao código
2. Corrija o problema
3. Push novamente

## 🐛 Troubleshooting

### Percy não está rodando

**Problema**: Workflow falha com erro de token

**Solução**:
```bash
# Verificar se PERCY_TOKEN está configurado
# GitHub → Settings → Secrets → Actions
```

### Screenshots diferentes toda vez

**Problema**: Elementos dinâmicos causando falsos positivos

**Solução**: Adicionar ao `percy-css` em `.percy.yml`:
```css
.elemento-dinamico { display: none !important; }
```

### Timeout ao capturar screenshots

**Problema**: Página demora para carregar

**Solução**: Aumentar timeout em `percy-script.js`:
```javascript
await page.goto(url, {
  waitUntil: 'networkidle2',
  timeout: 60000 // Aumentar timeout
});
```

### Fontes renderizando diferente

**Problema**: Fontes web não carregam a tempo

**Solução**: Aguardar fontes carregarem:
```javascript
await page.evaluateHandle('document.fonts.ready');
```

## 📈 Melhores Práticas

### ✅ Faça

- Revise todos os screenshots antes de aprovar
- Capture páginas representativas de cada seção
- Use viewports relevantes (mobile + desktop)
- Esconda elementos dinâmicos (timestamps, contadores)
- Desabilite animações para consistência

### ❌ Evite

- Aprovar mudanças sem revisar
- Capturar muitas páginas similares
- Incluir conteúdo que muda frequentemente
- Deixar animações habilitadas

## 🔄 Atualizando Baseline

Após aprovar mudanças no Percy Dashboard, o próximo build usará as novas imagens como baseline.

## 📚 Recursos

- [Percy Documentation](https://docs.percy.io/)
- [Percy for Puppeteer](https://docs.percy.io/docs/puppeteer)
- [Percy CLI](https://docs.percy.io/docs/cli)
- [Visual Testing Best Practices](https://docs.percy.io/docs/best-practices)

## 🆘 Suporte

Problemas com Percy?

1. Veja [Percy Status](https://status.percy.io/)
2. Consulte [Percy Docs](https://docs.percy.io/)
3. Abra uma issue no repositório
4. Contate suporte Percy (para conta)

---

**Nota**: Percy é gratuito para projetos open source. Solicite acesso ao [Open Source Plan](https://www.browserstack.com/open-source) se necessário.
