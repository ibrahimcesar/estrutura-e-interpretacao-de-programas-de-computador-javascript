#!/usr/bin/env python3
import re

# Fix 1.3.md
with open('docs/chapter-1/1.3.md', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('<br>', '<br />')
with open('docs/chapter-1/1.3.md', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix 1.1.4.md
with open('docs/chapter-1/1.1.4.md', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('  function *nome*(*parâmetros*) { return *expressão*; }',
                          '```\nfunction nome(parâmetros) { return expressão; }\n```')
with open('docs/chapter-1/1.1.4.md', 'w', encoding='utf-8') as f:
    f.write(content)

# Fix 1.3.4.md
with open('docs/chapter-1/1.3.4.md', 'r', encoding='utf-8') as f:
    content = f.read()
# Fix mapsto syntax
content = re.sub(r'\\mapsto\{([^}]*)\}', r'\\mapsto \1', content)
# Fix unclosed sup tag
content = content.replace('são:<sup>[6](#footnote-link-6)', 'são:<sup>[6](#footnote-link-6)</sup>')
with open('docs/chapter-1/1.3.4.md', 'w', encoding='utf-8') as f:
    f.write(content)

print("All files fixed!")
