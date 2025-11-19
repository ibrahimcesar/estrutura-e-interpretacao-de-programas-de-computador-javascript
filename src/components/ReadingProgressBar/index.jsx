import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from '@docusaurus/router';
import confetti from 'canvas-confetti';
import styles from './styles.module.css';

/**
 * Caminhos onde a barra de progresso NÃO deve ser exibida
 *
 * Adicione aqui os paths que são muito curtos ou onde a barra
 * de progresso não faz sentido (ex: landing pages, índices, etc)
 */
const EXCLUDED_PATHS = [
  '/pt_BR/',
  '/pt_BR',
  // Adicione mais paths aqui conforme necessário
  // Exemplo: '/sobre', '/contato', etc
];

/**
 * Barra de Progresso de Leitura
 *
 * Mostra o progresso de leitura da página atual e dispara confetti
 * quando o usuário completa a leitura (chega ao final da página).
 *
 * A barra não é exibida em páginas definidas em EXCLUDED_PATHS.
 */
export default function ReadingProgressBar() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const hasCompletedRef = useRef(false);
  const confettiTimeoutRef = useRef(null);

  // Verificar se a página atual está na lista de exclusão
  const isExcludedPath = EXCLUDED_PATHS.includes(location.pathname);

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 10000,
      colors: ['#f7df1e', '#FFD700', '#FFA500', '#FF6347']
    };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  }, []);

  const handleScroll = useCallback(() => {
    // Não processar scroll em páginas excluídas
    if (isExcludedPath) return;

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    // Calcular progresso
    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = scrollableHeight > 0
      ? Math.min((scrollTop / scrollableHeight) * 100, 100)
      : 0;

    setProgress(scrollPercentage);

    // Disparar confetti quando completar a leitura (chegou a 95%+)
    if (scrollPercentage >= 95 && !hasCompletedRef.current) {
      hasCompletedRef.current = true;

      // Adicionar pequeno delay para garantir que o usuário realmente chegou ao final
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }

      confettiTimeoutRef.current = setTimeout(() => {
        fireConfetti();
      }, 300);
    }

    // Reset se o usuário voltar para o topo
    if (scrollPercentage < 10) {
      hasCompletedRef.current = false;
    }
  }, [fireConfetti, isExcludedPath]);

  useEffect(() => {
    // Adicionar listener de scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Calcular progresso inicial
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (confettiTimeoutRef.current) {
        clearTimeout(confettiTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Reset quando mudar de página
  useEffect(() => {
    hasCompletedRef.current = false;
    setProgress(0);
  }, [location.pathname]);

  // Não renderizar a barra em páginas excluídas
  if (isExcludedPath) {
    return null;
  }

  return (
    <div className={styles.progressBarContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`Progresso de leitura: ${Math.round(progress)}%`}
      />
    </div>
  );
}
