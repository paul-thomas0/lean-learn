import { motion } from 'framer-motion';

const layers = [
  { label: 'JavaScript (Your Code)', sublabel: 'Express, Next.js, scripts, modules', color: '#10b981', y: 50 },
  { label: 'Node.js Standard Library', sublabel: 'fs, http, path, crypto, stream, events', color: '#3b82f6', y: 120 },
  { label: 'Node.js C++ Bindings', sublabel: 'node::Environment, N-API, internal bindings', color: '#8b5cf6', y: 190 },
  { label: 'V8 + libuv', sublabel: 'JS engine + async I/O event loop', color: '#f59e0b', y: 260 },
  { label: 'Operating System', sublabel: 'epoll (Linux), kqueue (macOS), IOCP (Windows)', color: '#ef4444', y: 330 },
];

const layerWidth = 420;
const layerHeight = 55;
const startX = 40;

export default function NodeArchDiagram() {
  return (
    <svg
      viewBox="0 0 500 400"
      className="w-full max-w-lg mx-auto"
      aria-label="Node.js layered architecture diagram showing JavaScript code at the top, through Node.js Standard Library, C++ Bindings, V8 and libuv, down to the Operating System"
    >
      <rect width="500" height="400" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="250" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Node.js Architecture
      </text>

      {/* Side labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <text x="480" y="85" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace" transform="rotate(90, 480, 200)">
          Higher-level → Lower-level
        </text>
      </motion.g>

      {/* Layers */}
      {layers.map((layer, i) => (
        <motion.g
          key={layer.label}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15 + 0.2, duration: 0.5, type: 'spring', stiffness: 150 }}
        >
          {/* Layer rectangle */}
          <rect
            x={startX}
            y={layer.y}
            width={layerWidth}
            height={layerHeight}
            rx="8"
            fill={layer.color + '12'}
            stroke={layer.color}
            strokeWidth="1.5"
          />

          {/* Label */}
          <text
            x={startX + layerWidth / 2}
            y={layer.y + 22}
            textAnchor="middle"
            fill={layer.color}
            fontSize="12"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {layer.label}
          </text>
          <text
            x={startX + layerWidth / 2}
            y={layer.y + 40}
            textAnchor="middle"
            fill="#64748b"
            fontSize="9"
            fontFamily="monospace"
          >
            {layer.sublabel}
          </text>

          {/* Down arrow between layers */}
          {i < layers.length - 1 && (
            <motion.line
              x1={startX + layerWidth / 2}
              y1={layer.y + layerHeight}
              x2={startX + layerWidth / 2}
              y2={layer.y + layerHeight + 15}
              stroke="#1e293b"
              strokeWidth="2"
              markerEnd="url(#nodeArchArrow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 + 0.4 }}
            />
          )}
        </motion.g>
      ))}

      {/* V8 + libuv split detail */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        {/* V8 sub-box */}
        <rect
          x={startX + 8}
          y={layers[3].y + 6}
          width={layerWidth / 2 - 16}
          height={layerHeight - 12}
          rx="5"
          fill="#f59e0b"
          fillOpacity="0.06"
          stroke="#f59e0b"
          strokeWidth="0.5"
          strokeDasharray="3 2"
        />
        <text
          x={startX + layerWidth / 4}
          y={layers[3].y + 28}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="10"
          fontFamily="monospace"
        >
          V8 (C++)
        </text>
        <text
          x={startX + layerWidth / 4}
          y={layers[3].y + 42}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          JS execution, GC
        </text>

        {/* libuv sub-box */}
        <rect
          x={startX + layerWidth / 2 + 8}
          y={layers[3].y + 6}
          width={layerWidth / 2 - 16}
          height={layerHeight - 12}
          rx="5"
          fill="#3b82f6"
          fillOpacity="0.06"
          stroke="#3b82f6"
          strokeWidth="0.5"
          strokeDasharray="3 2"
        />
        <text
          x={startX + (3 * layerWidth) / 4}
          y={layers[3].y + 28}
          textAnchor="middle"
          fill="#3b82f6"
          fontSize="10"
          fontFamily="monospace"
        >
          libuv (C)
        </text>
        <text
          x={startX + (3 * layerWidth) / 4}
          y={layers[3].y + 42}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          Async I/O, event loop
        </text>
      </motion.g>

      <defs>
        <marker id="nodeArchArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
        </marker>
      </defs>
    </svg>
  );
}
