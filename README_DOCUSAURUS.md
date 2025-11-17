# 🚀 SICP.js em Português - Site Docusaurus

Este projeto agora usa **Docusaurus** para criar um site interativo e profissional para a tradução do SICP.js!

## ✨ Novidades

- 🎮 **IDE Interativo**: Execute código JavaScript diretamente no navegador
- 🎨 **Interface Moderna**: Design responsivo e profissional
- 🔍 **Busca Integrada**: Encontre rapidamente o que procura
- 🌙 **Modo Escuro**: Leitura confortável a qualquer hora
- 📱 **Mobile-First**: Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance**: Carregamento ultra-rápido

## 🏃 Início Rápido

### Instalação

```bash
# Clone o repositório
git clone https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript.git
cd estrutura-e-interpretacao-de-programas-de-computador-javascript

# Instale as dependências
npm install
```

### Desenvolvimento Local

```bash
# Inicie o servidor de desenvolvimento
npm start
```

O site será aberto automaticamente em `http://localhost:3000`

### Build de Produção

```bash
# Crie o build otimizado
npm run build

# Teste o build localmente
npm run serve
```

## 📁 Estrutura do Projeto

```
.
├── docs/                      # Conteúdo Markdown
│   ├── intro.md              # Página inicial
│   ├── prefaces/             # Prefácios
│   ├── chapter-1/            # Capítulo 1
│   ├── guia-traducao.md      # Guia de tradução
│   └── como-contribuir.md    # Como contribuir
├── src/
│   ├── components/           # Componentes React
│   │   ├── CodePlayground.js # IDE interativo (Sandpack)
│   │   ├── ExerciseBox.js    # Caixa de exercícios
│   │   └── InlineCode.js     # Código inline executável
│   └── css/
│       └── custom.css        # Estilos customizados
├── static/
│   └── img/                  # Imagens estáticas
├── docusaurus.config.js      # Configuração do Docusaurus
├── sidebars.js               # Estrutura de navegação
├── babel.config.js
└── package.json
```

## 🎮 Usando o IDE Interativo

### No Markdown (MDX)

```mdx
import CodePlayground from '@site/src/components/CodePlayground';

<CodePlayground
  code={`
function square(x) {
  return x * x;
}

console.log(square(5));
`}
  title="Exemplo: Função Square"
  showLineNumbers={true}
  showConsole={true}
  autorun={false}
  height={300}
/>
```

### Componente de Exercício

```mdx
import ExerciseBox from '@site/src/components/ExerciseBox';
import CodePlayground from '@site/src/components/CodePlayground';

<ExerciseBox
  number="1.1"
  solution={
    <CodePlayground
      code={`
// Solução do exercício
function solution() {
  return 42;
}
`}
    />
  }
>
  Escreva uma função que retorna 42.
</ExerciseBox>
```

## 📝 Adicionando Novo Conteúdo

### 1. Criar Arquivo Markdown

Crie um arquivo `.md` ou `.mdx` em `docs/`:

```markdown
---
sidebar_position: 1
title: Título da Página
description: Descrição breve
---

# Título Principal

Seu conteúdo aqui...
```

### 2. Atualizar Sidebar

Edite `sidebars.js` para adicionar o novo documento:

```javascript
{
  type: 'doc',
  id: 'chapter-2/2.1',
  label: '2.1 Nova Seção',
}
```

### 3. Testar Localmente

```bash
npm start
```

## 🚀 Deploy

### GitHub Pages (Automático)

O deploy acontece automaticamente quando você faz push para a branch `main`:

1. Faça suas alterações
2. Commit e push
3. GitHub Actions constrói e faz deploy automaticamente
4. Site atualizado em minutos!

URL: `https://ibrahimcesar.github.io/estrutura-e-interpretacao-de-programas-de-computador-javascript/`

### Configurar GitHub Pages (Primeira Vez)

1. Vá em Settings → Pages no GitHub
2. Source: "GitHub Actions"
3. Salve

## 🛠️ Comandos Disponíveis

```bash
npm start              # Inicia servidor de desenvolvimento
npm run build          # Build de produção
npm run serve          # Serve o build localmente
npm run clear          # Limpa cache do Docusaurus
npm run swizzle        # Customiza componentes do tema
npm run deploy         # Deploy manual (não necessário com GitHub Actions)
```

## 🎨 Customização

### Tema e Cores

Edite `src/css/custom.css`:

```css
:root {
  --ifm-color-primary: #0066cc;
  --ifm-color-primary-dark: #005bb8;
  /* ... */
}
```

### Configurações do Site

Edite `docusaurus.config.js`:

```javascript
const config = {
  title: 'Seu Título',
  tagline: 'Seu Tagline',
  url: 'https://seu-dominio.com',
  // ...
};
```

### Logo e Favicon

Adicione arquivos em `static/img/`:

```
static/
└── img/
    ├── logo.svg          # Logo do navbar
    └── favicon.ico       # Favicon
```

## 📚 Recursos

- [Documentação Docusaurus](https://docusaurus.io/docs)
- [Sandpack Docs](https://sandpack.codesandbox.io/docs)
- [MDX](https://mdxjs.com/)
- [React](https://react.dev/)

## 🤝 Contribuindo

Veja [Como Contribuir](docs/como-contribuir.md) e [Guia de Tradução](docs/guia-traducao.md).

## 📄 Licença

Conteúdo licenciado sob CC BY-SA 4.0.

## 🙏 Agradecimentos

- **Docusaurus Team**: Framework incrível
- **CodeSandbox**: Sandpack para IDE interativo
- **Source Academy**: Inspiração do design original
- **Comunidade**: Todos os tradutores e contribuidores

---

**Dúvidas?** Abra uma [issue](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/issues) ou [discussion](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript/discussions)!
