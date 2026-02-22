import { motion } from 'framer-motion';

const phases = [
  { label: 'Task Queue', angle: -90, color: '#3b82f6', desc: 'setTimeout, events, etc.' },
  { label: 'Microtasks', angle: -30, color: '#8b5cf6', desc: 'Promises, queueMicrotask' },
  { label: 'rAF', angle: 30, color: '#10b981', desc: 'requestAnimationFrame' },
  { label: 'Style/Layout', angle: 90, color: '#f59e0b', desc: 'Recalc styles, reflow' },
  { label: 'Paint', angle: 150, color: '#ef4444', desc: 'Rasterize & composite' },
  { label: 'Idle', angle: 210, color: '#64748b', desc: 'requestIdleCallback' },
];

const centerX = 200;
const centerY = 200;
const radius = 130;
const nodeRadius = 40;

function polarToCartesian(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: centerX + r * Math.cos(rad), y: centerY + r * Math.sin(rad) };
}

export default function BrowserEventLoopDiagram() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto"
      aria-label="Browser event loop diagram showing circular phases: Task Queue, Microtasks, requestAnimationFrame, Style and Layout, Paint, and Idle, with an animated dot traveling around the loop"
    >
      <rect width="400" height="400" fill="#12121a" rx="8" />

      {/* Title */}
      <text x={centerX} y="24" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Browser Event Loop
      </text>

      {/* Circular track */}
      <motion.circle
        cx={centerX}
        cy={centerY}
        r={radius}
        fill="none"
        stroke="#1e293b"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Directional arrows on the track */}
      {phases.map((phase, i) => {
        const nextPhase = phases[(i + 1) % phases.length];
        const midAngle = (phase.angle + nextPhase.angle + (nextPhase.angle < phase.angle ? 360 : 0)) / 2;
        const p = polarToCartesian(midAngle, radius);
        const tangentAngle = midAngle + 90;
        return (
          <motion.g
            key={`arrow-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8 + i * 0.1 }}
          >
            <text
              x={p.x}
              y={p.y + 4}
              textAnchor="middle"
              fill="#64748b"
              fontSize="10"
              fontFamily="monospace"
              transform={`rotate(${tangentAngle}, ${p.x}, ${p.y})`}
            >
              {'\u25B6'}
            </text>
          </motion.g>
        );
      })}

      {/* Phase nodes */}
      {phases.map((phase, i) => {
        const pos = polarToCartesian(phase.angle, radius);
        return (
          <motion.g
            key={phase.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200 }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill={phase.color + '18'}
              stroke={phase.color}
              strokeWidth="2"
            />
            <text
              x={pos.x}
              y={pos.y - 4}
              textAnchor="middle"
              fill={phase.color}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {phase.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + 10}
              textAnchor="middle"
              fill="#64748b"
              fontSize="7"
              fontFamily="monospace"
            >
              {phase.desc}
            </text>
          </motion.g>
        );
      })}

      {/* Center label */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <text x={centerX} y={centerY - 6} textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace" fontWeight="bold">
          Event
        </text>
        <text x={centerX} y={centerY + 10} textAnchor="middle" fill="#e2e8f0" fontSize="11" fontFamily="monospace" fontWeight="bold">
          Loop
        </text>
      </motion.g>

      {/* Animated dot traveling the loop */}
      <motion.circle
        r="6"
        fill="#e2e8f0"
        filter="url(#glow)"
        animate={{
          cx: phases.map((p) => polarToCartesian(p.angle, radius).x),
          cy: phases.map((p) => polarToCartesian(p.angle, radius).y),
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
          times: phases.map((_, i) => i / phases.length),
        }}
      />

      {/* Bottom note */}
      <motion.text
        x={centerX}
        y="385"
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        One iteration ≈ 16.6ms at 60fps | Microtasks drain after every task
      </motion.text>

      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
