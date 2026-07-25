import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * Componente para exibir figuras/imagens com caption.
 *
 * `src` é um caminho raiz-relativo (ex.: "/img/chapter-4/fig.svg"). Ao
 * contrário de imagens em Markdown (`![]()`), que passam pelo pipeline de
 * assets do Docusaurus e já saem com o baseUrl resolvido, uma <img> "crua"
 * como esta NÃO é reescrita automaticamente — sem useBaseUrl, o caminho
 * resolve contra a raiz do domínio e ignora o baseUrl (/pt_BR/), quebrando
 * a imagem em produção.
 */
export default function Figure({ src, alt, caption }) {
  const resolvedSrc = useBaseUrl(src);
  return (
    <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
      <img
        src={resolvedSrc}
        alt={alt || caption || ''}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {caption && (
        <figcaption style={{
          marginTop: '0.5rem',
          fontSize: '0.9rem',
          fontStyle: 'italic',
          color: 'var(--ifm-color-emphasis-600)'
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
