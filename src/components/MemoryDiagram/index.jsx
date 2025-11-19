import React from 'react';
import styles from './styles.module.css';

/**
 * Componente para visualizar diagramas de memória
 *
 * Usado nas seções 5.3.1 e 5.3.2 para ilustrar:
 * - Representação de pares em vetores (the_heads/the_tails)
 * - Estruturas de lista em memória
 * - Processo de garbage collection
 */
export default function MemoryDiagram({ type = 'memory-vectors', data }) {
  if (type === 'memory-vectors') {
    return <MemoryVectorsVisualization data={data} />;
  } else if (type === 'garbage-collection') {
    return <GarbageCollectionVisualization data={data} />;
  }
  return null;
}

/**
 * Figura 5.14: Representação de list(list(1, 2), 3, 4) em memória
 */
function MemoryVectorsVisualization({ data }) {
  // Dados padrão para list(list(1, 2), 3, 4)
  const defaultData = {
    the_heads: ['n1', 'n2', 'p1', 'n3', 'n4'],
    the_tails: ['n2', 'e0', 'p2', 'p4', 'e0'],
    indices: [0, 1, 2, 3, 4],
    root: 'p2', // Aponta para o índice 2
    description: 'list(list(1, 2), 3, 4)'
  };

  const memData = data || defaultData;

  return (
    <div className={styles.memoryContainer}>
      <div className={styles.description}>
        <strong>Representação de {memData.description}</strong>
      </div>

      <div className={styles.vectorsContainer}>
        <div className={styles.vectorLabel}>Índice:</div>
        <div className={styles.vector}>
          {memData.indices.map((idx) => (
            <div key={idx} className={styles.cell}>
              <div className={styles.cellLabel}>{idx}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.vectorsContainer}>
        <div className={styles.vectorLabel}>the_heads:</div>
        <div className={styles.vector}>
          {memData.the_heads.map((val, idx) => (
            <div key={idx} className={styles.cell}>
              <div className={styles.cellValue}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.vectorsContainer}>
        <div className={styles.vectorLabel}>the_tails:</div>
        <div className={styles.vector}>
          {memData.the_tails.map((val, idx) => (
            <div key={idx} className={styles.cell}>
              <div className={styles.cellValue}>{val}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendLabel}>p#</span> = ponteiro para par no índice #
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendLabel}>n#</span> = número #
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendLabel}>e0</span> = lista vazia (null)
        </div>
      </div>

      <div className={styles.note}>
        <strong>Nota:</strong> Root aponta para <code>{memData.root}</code> (índice{' '}
        {memData.root.substring(1)})
      </div>
    </div>
  );
}

/**
 * Figura 5.15: Garbage Collection - antes e depois
 */
function GarbageCollectionVisualization({ data }) {
  return (
    <div className={styles.gcContainer}>
      <div className={styles.description}>
        <strong>Reconfiguração da Memória pelo Garbage Collector</strong>
      </div>

      <div className={styles.gcPhases}>
        <div className={styles.gcPhase}>
          <h4>Antes da Coleta</h4>
          <div className={styles.memorySpace}>
            <div className={styles.memoryLabel}>Memória de Trabalho</div>
            <div className={styles.memoryBar}>
              <div className={styles.usedMemory} style={{ width: '80%' }}>
                <span>Dados Úteis + Lixo</span>
              </div>
              <div className={styles.freeMemory} style={{ width: '20%' }}>
                <span>Livre</span>
              </div>
            </div>
            <div className={styles.pointers}>
              <span className={styles.pointer}>← scan</span>
              <span className={styles.pointer}>← free</span>
            </div>
          </div>

          <div className={styles.memorySpace}>
            <div className={styles.memoryLabel}>Memória Livre</div>
            <div className={styles.memoryBar}>
              <div className={styles.emptyMemory} style={{ width: '100%' }}>
                <span>(Vazia)</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.arrow}>→</div>

        <div className={styles.gcPhase}>
          <h4>Depois da Coleta</h4>
          <div className={styles.memorySpace}>
            <div className={styles.memoryLabel}>Nova Memória Livre</div>
            <div className={styles.memoryBar}>
              <div className={styles.garbageMemory} style={{ width: '100%' }}>
                <span>(Disponível)</span>
              </div>
            </div>
          </div>

          <div className={styles.memorySpace}>
            <div className={styles.memoryLabel}>Nova Memória de Trabalho</div>
            <div className={styles.memoryBar}>
              <div className={styles.compactedMemory} style={{ width: '50%' }}>
                <span>Dados Úteis (Compactados)</span>
              </div>
              <div className={styles.freeMemory} style={{ width: '50%' }}>
                <span>Livre</span>
              </div>
            </div>
            <div className={styles.pointers}>
              <span className={styles.pointer}>← free</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gcSteps}>
        <h4>Algoritmo Stop-and-Copy:</h4>
        <ol>
          <li>Copiar objetos acessíveis da memória de trabalho para memória livre</li>
          <li>Marcar objetos movidos com "broken heart" (coração partido)</li>
          <li>Atualizar ponteiros para novos endereços</li>
          <li>Trocar papéis: memória livre vira memória de trabalho</li>
          <li>Lixo é automaticamente eliminado (não é copiado)</li>
        </ol>
      </div>
    </div>
  );
}
