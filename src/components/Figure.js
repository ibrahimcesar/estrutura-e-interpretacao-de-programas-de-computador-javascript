import React from 'react';

/**
 * Componente para exibir figuras/imagens com caption
 */
export default function Figure({ src, alt, caption }) {
  return (
    <figure style={{ margin: '2rem 0', textAlign: 'center' }}>
      <img
        src={src}
        alt={alt}
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
