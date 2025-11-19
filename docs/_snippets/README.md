# 📋 Snippets Reutilizáveis

Este diretório contém snippets de Markdown que podem ser incluídos em múltiplas páginas da tradução.

## 🎯 Uso

### No Docusaurus (MDX)

Para incluir um snippet em uma página MDX:

```mdx
import HelpFooter from '@site/src/components/HelpFooter';

# Seu Conteúdo Aqui

... conteúdo da página ...

<HelpFooter />
```

### Markdown Puro

Se estiver usando Markdown puro (sem MDX), copie e cole o conteúdo do snippet diretamente na página.

## 📁 Snippets Disponíveis

### `HelpFooter` (Componente React)

**Localização**: `src/components/HelpFooter.js`

Footer padrão para páginas de tradução que orienta usuários sobre como:
- Reportar erros
- Fazer perguntas
- Sugerir melhorias
- Discutir traduções

**Quando usar**: No final de cada página/seção traduzida

**Como usar**: Importe o componente no topo do arquivo MDX:
```javascript
import HelpFooter from '@site/src/components/HelpFooter';
```

**Benefícios**:
- Facilita feedback dos leitores
- Direciona para templates corretos (Issues vs Discussions)
- Engaja a comunidade
- Melhora a qualidade da tradução

**Status**: ✅ Implementado em todos os 74 arquivos `.mdx` dos capítulos

## ✨ Criando Novos Snippets

Para criar um novo snippet reutilizável:

1. Crie arquivo `.md` neste diretório
2. Use Markdown padrão (compatível com MDX)
3. Mantenha genérico e reutilizável
4. Documente neste README

### Exemplo

```markdown
<!-- docs/_snippets/translation-note.md -->

:::info Nota de Tradução
Esta seção foi traduzida por [Nome]. Se você encontrar problemas,
por favor [reporte aqui](link).
:::
```

## 🎨 Boas Práticas

1. **Seja consistente** - Use o mesmo estilo em todos os snippets
2. **Mantenha simples** - Snippets devem ser focados
3. **Use links relativos** - Quando possível, use caminhos relativos
4. **Teste antes de usar** - Verifique que o snippet renderiza corretamente
5. **Documente** - Explique o propósito e uso neste README

## 📚 Referências

- [Docusaurus MDX Support](https://docusaurus.io/docs/markdown-features)
- [MDX Documentation](https://mdxjs.com/)

---

**Dica**: Snippets são uma ótima maneira de manter consistência e facilitar atualizações em massa!
