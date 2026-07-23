import React from 'react';
import styles from './CodePlayground.module.css';

/**
 * Diagrama caixa-e-ponteiro (como no livro) para o resultado de uma
 * execução. Recebe a árvore serializada pelo worker:
 *   { k: 'pair', id, h, t } | { k: 'val', text } | { k: 'null' }
 *   | { k: 'ref', id }      | { k: 'more' }
 * Compartilhamento e ciclos chegam como 'ref' e viram setas para a célula
 * já desenhada — exatamente a semântica da seção 3.3.
 */

const COL_W = 110;
const ROW_H = 84;
const BOX = 38;
const PAD_X = 30;
const PAD_Y = 26;

function layout(root) {
  const cells = new Map(); // id -> { col, row, node }
  let maxCol = 0;
  let maxRow = 0;

  function place(node, col, row) {
    if (node.k !== 'pair' || cells.has(node.id)) return row;
    cells.set(node.id, { col, row, node });
    maxCol = Math.max(maxCol, col);
    maxRow = Math.max(maxRow, row);
    let bottom = row;
    if (node.t.k === 'pair' && !cells.has(node.t.id)) {
      bottom = Math.max(bottom, place(node.t, col + 1, row));
    }
    if (node.h.k === 'pair' && !cells.has(node.h.id)) {
      bottom = Math.max(bottom, place(node.h, col, bottom + 1));
    }
    return bottom;
  }

  place(root, 0, 0);
  return { cells, maxCol, maxRow };
}

function cellX(col) {
  return PAD_X + col * COL_W;
}

function cellY(row) {
  return PAD_Y + row * ROW_H;
}

function Slash({ x, y }) {
  return <line x1={x + 5} y1={y + BOX - 5} x2={x + BOX - 5} y2={y + 5} strokeWidth="1.5" />;
}

function BoxText({ x, y, text }) {
  return (
    <text x={x + BOX / 2} y={y + BOX / 2 + 4} textAnchor="middle" fontSize="11" stroke="none">
      {text}
    </text>
  );
}

function Arrow({ fromX, fromY, toX, toY }) {
  return (
    <g>
      <circle cx={fromX} cy={fromY} r="2.5" stroke="none" className={styles.diagramDot} />
      <line x1={fromX} y1={fromY} x2={toX} y2={toY} strokeWidth="1.5" markerEnd="url(#bp-arrow)" />
    </g>
  );
}

export default function BoxPointerDiagram({ tree, label }) {
  if (!tree || tree.k !== 'pair') return null;
  const { cells, maxCol, maxRow } = layout(tree);
  const width = PAD_X * 2 + (maxCol + 1) * COL_W;
  const height = PAD_Y * 2 + maxRow * ROW_H + BOX;

  const shapes = [];
  for (const { col, row, node } of cells.values()) {
    const x = cellX(col);
    const y = cellY(row);
    shapes.push(
      <g key={`cell-${node.id}`}>
        <rect x={x} y={y} width={BOX} height={BOX} fill="none" strokeWidth="1.5" />
        <rect x={x + BOX} y={y} width={BOX} height={BOX} fill="none" strokeWidth="1.5" />
      </g>
    );
    // metade da esquerda: head
    const headCenter = { x: x + BOX / 2, y: y + BOX / 2 };
    if (node.h.k === 'pair' || node.h.k === 'ref') {
      const target = cells.get(node.h.id);
      if (target) {
        shapes.push(
          <Arrow
            key={`h-${node.id}`}
            fromX={headCenter.x}
            fromY={headCenter.y}
            toX={cellX(target.col) + BOX / 2}
            toY={cellY(target.row) - 4}
          />
        );
      }
    } else if (node.h.k === 'null') {
      shapes.push(<Slash key={`h-${node.id}`} x={x} y={y} />);
    } else {
      shapes.push(<BoxText key={`h-${node.id}`} x={x} y={y} text={node.h.k === 'more' ? '…' : node.h.text} />);
    }
    // metade da direita: tail
    const tailCenter = { x: x + BOX + BOX / 2, y: y + BOX / 2 };
    if (node.t.k === 'pair' || node.t.k === 'ref') {
      const target = cells.get(node.t.id);
      if (target) {
        const sameRow = target.row === row && target.col > col;
        shapes.push(
          <Arrow
            key={`t-${node.id}`}
            fromX={tailCenter.x}
            fromY={tailCenter.y}
            toX={cellX(target.col) - 4}
            toY={sameRow ? tailCenter.y : cellY(target.row) + BOX / 2}
          />
        );
      }
    } else if (node.t.k === 'null') {
      shapes.push(<Slash key={`t-${node.id}`} x={x + BOX} y={y} />);
    } else {
      shapes.push(<BoxText key={`t-${node.id}`} x={x + BOX} y={y} text={node.t.k === 'more' ? '…' : node.t.text} />);
    }
  }

  return (
    <div className={styles.diagramScroll}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label || 'Diagrama caixa-e-ponteiro do resultado'}
        className={styles.diagramSvg}
      >
        <defs>
          <marker id="bp-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" stroke="none" className={styles.diagramDot} />
          </marker>
        </defs>
        {shapes}
      </svg>
    </div>
  );
}
