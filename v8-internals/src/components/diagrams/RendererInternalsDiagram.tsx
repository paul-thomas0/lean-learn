import { motion } from 'framer-motion';

const pipelineStages = [
  { label: 'DOM', x: 30, color: '#3b82f6' },
  { label: 'Style', x: 120, color: '#8b5cf6' },
  { label: 'Layout', x: 210, color: '#f59e0b' },
  { label: 'Paint', x: 300, color: '#ef4444' },
  { label: 'Composite', x: 390, color: '#10b981' },
];

export default function RendererInternalsDiagram() {
  return (
    <svg
      viewBox="0 0 600 350"
      className="w-full max-w-2xl mx-auto"
      aria-label="Inside a Chrome renderer process showing Blink and V8 engines, Main Thread and Compositor Thread, and the rendering pipeline from DOM through Style, Layout, Paint, and Composite"
    >
      <rect width="600" height="350" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="300" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Inside a Renderer Process
      </text>

      {/* Process boundary */}
      <motion.rect
        x="15"
        y="35"
        width="570"
        height="280"
        rx="10"
        fill="none"
        stroke="#1e293b"
        strokeWidth="2"
        strokeDasharray="6 3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      />
      <motion.text
        x="300"
        y="52"
        textAnchor="middle"
        fill="#64748b"
        fontSize="10"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Renderer Process (sandboxed)
      </motion.text>

      {/* Blink box */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <rect x="30" y="65" width="250" height="90" rx="8" fill="#3b82f6" fillOpacity="0.08" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="155" y="85" textAnchor="middle" fill="#3b82f6" fontSize="14" fontFamily="monospace" fontWeight="bold">
          Blink
        </text>
        <text x="155" y="102" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          Rendering engine
        </text>
        <text x="155" y="118" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          DOM, CSS, Layout, Paint
        </text>
        <text x="155" y="132" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          HTML parser, Web APIs
        </text>
      </motion.g>

      {/* V8 box */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <rect x="310" y="65" width="260" height="90" rx="8" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="1.5" />
        <text x="440" y="85" textAnchor="middle" fill="#10b981" fontSize="14" fontFamily="monospace" fontWeight="bold">
          V8
        </text>
        <text x="440" y="102" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          JavaScript engine
        </text>
        <text x="440" y="118" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          Ignition, TurboFan
        </text>
        <text x="440" y="132" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          GC (Orinoco), WebAssembly
        </text>
      </motion.g>

      {/* Blink <-> V8 connection */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <line x1="280" y1="105" x2="310" y2="105" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rendArrow)" />
        <line x1="310" y1="115" x2="280" y2="115" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#rendArrow)" />
        <text x="295" y="98" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
          Bindings
        </text>
      </motion.g>

      {/* Main Thread */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <rect x="30" y="170" width="540" height="35" rx="6" fill="#f59e0b" fillOpacity="0.06" stroke="#f59e0b" strokeWidth="1" />
        <text x="300" y="192" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
          Main Thread (JS execution, DOM, Style, Layout, Paint)
        </text>
      </motion.g>

      {/* Compositor Thread */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <rect x="30" y="215" width="540" height="30" rx="6" fill="#8b5cf6" fillOpacity="0.06" stroke="#8b5cf6" strokeWidth="1" />
        <text x="300" y="234" textAnchor="middle" fill="#8b5cf6" fontSize="11" fontFamily="monospace" fontWeight="bold">
          Compositor Thread (Tiling, Raster, GPU submission)
        </text>
      </motion.g>

      {/* Rendering pipeline */}
      <motion.text
        x="300"
        y="265"
        textAnchor="middle"
        fill="#e2e8f0"
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        Rendering Pipeline
      </motion.text>

      {pipelineStages.map((stage, i) => (
        <motion.g
          key={stage.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.12, duration: 0.35 }}
        >
          <rect
            x={stage.x}
            y={275}
            width={78}
            height={30}
            rx="6"
            fill={stage.color + '18'}
            stroke={stage.color}
            strokeWidth="1.5"
          />
          <text
            x={stage.x + 39}
            y={294}
            textAnchor="middle"
            fill={stage.color}
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {stage.label}
          </text>
          {i < pipelineStages.length - 1 && (
            <line
              x1={stage.x + 78}
              y1={290}
              x2={pipelineStages[i + 1].x}
              y2={290}
              stroke="#1e293b"
              strokeWidth="2"
              markerEnd="url(#rendArrow)"
            />
          )}
        </motion.g>
      ))}

      {/* GPU label at end */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <text x="510" y="294" fill="#64748b" fontSize="9" fontFamily="monospace">
          → GPU
        </text>
      </motion.g>

      {/* Bottom note */}
      <motion.text
        x="300"
        y="335"
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        Compositor can scroll/animate independently of main thread
      </motion.text>

      <defs>
        <marker id="rendArrow" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
          <polygon points="0 0, 7 2.5, 0 5" fill="#1e293b" />
        </marker>
      </defs>
    </svg>
  );
}
