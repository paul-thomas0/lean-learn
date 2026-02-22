import { motion } from 'framer-motion';

const jsLines = [
  { text: 'function add(a, b) {', y: 60 },
  { text: '  let x = a + 1;', y: 82, varId: 'x1' },
  { text: '  x = x + b;', y: 104, varId: 'x2' },
  { text: '  if (b > 0) {', y: 126 },
  { text: '    x = x * 2;', y: 148, varId: 'x3' },
  { text: '  }', y: 170 },
  { text: '  return x;', y: 192, varId: 'x4' },
  { text: '}', y: 214 },
];

const ssaLines = [
  { text: 'function add(a₀, b₀) {', y: 60 },
  { text: '  x₁ = a₀ + 1', y: 82, varId: 'x1' },
  { text: '  x₂ = x₁ + b₀', y: 104, varId: 'x2' },
  { text: '  if (b₀ > 0) {', y: 126 },
  { text: '    x₃ = x₂ * 2', y: 148, varId: 'x3' },
  { text: '  }', y: 170 },
  { text: '  x₄ = φ(x₂, x₃)', y: 192, varId: 'x4', isPhi: true },
  { text: '  return x₄', y: 214 },
  { text: '}', y: 236 },
];

const connections: Array<{ fromVar: string; jsY: number; ssaY: number }> = [
  { fromVar: 'x1', jsY: 82, ssaY: 82 },
  { fromVar: 'x2', jsY: 104, ssaY: 104 },
  { fromVar: 'x3', jsY: 148, ssaY: 148 },
  { fromVar: 'x4', jsY: 192, ssaY: 192 },
];

export default function SSAVisualizer() {
  return (
    <svg
      viewBox="0 0 600 300"
      className="w-full max-w-2xl mx-auto"
      aria-label="SSA visualization showing JavaScript code on the left transformed to Static Single Assignment form on the right, with phi functions at merge points"
    >
      <rect width="600" height="300" fill="#12121a" rx="8" />

      {/* Headers */}
      <motion.text
        x={130}
        y={32}
        textAnchor="middle"
        fill="#3b82f6"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        JavaScript
      </motion.text>
      <motion.text
        x={460}
        y={32}
        textAnchor="middle"
        fill="#10b981"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        SSA Form
      </motion.text>

      {/* Divider */}
      <line x1="295" y1="20" x2="295" y2="280" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 3" />

      {/* JS code panel background */}
      <rect x="15" y="42" width="265" height="220" rx="6" fill="#12121a" stroke="#1e293b" strokeWidth="1" />

      {/* SSA code panel background */}
      <rect x="310" y="42" width="275" height="220" rx="6" fill="#12121a" stroke="#1e293b" strokeWidth="1" />

      {/* JS lines */}
      {jsLines.map((line, i) => (
        <motion.text
          key={`js-${i}`}
          x={30}
          y={line.y}
          fill={line.varId ? '#e2e8f0' : '#64748b'}
          fontSize="11"
          fontFamily="monospace"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 + 0.2 }}
        >
          {line.text}
        </motion.text>
      ))}

      {/* SSA lines */}
      {ssaLines.map((line, i) => (
        <motion.text
          key={`ssa-${i}`}
          x={325}
          y={line.y}
          fill={line.isPhi ? '#f59e0b' : line.varId ? '#e2e8f0' : '#64748b'}
          fontSize="11"
          fontFamily="monospace"
          fontWeight={line.isPhi ? 'bold' : 'normal'}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 + 0.4 }}
        >
          {line.text}
        </motion.text>
      ))}

      {/* Connecting lines */}
      {connections.map((conn, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={270}
          y1={conn.jsY - 4}
          x2={320}
          y2={conn.ssaY - 4}
          stroke="#8b5cf6"
          strokeWidth="1"
          strokeOpacity="0.5"
          strokeDasharray="3 2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: i * 0.15 + 0.8, duration: 0.4 }}
        />
      ))}

      {/* Phi function annotation */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <rect x="380" y="258" width="200" height="22" rx="4" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="0.5" />
        <text x="480" y="273" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">
          φ merges values at control flow joins
        </text>
      </motion.g>

      {/* Legend */}
      <motion.text
        x={300}
        y={290}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Each variable assigned exactly once in SSA
      </motion.text>
    </svg>
  );
}
