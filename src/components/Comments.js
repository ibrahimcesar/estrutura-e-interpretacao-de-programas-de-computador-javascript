import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { track } from '@site/src/lib/analytics';
import styles from './Comments.module.css';

const GISCUS = {
  repo: 'ibrahimcesar/estrutura-e-interpretacao-de-programas-de-computador-javascript',
  repoId: 'MDEwOlJlcG9zaXRvcnkzODk0MjEyMzg=',
  category: 'Geral',
  categoryId: 'DIC_kwDOFzYYts4B-coj',
};

/**
 * Comentários por página via giscus (GitHub Discussions — sem backend).
 * Carrega sob demanda: o iframe (e a chamada de rede) só nasce quando o
 * leitor abre a seção, o que também evita qualquer custo nas páginas.
 * Cada página mapeia para uma Discussion pelo pathname.
 */
export default function Comments() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (!open || !containerRef.current || containerRef.current.hasChildNodes()) return;
    track('comments_open');
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    Object.entries({
      'data-repo': GISCUS.repo,
      'data-repo-id': GISCUS.repoId,
      'data-category': GISCUS.category,
      'data-category-id': GISCUS.categoryId,
      'data-mapping': 'pathname',
      'data-strict': '0',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'bottom',
      'data-theme': colorMode === 'dark' ? 'dark' : 'light',
      'data-lang': 'pt',
    }).forEach(([k, v]) => script.setAttribute(k, v));
    containerRef.current.appendChild(script);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // acompanha a troca de tema sem recarregar o iframe
  useEffect(() => {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (iframe) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: colorMode === 'dark' ? 'dark' : 'light' } } },
        'https://giscus.app'
      );
    }
  }, [colorMode]);

  return (
    <section className={styles.comments}>
      {open ? (
        <div ref={containerRef} />
      ) : (
        <button type="button" className={styles.openButton} onClick={() => setOpen(true)}>
          💬 Comentários desta página
        </button>
      )}
    </section>
  );
}
