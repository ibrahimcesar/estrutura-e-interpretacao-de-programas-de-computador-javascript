import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useLocation } from '@docusaurus/router';

/**
 * Reading Progress Bar Component
 * Shows reading progress at the top of the page
 * Celebrates with confetti when reaching 100%
 * Can be hidden on specific pages using frontmatter: hide_progress_bar: true
 */
export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [hasConfettied, setHasConfettied] = useState(false);
  const location = useLocation();

  // Pages where progress bar should be hidden (intro pages, prefaces, about pages)
  const hiddenPages = [
    '/pt_BR/',                          // Homepage
    '/pt_BR/intro',                     // Bem-Vindo
    '/pt_BR/prefaces',                  // All Prefácios pages
    '/pt_BR/agradecimentos',            // Agradecimentos
    '/pt_BR/sobre-o-projeto',           // Sobre o Projeto
    '/pt_BR/sobre-traducao-brasileira', // Sobre a Tradução Brasileira
    '/pt_BR/como-contribuir',           // Como Contribuir
    '/pt_BR/guia-traducao',             // Guia de Tradução
    '/pt_BR/recomendacoes',             // Recomendações
    '/pt_BR/referencias',               // Referências
  ];

  // Check if current page should hide the progress bar
  const shouldHide = hiddenPages.some(page =>
    location.pathname === page ||
    location.pathname === page + '/' ||
    location.pathname.startsWith(page + '/')
  );

  useEffect(() => {
    const calculateProgress = () => {
      // Get the main content area (excluding footer)
      const article = document.querySelector('article');
      if (!article) return 0;

      // Get the article's bounding rect for accurate positioning
      const rect = article.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const articleHeight = article.scrollHeight;

      // Calculate how much of the article has been scrolled
      // When article top is at navbar height, we're at the start (0%)
      // When article bottom reaches bottom of viewport, we're at end (100%)
      const navbarHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--ifm-navbar-height') || '60', 10);

      // Distance from top of article to bottom of viewport
      const visibleTop = -rect.top + navbarHeight;

      // Total scrollable distance (article height minus one viewport)
      const scrollableDistance = articleHeight - windowHeight + navbarHeight;

      // Calculate percentage
      let progressPercentage = (visibleTop / scrollableDistance) * 100;

      // Clamp between 0 and 100
      return Math.min(Math.max(progressPercentage, 0), 100);
    };

    const handleScroll = () => {
      const newProgress = calculateProgress();
      setProgress(newProgress);

      // Trigger confetti when reaching 100% for the first time
      if (newProgress >= 99.5 && !hasConfettied) {
        setHasConfettied(true);
        triggerConfetti();
      }
    };

    // Initial calculation
    handleScroll();

    // Add scroll listener with throttling for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hasConfettied]);

  // Reset confetti flag when navigating to a new page
  useEffect(() => {
    setHasConfettied(false);
    setProgress(0);
  }, [typeof window !== 'undefined' ? window.location.pathname : '']);

  const triggerConfetti = () => {
    const duration = 2000; // 2 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Shoot confetti from different positions
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
  };

  // Don't render if should be hidden
  if (shouldHide) {
    return null;
  }

  return (
    <div
      className="reading-progress-bar"
      style={{
        position: 'fixed',
        top: 'var(--ifm-navbar-height, 60px)',
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: 'var(--ifm-color-emphasis-200)',
        zIndex: 1000,
        transition: 'opacity 0.3s ease',
        opacity: progress > 0 ? 1 : 0,
      }}
    >
      <div
        className="reading-progress-bar-fill"
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-light) 100%)',
          width: `${progress}%`,
          transition: 'width 0.15s ease-out',
          boxShadow: progress > 0 ? '0 0 10px var(--ifm-color-primary)' : 'none',
        }}
      />
      {/* Percentage indicator (optional, only shows on hover) */}
      <div
        className="reading-progress-percentage"
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '10px',
          fontWeight: 'bold',
          color: 'var(--ifm-color-primary)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
        }}
      >
        {Math.round(progress)}%
      </div>
      <style>
        {`
          .reading-progress-bar:hover .reading-progress-percentage {
            opacity: 1;
          }

          @media (max-width: 996px) {
            .reading-progress-bar {
              top: var(--ifm-navbar-height, 50px);
            }
          }
        `}
      </style>
    </div>
  );
}
