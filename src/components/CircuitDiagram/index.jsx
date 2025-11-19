import React from 'react';
import styles from './styles.module.css';

// Logic gate definitions as SVG symbols
const LogicGates = () => (
  <defs>
    {/* AND Gate */}
    <symbol id="and-gate" viewBox="0 0 100 80">
      <path
        d="M 0,0 L 0,80 L 50,80 A 40,40 0 0,0 50,0 Z"
        fill="white"
        stroke="#333"
        strokeWidth="2"
      />
      <circle cx="50" cy="40" r="2" fill="#333"/>
    </symbol>

    {/* OR Gate */}
    <symbol id="or-gate" viewBox="0 0 100 80">
      <path
        d="M 0,0 Q 20,40 0,80 L 40,80 Q 100,80 100,40 Q 100,0 40,0 Z"
        fill="white"
        stroke="#333"
        strokeWidth="2"
      />
    </symbol>

    {/* XOR Gate */}
    <symbol id="xor-gate" viewBox="0 0 110 80">
      <path
        d="M 0,0 Q 20,40 0,80"
        fill="none"
        stroke="#333"
        strokeWidth="2"
      />
      <path
        d="M 10,0 Q 30,40 10,80 L 50,80 Q 110,80 110,40 Q 110,0 50,0 Z"
        fill="white"
        stroke="#333"
        strokeWidth="2"
      />
    </symbol>

    {/* NOT Gate (Inverter) */}
    <symbol id="not-gate" viewBox="0 0 80 60">
      <path
        d="M 0,0 L 0,60 L 60,30 Z"
        fill="white"
        stroke="#333"
        strokeWidth="2"
      />
      <circle cx="68" cy="30" r="8" fill="white" stroke="#333" strokeWidth="2"/>
    </symbol>

    {/* Arrow marker */}
    <marker
      id="arrowhead"
      markerWidth="10"
      markerHeight="10"
      refX="9"
      refY="3"
      orient="auto"
    >
      <polygon points="0 0, 10 3, 0 6" fill="#333" />
    </marker>
  </defs>
);

// Wire component
const Wire = ({ x1, y1, x2, y2, label, labelOffset = { x: 0, y: -5 } }) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#333"
      strokeWidth="2"
      markerEnd="url(#arrowhead)"
    />
    {label && (
      <text
        x={(x1 + x2) / 2 + labelOffset.x}
        y={(y1 + y2) / 2 + labelOffset.y}
        fontSize="14"
        fill="#1976D2"
        fontWeight="bold"
      >
        {label}
      </text>
    )}
  </g>
);

// Gate component
const Gate = ({ type, x, y, width = 100, height = 80, inputs = [], output = '', rotation = 0 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotation} ${width / 2} ${height / 2})`}>
    <use href={`#${type}-gate`} width={width} height={height} />

    {/* Input labels */}
    {inputs.map((label, idx) => (
      <text
        key={`in-${idx}`}
        x="-15"
        y={height * (idx + 1) / (inputs.length + 1) + 5}
        fontSize="14"
        fill="#E65100"
        fontWeight="bold"
      >
        {label}
      </text>
    ))}

    {/* Output label */}
    {output && (
      <text
        x={width + 10}
        y={height / 2 + 5}
        fontSize="14"
        fill="#2E7D32"
        fontWeight="bold"
      >
        {output}
      </text>
    )}
  </g>
);

// Junction dot
const Junction = ({ x, y, size = 5 }) => (
  <circle cx={x} cy={y} r={size} fill="#333" />
);

// Circuit configurations
const circuits = {
  'half-adder': {
    width: 500,
    height: 300,
    elements: {
      gates: [
        { type: 'xor', x: 250, y: 80, inputs: [], output: 'S' },
        { type: 'and', x: 250, y: 180, inputs: [], output: 'C' },
      ],
      wires: [
        // Input A to XOR
        { x1: 50, y1: 100, x2: 150, y2: 100, label: 'A' },
        { x1: 150, y1: 100, x2: 150, y2: 110 },
        { x1: 150, y1: 110, x2: 250, y2: 110 },
        // Input A to AND
        { x1: 150, y1: 100, x2: 150, y2: 210 },
        { x1: 150, y1: 210, x2: 250, y2: 210 },
        // Input B to XOR
        { x1: 50, y1: 150, x2: 180, y2: 150 },
        { x1: 180, y1: 150, x2: 250, y2: 150 },
        // Input B to AND
        { x1: 180, y1: 150, x2: 180, y2: 250 },
        { x1: 180, y1: 250, x2: 250, y2: 250 },
        // XOR output
        { x1: 350, y1: 120, x2: 450, y2: 120, label: 'Soma' },
        // AND output
        { x1: 350, y1: 220, x2: 450, y2: 220, label: 'Vai-um' },
      ],
      junctions: [
        { x: 150, y: 100 },
        { x: 180, y: 150 },
      ],
    },
  },

  'full-adder': {
    width: 700,
    height: 400,
    elements: {
      gates: [
        { type: 'xor', x: 200, y: 80, inputs: [], output: '' },
        { type: 'xor', x: 400, y: 100, inputs: [], output: 'S' },
        { type: 'and', x: 200, y: 200, inputs: [], output: '' },
        { type: 'and', x: 400, y: 250, inputs: [], output: '' },
        { type: 'or', x: 550, y: 220, inputs: [], output: 'C_out' },
      ],
      wires: [
        // Inputs A and B to first XOR
        { x1: 50, y1: 100, x2: 200, y2: 100, label: 'A' },
        { x1: 50, y1: 140, x2: 200, y2: 140, label: 'B' },
        // First XOR output to second XOR
        { x1: 300, y1: 120, x2: 400, y2: 120 },
        // C_in to second XOR
        { x1: 50, y1: 180, x2: 350, y2: 180, label: 'C_in' },
        { x1: 350, y1: 180, x2: 400, y2: 160 },
        // Inputs to first AND
        { x1: 100, y1: 100, x2: 100, y2: 220 },
        { x1: 100, y1: 220, x2: 200, y2: 220 },
        { x1: 120, y1: 140, x2: 120, y2: 260 },
        { x1: 120, y1: 260, x2: 200, y2: 260 },
        // First XOR to second AND
        { x1: 330, y1: 120, x2: 330, y2: 270 },
        { x1: 330, y1: 270, x2: 400, y2: 270 },
        // C_in to second AND
        { x1: 350, y1: 180, x2: 350, y2: 310 },
        { x1: 350, y1: 310, x2: 400, y2: 310 },
        // ANDs to OR
        { x1: 300, y1: 240, x2: 520, y2: 240 },
        { x1: 520, y1: 240, x2: 550, y2: 240 },
        { x1: 500, y1: 290, x2: 520, y2: 290 },
        { x1: 520, y1: 290, x2: 550, y2: 280 },
        // Final outputs
        { x1: 500, y1: 140, x2: 650, y2: 140, label: 'Soma' },
        { x1: 650, y1: 260, x2: 650, y2: 260, label: '' },
      ],
      junctions: [
        { x: 100, y: 100 },
        { x: 120, y: 140 },
        { x: 330, y: 120 },
        { x: 350, y: 180 },
        { x: 520, y: 240 },
      ],
    },
  },

  'ripple-carry-adder': {
    width: 900,
    height: 350,
    elements: {
      gates: [],
      wires: [],
      custom: (
        <>
          {/* Three full adders in sequence */}
          <g transform="translate(0, 0)">
            <rect x="100" y="80" width="150" height="120" rx="10"
                  fill="#FFF9C4" stroke="#F57F17" strokeWidth="2"/>
            <text x="175" y="135" textAnchor="middle" fontSize="16" fontWeight="bold">FA₀</text>
            <text x="105" y="110" fontSize="12">A₀</text>
            <text x="105" y="145" fontSize="12">B₀</text>
            <text x="105" y="180" fontSize="12">C₀</text>
            <text x="240" y="135" fontSize="12">S₀</text>
            <text x="175" y="210" fontSize="12">C₁</text>
          </g>

          <g transform="translate(200, 0)">
            <rect x="100" y="80" width="150" height="120" rx="10"
                  fill="#E3F2FD" stroke="#1976D2" strokeWidth="2"/>
            <text x="175" y="135" textAnchor="middle" fontSize="16" fontWeight="bold">FA₁</text>
            <text x="105" y="110" fontSize="12">A₁</text>
            <text x="105" y="145" fontSize="12">B₁</text>
            <text x="240" y="135" fontSize="12">S₁</text>
            <text x="175" y="210" fontSize="12">C₂</text>
          </g>

          <g transform="translate(400, 0)">
            <rect x="100" y="80" width="150" height="120" rx="10"
                  fill="#FFE0B2" stroke="#E65100" strokeWidth="2"/>
            <text x="175" y="135" textAnchor="middle" fontSize="16" fontWeight="bold">FA₂</text>
            <text x="105" y="110" fontSize="12">A₂</text>
            <text x="105" y="145" fontSize="12">B₂</text>
            <text x="240" y="135" fontSize="12">S₂</text>
            <text x="175" y="210" fontSize="12">C₃</text>
          </g>

          {/* Carry connections */}
          <line x1="275" y1="200" x2="275" y2="230" stroke="#333" strokeWidth="2"/>
          <line x1="275" y1="230" x2="300" y2="230" stroke="#333" strokeWidth="2"/>
          <line x1="300" y1="230" x2="300" y2="180" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <line x1="475" y1="200" x2="475" y2="230" stroke="#333" strokeWidth="2"/>
          <line x1="475" y1="230" x2="500" y2="230" stroke="#333" strokeWidth="2"/>
          <line x1="500" y1="230" x2="500" y2="180" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          {/* Input labels */}
          <text x="50" y="100" fontSize="14" fill="#E65100" fontWeight="bold">A₀</text>
          <line x1="70" y1="95" x2="100" y2="95" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="50" y="130" fontSize="14" fill="#E65100" fontWeight="bold">B₀</text>
          <line x1="70" y1="125" x2="100" y2="125" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="50" y="165" fontSize="14" fill="#E65100" fontWeight="bold">C₀</text>
          <line x1="70" y1="160" x2="100" y2="160" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="250" y="100" fontSize="14" fill="#E65100" fontWeight="bold">A₁</text>
          <line x1="270" y1="95" x2="300" y2="95" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="250" y="130" fontSize="14" fill="#E65100" fontWeight="bold">B₁</text>
          <line x1="270" y1="125" x2="300" y2="125" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="450" y="100" fontSize="14" fill="#E65100" fontWeight="bold">A₂</text>
          <line x1="470" y1="95" x2="500" y2="95" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          <text x="450" y="130" fontSize="14" fill="#E65100" fontWeight="bold">B₂</text>
          <line x1="470" y1="125" x2="500" y2="125" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

          {/* Output labels */}
          <text x="260" y="140" fontSize="14" fill="#2E7D32" fontWeight="bold">S₀</text>
          <text x="460" y="140" fontSize="14" fill="#2E7D32" fontWeight="bold">S₁</text>
          <text x="660" y="140" fontSize="14" fill="#2E7D32" fontWeight="bold">S₂</text>

          <text x="675" y="215" fontSize="14" fill="#2E7D32" fontWeight="bold">C₃</text>
          <line x1="675" y1="200" x2="675" y2="250" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
        </>
      ),
    },
  },
};

export default function CircuitDiagram({ type }) {
  const circuit = circuits[type];

  if (!circuit) {
    return <div>Unknown circuit type: {type}</div>;
  }

  return (
    <div className={styles.circuitContainer}>
      <svg
        width={circuit.width}
        height={circuit.height}
        viewBox={`0 0 ${circuit.width} ${circuit.height}`}
        className={styles.circuit}
      >
        <LogicGates />

        {/* Render wires first (so they appear behind gates) */}
        {circuit.elements.wires?.map((wire, idx) => (
          <Wire key={`wire-${idx}`} {...wire} />
        ))}

        {/* Render junctions */}
        {circuit.elements.junctions?.map((junction, idx) => (
          <Junction key={`junction-${idx}`} {...junction} />
        ))}

        {/* Render gates */}
        {circuit.elements.gates?.map((gate, idx) => (
          <Gate key={`gate-${idx}`} {...gate} />
        ))}

        {/* Render custom elements (for ripple-carry adder) */}
        {circuit.elements.custom}
      </svg>
    </div>
  );
}
