import React, { useState, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

/**
 * Lazy-loaded wrapper for CodePlayground
 * Reduces initial bundle size by loading Sandpack only when needed
 * Uses BrowserOnly to ensure client-side rendering
 */
export default function CodePlaygroundLazy(props) {
  return (
    <BrowserOnly fallback={<LoadingPlaceholder {...props} />}>
      {() => {
        const CodePlayground = require('./CodePlayground').default;
        return <CodePlayground {...props} />;
      }}
    </BrowserOnly>
  );
}

function LoadingPlaceholder({ title }) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      {title && (
        <div
          style={{
            padding: '0.5rem 1rem',
            background: 'var(--ifm-color-primary)',
            color: 'black',
            fontWeight: 'bold',
            borderRadius: '8px 8px 0 0',
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          padding: '3rem 2rem',
          background: 'var(--ifm-color-emphasis-100)',
          borderRadius: title ? '0 0 8px 8px' : '8px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid var(--ifm-color-primary-lightest)',
            borderTop: '4px solid var(--ifm-color-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <p style={{ marginTop: '1rem', color: 'var(--ifm-font-color-base)' }}>
          Carregando playground de código...
        </p>
      </div>
    </div>
  );
}
