import { motion } from 'framer-motion';

const phases = [
  { label: 'Timers', angle: -90, color: '#3b82f6', desc: 'setTimeout, setInterval' },
  { label: 'Pending CB', angle: -30, color: '#8b5cf6', desc: 'I/O callbacks deferred' },
  { label: 'Idle/Prepare', angle: 30, color: '#64748b', desc: 'Internal use only' },
  { label: 'Poll', angle: 90, color: '#10b981', desc: 'Retrieve new I/O events' },
  { label: 'Check', angle: 150, color: '#f59e0b', desc: 'setImmediate callbacks' },
  { label: 'Close CB', angle: 210, color: '#ef4444', desc: 'socket.on(\'close\')' },
];

const centerX = 200;
const centerY = 195;
const radius = 125;
const nodeRadius = 42;

function polarToCartesian(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: centerX + r * Math.cos(rad), y: centerY + r * Math.sin(rad) };
}

export default function LibuvEventLoopDiagram() {
  // Microtask drain points (between every phase)
  const microtaskPoints = phases.map((phase, i) => {
    const nextPhase = phases[(i + 1) % phases.length];
    let midAngle = (phase.angle + nextPhase.angle) / 2;
    if (nextPhase.angle < phase.angle) midAngle = (phase.angle + nextPhase.angle + 360) / 2;
    return polarToCartesian(midAngle, radius + 8);
  });

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto"
      aria-label="libuv event loop diagram with six phases arranged in a circle: Timers, Pending Callbacks, Idle/Prepare, Poll, Check, and Close Callbacks, with microtask drain points between each phase"
    >
      <rect width="400" height="400" fill="#12121a" rx="8" />

      {/* Title */}
      <text x={centerX} y="24" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        libuv Event Loop Phases
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
        transition={{ duration: 1, delay: 0.1 }}
      />

      {/* Direction arrows on track */}
      {phases.map((phase, i) => {
        const nextPhase = phases[(i + 1) % phases.length];
        let midAngle = (phase.angle + nextPhase.angle) / 2;
        if (nextPhase.angle < phase.angle) midAngle = (phase.angle + nextPhase.angle + 360) / 2;
        const p = polarToCartesian(midAngle, radius);
        return (
          <motion.text
            key={`dir-${i}`}
            x={p.x}
            y={p.y + 4}
            textAnchor="middle"
            fill="#1e293b"
            fontSize="10"
            fontFamily="monospace"
            transform={`rotate(${midAngle + 90}, ${p.x}, ${p.y})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1 + i * 0.08 }}
          >
            {'\u25B6'}
          </motion.text>
        );
      })}

      {/* Microtask drain markers */}
      {microtaskPoints.map((p, i) => (
        <motion.g
          key={`micro-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 + i * 0.08 }}
        >
          <circle cx={p.x} cy={p.y} r="3" fill="#8b5cf6" fillOpacity="0.6" />
        </motion.g>
      ))}

      {/* Phase nodes */}
      {phases.map((phase, i) => {
        const pos = polarToCartesian(phase.angle, radius);
        return (
          <motion.g
            key={phase.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.12, type: 'spring', stiffness: 200 }}
          >
            <circle
              cx={pos.x}
              cy={pos.y}
              r={nodeRadius}
              fill={phase.color + '15'}
              stroke={phase.color}
              strokeWidth="2"
            />
            <text
              x={pos.x}
              y={pos.y - 5}
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
              y={pos.y + 9}
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
        transition={{ delay: 1 }}
      >
        <text x={centerX} y={centerY - 10} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
          libuv
        </text>
        <text x={centerX} y={centerY + 5} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontFamily="monospace" fontWeight="bold">
          Event Loop
        </text>
        <text x={centerX} y={centerY + 20} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          (one iteration)
        </text>
      </motion.g>

      {/* Animated dot */}
      <motion.circle
        r="5"
        fill="#e2e8f0"
        filter="url(#libuvGlow)"
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

      {/* Legend */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <circle cx="115" cy="370" r="3" fill="#8b5cf6" fillOpacity="0.6" />
        <text x="124" y="373" fill="#8b5cf6" fontSize="8" fontFamily="monospace">
          = microtask drain (process.nextTick, Promises)
        </text>

        <text x={centerX} y="390" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          Poll phase blocks when queue is empty, waiting for I/O
        </text>
      </motion.g>

      <defs>
        <filter id="libuvGlow" x="-50%" y="-50%" width="200%" height="200%">
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
