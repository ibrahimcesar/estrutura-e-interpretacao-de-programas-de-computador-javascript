import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

/**
 * Toggle para Modo de Leitura (Distraction-Free)
 *
 * Botão que esconde/mostra a sidebar para uma leitura sem distrações.
 * O estado é persistido no localStorage.
 */
export default function ReadModeToggle() {
  const [isReadMode, setIsReadMode] = useState(false);

  // Carregar estado do localStorage ao montar
  useEffect(() => {
    const savedMode = localStorage.getItem('readMode') === 'true';
    setIsReadMode(savedMode);
    if (savedMode) {
      document.documentElement.setAttribute('data-read-mode', 'true');
    }
  }, []);

  const toggleReadMode = () => {
    const newMode = !isReadMode;
    setIsReadMode(newMode);
    localStorage.setItem('readMode', newMode.toString());

    if (newMode) {
      document.documentElement.setAttribute('data-read-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-read-mode');
    }
  };

  return (
    <button
      className={styles.readModeButton}
      onClick={toggleReadMode}
      title={isReadMode ? 'Sair do modo leitura' : 'Modo leitura sem distrações'}
      aria-label={isReadMode ? 'Sair do modo leitura' : 'Ativar modo leitura'}
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {isReadMode ? (
          // Ícone de olho (modo normal)
          <>
            <path d="M10 3C5 3 1.73 7.11 1 10c.73 2.89 4 7 9 7s8.27-4.11 9-7c-.73-2.89-4-7-9-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
            <circle cx="10" cy="10" r="3" />
          </>
        ) : (
          // Ícone de livro/leitura (modo leitura)
          <>
            <path d="M10 2c-1.82 0-3.53.5-5 1.35C3.53 2.5 1.82 2 0 2v14c1.82 0 3.53.5 5 1.35 1.47-.85 3.18-1.35 5-1.35s3.53.5 5 1.35c1.47-.85 3.18-1.35 5-1.35V2c-1.82 0-3.53.5-5 1.35C13.53 2.5 11.82 2 10 2zm0 12.5c-1.2 0-2.27-.24-3.2-.64V4.14c.93-.4 2-.64 3.2-.64s2.27.24 3.2.64v9.72c-.93.4-2 .64-3.2.64z" />
          </>
        )}
      </svg>
      <span className={styles.buttonText}>
        {isReadMode ? 'Mostrar Barra' : 'Modo Leitura'}
      </span>
    </button>
  );
}
