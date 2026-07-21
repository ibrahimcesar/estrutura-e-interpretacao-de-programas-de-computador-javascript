import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import exercises from '@site/src/data/exercises.json';
import { allMarked, setMarked, CHANGE_EVENT } from '@site/src/lib/progress';
import styles from './progresso.module.css';

const CHAPTER_TITLES = {
  1: 'Construindo Abstrações com Funções',
  2: 'Construindo Abstrações com Dados',
  3: 'Modularidade, Objetos e Estado',
  4: 'Abstração Metalinguística',
  5: 'Computando com Máquinas de Registradores',
};

/**
 * Painel de progresso do leitor: quais exercícios já foram resolvidos,
 * por capítulo e seção. Os dados vivem no localStorage deste navegador
 * (chaves exmark:*), marcados na caixa "resolvi" de cada solução, ou
 * automaticamente quando as verificações de um exercício passam.
 */
export default function Progresso() {
  const [marked, setMarkedSet] = useState(() => new Set());

  useEffect(() => {
    setMarkedSet(allMarked());
    const sync = () => setMarkedSet(allMarked());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const chapters = useMemo(() => {
    const map = new Map();
    for (const e of exercises) {
      const ch = e.n.split('.')[0];
      if (!map.has(ch)) map.set(ch, new Map());
      const bySection = map.get(ch);
      const section = e.page.split('/').pop();
      if (!bySection.has(section)) bySection.set(section, []);
      bySection.get(section).push(e);
    }
    return map;
  }, []);

  const total = exercises.length;
  const done = exercises.filter((e) => marked.has(e.n)).length;

  const toggle = (n) => setMarked(n, !marked.has(n));

  return (
    <Layout
      title="Progresso"
      description="Acompanhe quais exercícios do SICP.js você já resolveu."
    >
      <main className={styles.main}>
        <h1>Seu progresso</h1>
        <p className={styles.lead}>
          {done === 0
            ? 'Nenhum exercício marcado ainda — cada solução do livro tem uma caixa "resolvi este exercício", e exercícios com verificação automática se marcam sozinhos quando os testes passam.'
            : done === total
            ? `Todos os ${total} exercícios resolvidos. Os feiticeiros da era anterior o saúdam. 🧙`
            : `${done} de ${total} exercícios resolvidos. O progresso fica salvo neste navegador.`}
        </p>

        <div className={styles.totalBar} aria-hidden="true">
          <div
            className={styles.totalFill}
            style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
          />
        </div>

        {[...chapters.entries()].map(([ch, sections]) => {
          const chapterExercises = [...sections.values()].flat();
          const chapterDone = chapterExercises.filter((e) => marked.has(e.n)).length;
          return (
            <section key={ch} className={styles.chapter}>
              <h2>
                Capítulo {ch} — {CHAPTER_TITLES[ch]}
                <span className={styles.count}>
                  {chapterDone}/{chapterExercises.length}
                </span>
              </h2>
              <div className={styles.bar} aria-hidden="true">
                <div
                  className={styles.fill}
                  style={{
                    width: `${(chapterDone / chapterExercises.length) * 100}%`,
                  }}
                />
              </div>
              <details open={chapterDone > 0 && chapterDone < chapterExercises.length}>
                <summary>Exercícios por seção</summary>
                {[...sections.entries()].map(([section, list]) => (
                  <div key={section} className={styles.sectionRow}>
                    <Link to={list[0].page} className={styles.sectionLink}>
                      {section}
                    </Link>
                    <div className={styles.pills}>
                      {list.map((e) => (
                        <span key={e.n} className={styles.pill}>
                          <input
                            type="checkbox"
                            id={`ex-${e.n}`}
                            checked={marked.has(e.n)}
                            onChange={() => toggle(e.n)}
                            aria-label={`Exercício ${e.n} resolvido`}
                          />
                          <Link to={`${e.page}#${e.anchor}`}>{e.n}</Link>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </details>
            </section>
          );
        })}

        <p className={styles.footnote}>
          O progresso é seu e fica só aqui: gravado no armazenamento local deste
          navegador, sem conta e sem servidor. Limpar os dados do site zera as
          marcações.
        </p>
      </main>
    </Layout>
  );
}
