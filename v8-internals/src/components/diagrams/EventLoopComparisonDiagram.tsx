import { motion } from 'framer-motion';

const browserPhases = [
  { label: 'Task Queue', y: 70, color: '#3b82f6' },
  { label: 'Microtasks', y: 115, color: '#8b5cf6' },
  { label: 'rAF callbacks', y: 160, color: '#10b981' },
  { label: 'Style / Layout', y: 205, color: '#f59e0b' },
  { label: 'Paint', y: 250, color: '#ef4444' },
];

const nodePhases = [
  { label: 'Timers', y: 55, color: '#3b82f6' },
  { label: 'Pending I/O CB', y: 90, color: '#8b5cf6' },
  { label: 'Idle / Prepare', y: 125, color: '#64748b' },
  { label: 'Poll (I/O)', y: 160, color: '#10b981' },
  { label: 'Check (setImmediate)', y: 195, color: '#f59e0b' },
  { label: 'Close Callbacks', y: 230, color: '#ef4444' },
  { label: 'Microtasks drain ↺', y: 265, color: '#8b5cf6' },
];


export default function EventLoopComparisonDiagram() {
  const leftX = 15;
  const rightX = 365;
  const boxWidth = 310;
  const phaseBoxWidth = 280;
  const phaseHeight = 28;

  return (
    <svg
      viewBox="0 0 700 350"
      className="w-full max-w-3xl mx-auto"
      aria-label="Side-by-side comparison of Browser event loop and Node.js event loop showing their different phases and key differences"
    >
      <rect width="700" height="350" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="350" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Event Loop: Browser vs Node.js
      </text>

      {/* Divider */}
      <line x1="350" y1="30" x2="350" y2="320" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 3" />

      {/* Browser side */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect x={leftX} y="34" width={boxWidth} height="275" rx="8" fill="#3b82f6" fillOpacity="0.04" stroke="#1e293b" strokeWidth="1" />
        <text x={leftX + boxWidth / 2} y="52" textAnchor="middle" fill="#3b82f6" fontSize="12" fontFamily="monospace" fontWeight="bold">
          Browser Event Loop
        </text>
      </motion.g>

      {browserPhases.map((phase, i) => (
        <motion.g
          key={`bp-${i}`}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
        >
          <rect
            x={leftX + 15}
            y={phase.y}
            width={phaseBoxWidth}
            height={phaseHeight}
            rx="5"
            fill={phase.color + '15'}
            stroke={phase.color}
            strokeWidth="1"
          />
          <text
            x={leftX + 15 + phaseBoxWidth / 2}
            y={phase.y + 18}
            textAnchor="middle"
            fill={phase.color}
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {phase.label}
          </text>

          {/* Arrow to next */}
          {i < browserPhases.length - 1 && (
            <line
              x1={leftX + 15 + phaseBoxWidth / 2}
              y1={phase.y + phaseHeight}
              x2={leftX + 15 + phaseBoxWidth / 2}
              y2={browserPhases[i + 1].y}
              stroke="#1e293b"
              strokeWidth="1.5"
              markerEnd="url(#compArrow)"
            />
          )}
        </motion.g>
      ))}

      {/* Loop-back arrow for browser */}
      <motion.path
        d={`M ${leftX + 15 + phaseBoxWidth / 2} ${browserPhases[browserPhases.length - 1].y + phaseHeight}
            Q ${leftX + 15 + phaseBoxWidth / 2} ${browserPhases[browserPhases.length - 1].y + phaseHeight + 20},
              ${leftX + phaseBoxWidth + 15} ${browserPhases[browserPhases.length - 1].y + phaseHeight + 20}
            L ${leftX + phaseBoxWidth + 20} ${browserPhases[0].y + phaseHeight / 2}
            Q ${leftX + phaseBoxWidth + 20} ${browserPhases[0].y + 5},
              ${leftX + 15 + phaseBoxWidth} ${browserPhases[0].y + phaseHeight / 2}`}
        fill="none"
        stroke="#64748b"
        strokeWidth="1"
        strokeDasharray="4 2"
        markerEnd="url(#compArrowGray)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1 }}
      />

      {/* Node side */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <rect x={rightX} y="34" width={boxWidth} height="275" rx="8" fill="#10b981" fillOpacity="0.04" stroke="#1e293b" strokeWidth="1" />
        <text x={rightX + boxWidth / 2} y="52" textAnchor="middle" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
          Node.js Event Loop
        </text>
      </motion.g>

      {nodePhases.map((phase, i) => (
        <motion.g
          key={`np-${i}`}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
        >
          <rect
            x={rightX + 15}
            y={phase.y}
            width={phaseBoxWidth}
            height={phaseHeight}
            rx="5"
            fill={phase.color + '15'}
            stroke={phase.color}
            strokeWidth="1"
          />
          <text
            x={rightX + 15 + phaseBoxWidth / 2}
            y={phase.y + 18}
            textAnchor="middle"
            fill={phase.color}
            fontSize="10"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {phase.label}
          </text>

          {/* Arrow to next */}
          {i < nodePhases.length - 1 && (
            <line
              x1={rightX + 15 + phaseBoxWidth / 2}
              y1={phase.y + phaseHeight}
              x2={rightX + 15 + phaseBoxWidth / 2}
              y2={nodePhases[i + 1].y}
              stroke="#1e293b"
              strokeWidth="1.5"
              markerEnd="url(#compArrow)"
            />
          )}
        </motion.g>
      ))}

      {/* Key differences */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* Browser highlight: has rendering */}
        <rect x={leftX + 15} y={browserPhases[2].y - 2} width={phaseBoxWidth} height={browserPhases[4].y + phaseHeight - browserPhases[2].y + 4} rx="6" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x={leftX + 15 + phaseBoxWidth + 5} y={(browserPhases[2].y + browserPhases[4].y + phaseHeight) / 2 + 3} fill="#10b981" fontSize="7" fontFamily="monospace" transform={`rotate(90, ${leftX + 15 + phaseBoxWidth + 5}, ${(browserPhases[2].y + browserPhases[4].y + phaseHeight) / 2})`}>
          Rendering
        </text>
      </motion.g>

      {/* Bottom comparison notes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <text x={leftX + boxWidth / 2} y="325" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="monospace">
          Single task queue + rendering pipeline
        </text>
        <text x={rightX + boxWidth / 2} y="325" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily="monospace">
          6 phases + microtask drain between each
        </text>
      </motion.g>

      {/* Footer */}
      <motion.text
        x="350"
        y="345"
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Both drain microtasks between tasks, but Node has explicit phases for I/O
      </motion.text>

      <defs>
        <marker id="compArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#1e293b" />
        </marker>
        <marker id="compArrowGray" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#64748b" />
        </marker>
      </defs>
    </svg>
  );
}
