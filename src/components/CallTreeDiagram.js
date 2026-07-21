import React from 'react';
import styles from './CodePlayground.module.css';

/**
 * Árvore de chamadas registrada por trace(...) — a "forma do processo" do
 * capítulo 1.2, desenhada a partir da execução real. Nós:
 *   { l: 'fib(3)', v: '2', c: [filhos] }
 */

const NODE_W = 104;
const NODE_H = 40;
const H_GAP = 14;
const V_GAP = 34;
const PAD = 20;

function countLeaves(node) {
  if (!node.c || node.c.length === 0) return 1;
  return node.c.reduce((sum, child) => sum + countLeaves(child), 0);
}

function clip(text, max) {
  return text.length > max ? text.slice(0, max - 1) + '…' : text;
}

export default function CallTreeDiagram({ roots, truncated }) {
  const positions = []; // { node, x (centro), y }
  let cursor = 0; // em slots de folha
  let maxDepth = 0;

  function place(node, depth) {
    maxDepth = Math.max(maxDepth, depth);
    let center;
    if (!node.c || node.c.length === 0) {
      center = (cursor + 0.5) * (NODE_W + H_GAP);
      cursor += 1;
    } else {
      const childCenters = node.c.map((child) => place(child, depth + 1));
      center = (childCenters[0] + childCenters[childCenters.length - 1]) / 2;
    }
    positions.push({ node, x: PAD + center, y: PAD + depth * (NODE_H + V_GAP) });
    return center;
  }

  roots.forEach((root) => place(root, 0));

  const byNode = new Map(positions.map((p) => [p.node, p]));
  const items = [];
  for (const p of positions) {
    items.push(
      <g key={`node-${p.x}-${p.y}`}>
        <rect x={p.x - NODE_W / 2} y={p.y} width={NODE_W} height={NODE_H} rx="6" fill="none" strokeWidth="1.5" />
        <text x={p.x} y={p.y + 16} textAnchor="middle" fontSize="12" stroke="none">
          {clip(p.node.l, 15)}
        </text>
        <text x={p.x} y={p.y + 32} textAnchor="middle" fontSize="11" stroke="none" opacity="0.75">
          {p.node.v == null ? '…' : `→ ${clip(p.node.v, 13)}`}
        </text>
      </g>
    );
    for (const child of p.node.c || []) {
      const cp = byNode.get(child);
      if (cp) {
        items.push(
          <line
            key={`edge-${p.x}-${p.y}-${cp.x}-${cp.y}`}
            x1={p.x}
            y1={p.y + NODE_H}
            x2={cp.x}
            y2={cp.y}
            strokeWidth="1.2"
          />
        );
      }
    }
  }

  const totalLeaves = roots.reduce((sum, r) => sum + countLeaves(r), 0);
  const width = PAD * 2 + totalLeaves * (NODE_W + H_GAP);
  const height = PAD * 2 + (maxDepth + 1) * (NODE_H + V_GAP) - V_GAP;

  return (
    <div className={styles.diagramScroll}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Árvore de chamadas do processo"
        className={styles.diagramSvg}
      >
        {items}
      </svg>
      {truncated && (
        <div className={styles.entryStatus} style={{ padding: '0 0.75rem 0.5rem' }}>
          — árvore truncada em 200 chamadas —
        </div>
      )}
    </div>
  );
}
