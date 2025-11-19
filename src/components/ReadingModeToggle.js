import React, { useEffect, useState } from 'react';

/**
 * ReadingModeToggle Component
 * Compact button in navbar (before language selector) to toggle focused reading mode
 * Hides sidebars for distraction-free reading
 */
export default function ReadingModeToggle() {
  const [isReadingMode, setIsReadingMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved preference
    const savedMode = localStorage.getItem('readingMode') === 'true';
    setIsReadingMode(savedMode);
    if (savedMode) {
      document.body.classList.add('reading-mode');
    }
  }, []);

  const toggleReadingMode = () => {
    const newMode = !isReadingMode;
    setIsReadingMode(newMode);

    if (newMode) {
      document.body.classList.add('reading-mode');
      localStorage.setItem('readingMode', 'true');
    } else {
      document.body.classList.remove('reading-mode');
      localStorage.setItem('readingMode', 'false');
    }
  };

  return (
    <button
      onClick={toggleReadingMode}
      className="reading-mode-toggle"
      aria-label={isReadingMode ? 'Desativar modo de leitura focado' : 'Ativar modo de leitura focado'}
      title={isReadingMode ? 'Desativar modo de leitura focado' : 'Ativar modo de leitura focado'}
    >
      {isReadingMode ? (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span className="reading-mode-text">Modo Normal</span>
        </>
      ) : (
        <>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
          <span className="reading-mode-text">Modo Leitura</span>
        </>
      )}
    </button>
  );
}
