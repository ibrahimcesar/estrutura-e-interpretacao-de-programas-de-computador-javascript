import React from 'react';
import styles from './styles.module.css';

// Signal processing block component
const SignalBlock = ({ type, x, y, width = 80, height = 60, label, scale }) => {
  const renderBlock = () => {
    switch (type) {
      case 'integrator':
        return (
          <g>
            <rect x={x} y={y} width={width} height={height} rx="8"
                  fill="#E3F2FD" stroke="#1976D2" strokeWidth="2"/>
            <text x={x + width/2} y={y + height/2 + 8}
                  textAnchor="middle" fontSize="28" fontWeight="bold" fill="#1565C0">
              ∫
            </text>
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      case 'multiplier':
        return (
          <g>
            <circle cx={x + width/2} cy={y + height/2} r={Math.min(width, height)/2}
                    fill="#FFF9C4" stroke="#F57F17" strokeWidth="2"/>
            <text x={x + width/2} y={y + height/2 + 8}
                  textAnchor="middle" fontSize="24" fontWeight="bold" fill="#E65100">
              ×
            </text>
            {scale && (
              <text x={x + width/2} y={y + height/2 + 22}
                    textAnchor="middle" fontSize="10" fill="#E65100">
                {scale}
              </text>
            )}
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      case 'adder':
        return (
          <g>
            <circle cx={x + width/2} cy={y + height/2} r={Math.min(width, height)/2}
                    fill="#FFE0B2" stroke="#E65100" strokeWidth="2"/>
            <text x={x + width/2} y={y + height/2 + 8}
                  textAnchor="middle" fontSize="24" fontWeight="bold" fill="#BF360C">
              +
            </text>
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      case 'constant':
        return (
          <g>
            <rect x={x} y={y} width={width} height={height} rx="8"
                  fill="#C8E6C9" stroke="#2E7D32" strokeWidth="2"/>
            <text x={x + width/2} y={y + height/2 + 6}
                  textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1B5E20">
              {label || 'k'}
            </text>
          </g>
        );

      case 'gain':
        return (
          <g>
            <path d={`M ${x},${y + height} L ${x + width},${y + height/2} L ${x},${y} Z`}
                  fill="#BBDEFB" stroke="#1976D2" strokeWidth="2"/>
            {label && (
              <text x={x + width/3} y={y + height/2 + 5}
                    textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0D47A1">
                {label}
              </text>
            )}
          </g>
        );

      case 'resistor':
        return (
          <g>
            <path d={`M ${x},${y + height/2}
                     L ${x + width*0.2},${y + height/2}
                     L ${x + width*0.3},${y}
                     L ${x + width*0.4},${y + height}
                     L ${x + width*0.5},${y}
                     L ${x + width*0.6},${y + height}
                     L ${x + width*0.7},${y}
                     L ${x + width*0.8},${y + height/2}
                     L ${x + width},${y + height/2}`}
                  fill="none" stroke="#795548" strokeWidth="3"/>
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      case 'capacitor':
        return (
          <g>
            <line x1={x} y1={y + height/2} x2={x + width*0.45} y2={y + height/2}
                  stroke="#2196F3" strokeWidth="3"/>
            <line x1={x + width*0.45} y1={y} x2={x + width*0.45} y2={y + height}
                  stroke="#2196F3" strokeWidth="3"/>
            <line x1={x + width*0.55} y1={y} x2={x + width*0.55} y2={y + height}
                  stroke="#2196F3" strokeWidth="3"/>
            <line x1={x + width*0.55} y1={y + height/2} x2={x + width} y2={y + height/2}
                  stroke="#2196F3" strokeWidth="3"/>
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      case 'inductor':
        return (
          <g>
            <path d={`M ${x},${y + height/2}
                     L ${x + width*0.15},${y + height/2}
                     Q ${x + width*0.2},${y} ${x + width*0.3},${y + height/2}
                     Q ${x + width*0.4},${y + height} ${x + width*0.5},${y + height/2}
                     Q ${x + width*0.6},${y} ${x + width*0.7},${y + height/2}
                     Q ${x + width*0.8},${y + height} ${x + width*0.85},${y + height/2}
                     L ${x + width},${y + height/2}`}
                  fill="none" stroke="#4CAF50" strokeWidth="3"/>
            {label && (
              <text x={x + width/2} y={y + height + 18}
                    textAnchor="middle" fontSize="12" fill="#666">
                {label}
              </text>
            )}
          </g>
        );

      default:
        return null;
    }
  };

  return renderBlock();
};

// Wire/Connection component
const Wire = ({ x1, y1, x2, y2, label, dashed, color = '#333' }) => (
  <g>
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth="2"
      strokeDasharray={dashed ? '5,5' : '0'}
      markerEnd="url(#arrow)"
    />
    {label && (
      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 - 8}
        fontSize="12"
        fill="#1976D2"
        fontWeight="bold"
      >
        {label}
      </text>
    )}
  </g>
);

// Signal node (input/output)
const SignalNode = ({ x, y, label, type = 'input' }) => {
  const color = type === 'input' ? '#E1BEE7' : '#C8E6C9';
  const strokeColor = type === 'input' ? '#7B1FA2' : '#2E7D32';

  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={color} stroke={strokeColor} strokeWidth="2"/>
      <text x={x} y={y + 5} textAnchor="middle" fontSize="12" fontWeight="bold" fill={strokeColor}>
        {label}
      </text>
    </g>
  );
};

// Diagram configurations
const diagrams = {
  'rc-integrator': {
    width: 600,
    height: 300,
    blocks: [
      { type: 'multiplier', x: 150, y: 120, width: 50, height: 50, scale: '1/R' },
      { type: 'integrator', x: 350, y: 110, width: 80, height: 60, label: 'dt' },
      { type: 'multiplier', x: 350, y: 200, width: 50, height: 50, scale: '1/C' },
    ],
    wires: [
      { x1: 50, y1: 145, x2: 150, y2: 145, label: 'v' },
      { x1: 200, y1: 145, x2: 350, y2: 140 },
      { x1: 430, y1: 140, x2: 550, y2: 140, label: 'i' },
      // Feedback loop
      { x1: 500, y1: 140, x2: 500, y2: 225 },
      { x1: 500, y1: 225, x2: 400, y2: 225 },
      { x1: 375, y1: 250, x2: 375, y2: 170 },
    ],
    nodes: [
      { x: 50, y: 145, label: 'v', type: 'input' },
      { x: 550, y: 140, label: 'i', type: 'output' },
    ],
  },

  'feedback-solver': {
    width: 700,
    height: 350,
    blocks: [
      { type: 'adder', x: 150, y: 130, width: 50, height: 50 },
      { type: 'integrator', x: 300, y: 120, width: 80, height: 60, label: 'dt' },
      { type: 'gain', x: 520, y: 120, width: 60, height: 60, label: 'f' },
    ],
    wires: [
      { x1: 50, y1: 155, x2: 150, y2: 155, label: 'dy/dt' },
      { x1: 200, y1: 155, x2: 300, y2: 150 },
      { x1: 380, y1: 150, x2: 520, y2: 150, label: 'y' },
      { x1: 580, y1: 150, x2: 650, y2: 150 },
      // Feedback
      { x1: 620, y1: 150, x2: 620, y2: 280, dashed: true },
      { x1: 620, y1: 280, x2: 175, y2: 280, dashed: true },
      { x1: 175, y1: 280, x2: 175, y2: 180, dashed: true },
    ],
    nodes: [
      { x: 50, y: 155, label: 'dy/dt', type: 'input' },
      { x: 650, y: 150, label: 'y', type: 'output' },
    ],
  },

  'rlc-circuit': {
    width: 700,
    height: 300,
    blocks: [
      { type: 'resistor', x: 150, y: 110, width: 100, height: 40, label: 'R' },
      { type: 'inductor', x: 300, y: 110, width: 100, height: 40, label: 'L' },
      { type: 'capacitor', x: 450, y: 110, width: 80, height: 40, label: 'C' },
    ],
    wires: [
      // Top connections
      { x1: 50, y1: 130, x2: 150, y2: 130 },
      { x1: 250, y1: 130, x2: 300, y2: 130 },
      { x1: 400, y1: 130, x2: 450, y2: 130 },
      { x1: 530, y1: 130, x2: 600, y2: 130 },
      // Bottom return
      { x1: 600, y1: 130, x2: 600, y2: 230 },
      { x1: 600, y1: 230, x2: 50, y2: 230 },
      { x1: 50, y1: 230, x2: 50, y2: 130 },
    ],
    nodes: [
      { x: 50, y: 80, label: 'V_in', type: 'input' },
      { x: 600, y: 180, label: 'GND', type: 'output' },
    ],
    custom: (
      <>
        <text x="50" y="80" fontSize="14" fontWeight="bold" fill="#7B1FA2">V(t)</text>
        <text x="50" y="250" fontSize="14" fontWeight="bold" fill="#2E7D32">GND</text>
        {/* Voltage source symbol */}
        <circle cx="50" cy="180" r="25" fill="none" stroke="#E91E63" strokeWidth="2"/>
        <line x1="50" y1="165" x2="50" y2="195" stroke="#E91E63" strokeWidth="2"/>
        <line x1="40" y1="175" x2="60" y2="175" stroke="#E91E63" strokeWidth="2"/>
        <line x1="40" y1="185" x2="60" y2="185" stroke="#E91E63" strokeWidth="2"/>
      </>
    ),
  },

  'differential-system': {
    width: 800,
    height: 400,
    blocks: [
      { type: 'adder', x: 150, y: 130, width: 50, height: 50 },
      { type: 'integrator', x: 280, y: 120, width: 80, height: 60, label: 'dt' },
      { type: 'multiplier', x: 480, y: 120, width: 50, height: 50, scale: 'a' },
      { type: 'adder', x: 150, y: 270, width: 50, height: 50 },
      { type: 'integrator', x: 280, y: 260, width: 80, height: 60, label: 'dt' },
      { type: 'multiplier', x: 480, y: 260, width: 50, height: 50, scale: 'b' },
    ],
    wires: [
      // First equation
      { x1: 50, y1: 155, x2: 150, y2: 155, label: 'dy₁' },
      { x1: 200, y1: 155, x2: 280, y2: 150 },
      { x1: 360, y1: 150, x2: 480, y2: 145, label: 'y₁' },
      { x1: 530, y1: 145, x2: 700, y2: 145 },
      // Second equation
      { x1: 50, y1: 295, x2: 150, y2: 295, label: 'dy₂' },
      { x1: 200, y1: 295, x2: 280, y2: 290 },
      { x1: 360, y1: 290, x2: 480, y2: 285, label: 'y₂' },
      { x1: 530, y1: 285, x2: 700, y2: 285 },
      // Cross feedback
      { x1: 650, y1: 145, x2: 650, y2: 320, dashed: true },
      { x1: 650, y1: 320, x2: 175, y2: 320, dashed: true },
      { x1: 175, y1: 320, x2: 175, y2: 305, dashed: true },
      { x1: 650, y1: 285, x2: 650, y2: 100, dashed: true },
      { x1: 650, y1: 100, x2: 175, y2: 100, dashed: true },
      { x1: 175, y1: 100, x2: 175, y2: 165, dashed: true },
    ],
    nodes: [
      { x: 50, y: 155, label: 'dy₁', type: 'input' },
      { x: 50, y: 295, label: 'dy₂', type: 'input' },
      { x: 700, y: 145, label: 'y₁', type: 'output' },
      { x: 700, y: 285, label: 'y₂', type: 'output' },
    ],
  },
};

export default function SignalFlowDiagram({ type }) {
  const diagram = diagrams[type];

  if (!diagram) {
    return <div>Unknown diagram type: {type}</div>;
  }

  return (
    <div className={styles.diagramContainer}>
      <svg
        width={diagram.width}
        height={diagram.height}
        viewBox={`0 0 ${diagram.width} ${diagram.height}`}
        className={styles.diagram}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#333" />
          </marker>
        </defs>

        {/* Render wires first (background) */}
        {diagram.wires?.map((wire, idx) => (
          <Wire key={`wire-${idx}`} {...wire} />
        ))}

        {/* Render blocks */}
        {diagram.blocks?.map((block, idx) => (
          <SignalBlock key={`block-${idx}`} {...block} />
        ))}

        {/* Render nodes */}
        {diagram.nodes?.map((node, idx) => (
          <SignalNode key={`node-${idx}`} {...node} />
        ))}

        {/* Render custom elements */}
        {diagram.custom}
      </svg>
    </div>
  );
}
