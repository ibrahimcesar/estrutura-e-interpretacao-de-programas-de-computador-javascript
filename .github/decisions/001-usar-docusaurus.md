# ADR-001: Usar Docusaurus para o Site de Documentação

**Status:** Aceito

**Data:** 2024-11-17

**Responsáveis:** @ibrahimcesar

## Contexto

O projeto SICP.js PT-BR precisa de uma plataforma para publicar a tradução do livro de forma acessível, navegável e com boa experiência de leitura. A plataforma deve:

- Suportar Markdown para facilitar contribuições
- Ter boa renderização de código JavaScript
- Ser fácil de manter e atualizar
- Suportar navegação entre capítulos
- Ser otimizada para leitura técnica
- Permitir deploy gratuito (GitHub Pages)
- Ter suporte a internacionalização (i18n)

## Decisão

Utilizaremos **Docusaurus v3** como framework para o site do projeto.

Docusaurus é um gerador de sites estáticos otimizado para documentação técnica, desenvolvido e mantido pelo Facebook/Meta.

### Configuração escolhida:

- Versão: Docusaurus 3.5.2
- Preset: Classic
- Plugins adicionais:
  - `remark-math` e `rehype-katex` para fórmulas matemáticas
  - Sandpack para exemplos interativos de código
- Deploy: GitHub Pages com GitHub Actions

## Consequências

### Positivas

- **Excelente DX (Developer Experience)**: Hot reload, TypeScript support, fácil de configurar
- **Markdown-first**: Facilita contribuições de tradutores que conhecem Markdown
- **Suporte a código**: Syntax highlighting excelente para JavaScript via Prism
- **Navegação automática**: Sidebar gerada automaticamente a partir da estrutura de arquivos
- **SEO otimizado**: Meta tags, sitemap, robots.txt automáticos
- **Responsivo**: Mobile-friendly out of the box
- **Dark mode**: Suporte nativo a tema claro/escuro
- **Search**: Integração fácil com Algolia DocSearch
- **I18n nativo**: Preparado para múltiplos idiomas (útil se surgirem outras traduções)
- **Comunidade ativa**: Bem documentado e mantido
- **Performance**: Build otimizado, code splitting automático

### Negativas

- **Node.js obrigatório**: Contribuidores precisam ter Node.js instalado (≥18.0)
- **Build step necessário**: Não é simples Markdown estático
- **Bundle size**: Pode ser grande para sites muito simples (não é o caso)
- **Curva de aprendizado**: Para customizações avançadas, precisa conhecer React

### Neutras

- **Framework opinado**: Menos flexibilidade, mas mais consistência
- **Dependência do npm**: ~200MB de node_modules (aceitável para o propósito)

## Alternativas Consideradas

### Alternativa 1: Jekyll

**Descrição:** Gerador de sites estáticos em Ruby, integração nativa com GitHub Pages

**Por que foi rejeitada:**
- Menos adequado para documentação técnica moderna
- Syntax highlighting inferior para JavaScript
- Menos features modernas (dark mode, search)
- Comunidade menor para docs técnicas
- Necessita Ruby (menos comum entre desenvolvedores JS)

### Alternativa 2: GitBook

**Descrição:** Plataforma especializada em documentação de livros

**Por que foi rejeitada:**
- Planos pagos para features importantes
- Menos controle sobre customização
- Lock-in de plataforma
- Dificuldade de self-hosting
- Git workflow menos flexível

### Alternativa 3: VuePress / VitePress

**Descrição:** Gerador de sites estáticos baseado em Vue.js

**Por que foi rejeitada:**
- Menor ecossistema de plugins para docs técnicas
- Menos features prontas para documentação de livros
- Comunidade menor que Docusaurus
- VitePress ainda estava em beta na época da decisão

### Alternativa 4: MkDocs (Material theme)

**Descrição:** Gerador de sites estáticos em Python focado em documentação

**Por que foi rejeitada:**
- Menos adequado para conteúdo extenso tipo livro
- Necessita Python (menos comum em projetos JS)
- Menos features interativas (code sandboxes)
- Navegação menos rica

## Referências

- [Docusaurus Documentation](https://docusaurus.io/)
- [Docusaurus GitHub](https://github.com/facebook/docusaurus)
- [SICP.js Original](https://sourceacademy.org/sicpjs/) - usa framework customizado
- [Discussão inicial do projeto](https://github.com/ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript)

## Notas de Implementação

### Estrutura de Diretórios

```
docs/           # Conteúdo Markdown do livro
src/            # Componentes React customizados
static/         # Assets estáticos (imagens, favicons)
docusaurus.config.js  # Configuração principal
sidebars.js     # Estrutura de navegação
```

### Customizações Implementadas

- Tema de cores baseado em JavaScript (#f7df1e)
- KaTeX para fórmulas matemáticas
- Sandpack para código interativo
- CSS customizado em `src/css/custom.css`
- Favicon personalizado com logo JS

### Migração Futura

Se necessário migrar para outra plataforma:
- Todo conteúdo está em Markdown padrão
- Frontmatter minimal (facilita conversão)
- Assets organizados em `static/`
- Sem vendor lock-in significativo

---

**Histórico de Revisões:**

| Data | Responsável | Mudança |
|------|-------------|---------|
| 2024-11-17 | @ibrahimcesar | Criação inicial do ADR |
