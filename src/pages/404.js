import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './404.module.css';

export default function NotFound() {
  return (
    <Layout
      title="Página não encontrada"
      description="A página que você está procurando não existe"
    >
      <main className="container margin-vert--xl">
        <div className={styles.notFoundContainer}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Página não encontrada</h2>
          <p className={styles.description}>
            Não foi possível encontrar o que você está procurando.
          </p>
          <p className={styles.suggestion}>
            Por favor, entre em contato com o dono do site que ligou você à URL original e informe que o link está quebrado.
          </p>
          <Link
            className="button button--primary button--lg"
            to="/"
          >
            Ir para a página inicial
          </Link>
        </div>
      </main>
    </Layout>
  );
}
