import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const stages = [
  { id: 'source', label: 'Source Code', color: '#64748b', y: 10, detail: 'Raw JavaScript/TypeScript source text fed into V8.' },
  { id: 'parser', label: 'Parser', color: '#64748b', y: 80, detail: 'Tokenizes and parses source into an Abstract Syntax Tree.' },
  { id: 'ast', label: 'AST', color: '#64748b', y: 150, detail: 'Tree representation of the program structure.' },
  { id: 'ignition', label: 'Ignition (Bytecode)', color: '#3b82f6', y: 220, detail: 'V8\'s interpreter. Generates and executes bytecode. Collects type feedback for optimization.' },
  { id: 'sparkplug', label: 'Sparkplug (Baseline)', color: '#8b5cf6', y: 290, detail: 'Non-optimizing compiler. Quickly compiles bytecode to machine code without heavy analysis.' },
  { id: 'maglev', label: 'Maglev (Mid-Tier)', color: '#f59e0b', y: 360, detail: 'Mid-tier optimizing compiler. Faster compilation than TurboFan with moderate optimizations.' },
  { id: 'turbofan', label: 'TurboFan (Optimized)', color: '#10b981', y: 430, detail: 'Full optimizing compiler. Sea-of-nodes IR, speculative optimizations, inlining, escape analysis.' },
];

const boxWidth = 240;
const boxHeight = 44;
const centerX = 200;

export default function PipelineDiagram() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 400 600"
      className="w-full max-w-md mx-auto"
      aria-label="V8 compilation pipeline diagram showing stages from Source Code through Parser, AST, Ignition, Sparkplug, Maglev, and TurboFan, with a deoptimization path back from TurboFan to Ignition"
    >
      <rect width="400" height="600" fill="#12121a" rx="8" />

      {/* Title */}
      <text x={centerX} y="560" textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">
        V8 Compilation Pipeline
      </text>

      {/* Arrows between stages */}
      {stages.slice(0, -1).map((stage, i) => {
        const next = stages[i + 1];
        return (
          <motion.line
            key={`arrow-${stage.id}`}
            x1={centerX}
            y1={stage.y + boxHeight}
            x2={centerX}
            y2={next.y}
            stroke="#1e293b"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: i * 0.12 + 0.1, duration: 0.3 }}
          />
        );
      })}

      {/* Deoptimization arrow (TurboFan → Ignition) */}
      <motion.path
        d={`M ${centerX + boxWidth / 2 + 5} ${stages[6].y + boxHeight / 2}
            C ${centerX + boxWidth / 2 + 60} ${stages[6].y + boxHeight / 2},
              ${centerX + boxWidth / 2 + 60} ${stages[3].y + boxHeight / 2},
              ${centerX + boxWidth / 2 + 5} ${stages[3].y + boxHeight / 2}`}
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="6 4"
        markerEnd="url(#arrowheadRed)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.text
        x={centerX + boxWidth / 2 + 48}
        y={(stages[6].y + stages[3].y) / 2 + boxHeight / 2}
        fill="#ef4444"
        fontSize="9"
        fontFamily="monospace"
        textAnchor="middle"
        transform={`rotate(-90, ${centerX + boxWidth / 2 + 48}, ${(stages[6].y + stages[3].y) / 2 + boxHeight / 2})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Deoptimization
      </motion.text>

      {/* Stage boxes */}
      {stages.map((stage, i) => (
        <motion.g
          key={stage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.4 }}
          style={{ cursor: 'pointer' }}
          onClick={() => setSelected(selected === stage.id ? null : stage.id)}
        >
          <rect
            x={centerX - boxWidth / 2}
            y={stage.y}
            width={boxWidth}
            height={boxHeight}
            rx="8"
            fill={selected === stage.id ? stage.color + '33' : '#12121a'}
            stroke={stage.color}
            strokeWidth={selected === stage.id ? 2.5 : 1.5}
          />
          <text
            x={centerX}
            y={stage.y + boxHeight / 2 + 5}
            textAnchor="middle"
            fill="#e2e8f0"
            fontSize="13"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {stage.label}
          </text>
        </motion.g>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {selected && (() => {
          const stage = stages.find(s => s.id === selected)!;
          const tooltipY = stage.y - 40;
          return (
            <motion.g
              key="tooltip"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
            >
              <rect
                x={20}
                y={Math.max(5, tooltipY)}
                width={360}
                height="30"
                rx="6"
                fill="#1e293b"
                stroke={stage.color}
                strokeWidth="1"
              />
              <text
                x={centerX}
                y={Math.max(5, tooltipY) + 19}
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="9"
                fontFamily="monospace"
              >
                {stage.detail}
              </text>
            </motion.g>
          );
        })()}
      </AnimatePresence>

      {/* Arrowhead markers */}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
        </marker>
        <marker id="arrowheadRed" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#ef4444" />
        </marker>
      </defs>
    </svg>
  );
}
