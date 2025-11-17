# 📖 Exemplos de Uso - Componentes Interativos

Este documento mostra como usar os componentes interativos do site SICP.js PT-BR.

## 📝 Índice

- [CodePlayground](#codeplayground) - IDE interativo
- [ExerciseBox](#exercisebox) - Caixa de exercícios
- [InlineCode](#inlinecode) - Código inline executável
- [Markdown Features](#markdown-features) - Recursos do MDX

---

## 🎮 CodePlayground

Componente principal para executar código JavaScript no navegador.

### Uso Básico

```mdx
import CodePlayground from '@site/src/components/CodePlayground';

<CodePlayground
  code={`
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
`}
/>
```

### Com Título

```mdx
<CodePlayground
  title="Exemplo: Sequência de Fibonacci"
  code={`
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`}
/>
```

### Autorun (execução automática)

```mdx
<CodePlayground
  code={`console.log("Este código executa automaticamente!");`}
  autorun={true}
/>
```

### Altura Customizada

```mdx
<CodePlayground
  code={`
// Código longo precisa de mais espaço
function longFunction() {
  // ...muitas linhas...
}
`}
  height={500}
/>
```

### Sem Console

```mdx
<CodePlayground
  code={`
function pureCalculation(x) {
  return x * 2;
}
`}
  showConsole={false}
/>
```

### Todas as Opções

```mdx
<CodePlayground
  code={`/* seu código */`}
  title="Título do Exemplo"
  showLineNumbers={true}    // Mostrar números de linha (padrão: true)
  showConsole={true}         // Mostrar console (padrão: true)
  autorun={false}            // Auto-executar (padrão: false)
  height={300}               // Altura em pixels (padrão: 300)
/>
```

---

## 📚 ExerciseBox

Componente para exibir exercícios com soluções retráteis.

### Exercício Simples

```mdx
import ExerciseBox from '@site/src/components/ExerciseBox';

<ExerciseBox number="1.1">
  Qual é o resultado da seguinte expressão?

  ```javascript
  10 + 5 * 2
  ```
</ExerciseBox>
```

### Exercício com Solução

```mdx
import ExerciseBox from '@site/src/components/ExerciseBox';
import CodePlayground from '@site/src/components/CodePlayground';

<ExerciseBox
  number="1.5"
  solution={
    <div>
      <p>A resposta é 42 porque...</p>
      <CodePlayground
        code={`
function answer() {
  return 42;
}

console.log(answer());
`}
      />
    </div>
  }
>
  Escreva uma função que retorna a resposta para a vida, o universo e tudo mais.
</ExerciseBox>
```

### Exercício com Markdown na Solução

```mdx
<ExerciseBox
  number="1.10"
  solution={
    <>
      <h4>Solução Detalhada</h4>
      <p>Primeiro, precisamos entender que...</p>
      <ul>
        <li>Ponto 1</li>
        <li>Ponto 2</li>
      </ul>
      <CodePlayground code={`console.log("Solução!");`} />
    </>
  }
>
  ## Questão Complexa

  Dado o seguinte código, o que acontece quando...

  ```javascript
  const x = [1, 2, 3];
  ```
</ExerciseBox>
```

---

## ⚡ InlineCode

Versão simplificada do CodePlayground para snippets pequenos.

```mdx
import InlineCode from '@site/src/components/InlineCode';

<InlineCode>
{`console.log("Olá, mundo!");`}
</InlineCode>
```

---

## 📄 Markdown Features

### Admonitions (Avisos)

```markdown
:::note Nota
Isto é uma nota importante.
:::

:::tip Dica
Uma dica útil para o leitor!
:::

:::info Informação
Informação adicional.
:::

:::caution Atenção
Tenha cuidado com isso!
:::

:::danger Perigo
Isto pode causar problemas sérios!
:::
```

### Tabs

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="js" label="JavaScript" default>

    ```javascript
    console.log("JavaScript");
    ```

  </TabItem>
  <TabItem value="py" label="Python">

    ```python
    print("Python")
    ```

  </TabItem>
</Tabs>
```

### Code Blocks com Highlight

```javascript {1,4-6}
function example() {
  // Linha 1 está destacada
  const x = 10;
  // Linhas 4-6 estão destacadas
  return x * 2;
}
```

### Code Blocks com Título

```javascript title="meuarquivo.js"
console.log("Arquivo com título");
```

### Links Internos

```markdown
Veja [Capítulo 1](/chapter-1/intro) para mais detalhes.
Veja a [seção 1.1.5](/chapter-1/1.1.5#conceito-importante) para o conceito.
```

### Imagens

```markdown
![Alt text](/img/diagrama.png)
```

### Tabelas

```markdown
| Conceito | Descrição | Exemplo |
|----------|-----------|---------|
| Função | Abstração | `square` |
| Closure | Escopo | `make_counter` |
```

---

## 🎨 Combinações Avançadas

### Exemplo Completo: Seção de Ensino

```mdx
---
title: 1.1.5 O Modelo de Substituição
---

import CodePlayground from '@site/src/components/CodePlayground';
import ExerciseBox from '@site/src/components/ExerciseBox';

# 1.1.5 O Modelo de Substituição

O modelo de substituição é uma forma de entender como funções são avaliadas.

## Exemplo

<CodePlayground
  title="Modelo de Substituição em Ação"
  code={`
function square(x) {
  return x * x;
}

function sum_of_squares(a, b) {
  return square(a) + square(b);
}

console.log(sum_of_squares(3, 4)); // 25
`}
/>

:::tip Dica
Observe como cada chamada de função é substituída por seu corpo.
:::

## Exercício

<ExerciseBox
  number="1.5"
  solution={
    <CodePlayground
      code={`
function f(a) {
  return sum_of_squares(a + 1, a * 2);
}

console.log(f(5)); // 196
`}
    />
  }
>
  Use o modelo de substituição para determinar o resultado de `f(5)`.
</ExerciseBox>
```

### Código Interativo vs Estático

```mdx
**Código Estático (apenas visualização):**

```javascript
function exemplo() {
  return "Não executável";
}
```

**Código Interativo (executável):**

<CodePlayground
  code={`
function exemplo() {
  return "Executável!";
}

console.log(exemplo());
`}
/>
```

---

## 🎯 Melhores Práticas

### ✅ Faça

- Use `CodePlayground` para exemplos que o leitor deve experimentar
- Use `ExerciseBox` para todos os exercícios do livro
- Adicione títulos descritivos aos playgrounds
- Use `autorun={false}` para código que o leitor deve modificar
- Use `autorun={true}` para demonstrações simples

### ❌ Evite

- Blocos de código muito longos (divida em partes)
- Código sem contexto ou explicação
- Exercícios sem solução (sempre inclua)
- Altura muito pequena para código longo

---

## 🔧 Troubleshooting

### Playground não aparece

```mdx
<!-- ❌ Errado -->
`CodePlayground code="..."`

<!-- ✅ Correto -->
import CodePlayground from '@site/src/components/CodePlayground';

<CodePlayground code={`...`} />
```

### Código com aspas

```mdx
<!-- Use template literals para evitar problemas -->
<CodePlayground
  code={`
const str = "String com aspas duplas";
const str2 = 'String com aspas simples';
console.log(\`Template literal!\`);
`}
/>
```

### Importações no topo

```mdx
---
title: Minha Página
---

<!-- Sempre importe no topo, após o frontmatter -->
import CodePlayground from '@site/src/components/CodePlayground';
import ExerciseBox from '@site/src/components/ExerciseBox';

# Conteúdo começa aqui
```

---

## 📚 Recursos

- [Docusaurus MDX](https://docusaurus.io/docs/markdown-features)
- [Sandpack Docs](https://sandpack.codesandbox.io/docs)
- [MDX Spec](https://mdxjs.com/)

---

**Dúvidas?** Veja exemplos práticos nos arquivos em `docs/chapter-1/` ou abra uma issue!
