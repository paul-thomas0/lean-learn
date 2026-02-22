import { motion } from 'framer-motion';

const operations = [
  { label: 'dns.lookup()', y: 45, color: '#3b82f6' },
  { label: 'fs.readFile()', y: 95, color: '#10b981' },
  { label: 'crypto.pbkdf2()', y: 145, color: '#f59e0b' },
  { label: 'zlib.deflate()', y: 195, color: '#8b5cf6' },
];

const workers = [
  { label: 'Worker 1', y: 45 },
  { label: 'Worker 2', y: 105 },
  { label: 'Worker 3', y: 165 },
  { label: 'Worker 4', y: 225 },
];

const mainThreadX = 30;
const mainThreadWidth = 150;
const poolX = 370;
const poolWidth = 200;
const workerHeight = 40;

export default function ThreadPoolDiagram() {
  return (
    <svg
      viewBox="0 0 600 300"
      className="w-full max-w-2xl mx-auto"
      aria-label="Node.js thread pool diagram showing the main thread on the left connected to four worker threads on the right, with labeled operations like dns.lookup, fs.readFile, crypto, and zlib routing to the thread pool"
    >
      <rect width="600" height="300" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="300" y="22" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        libuv Thread Pool
      </text>

      {/* Main Thread box */}
      <motion.g
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <rect
          x={mainThreadX}
          y={35}
          width={mainThreadWidth}
          height={230}
          rx="10"
          fill="#3b82f6"
          fillOpacity="0.06"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text
          x={mainThreadX + mainThreadWidth / 2}
          y={55}
          textAnchor="middle"
          fill="#3b82f6"
          fontSize="12"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Main Thread
        </text>
        <text
          x={mainThreadX + mainThreadWidth / 2}
          y={72}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          (Event Loop)
        </text>

        {/* Event loop icon */}
        <circle cx={mainThreadX + mainThreadWidth / 2} cy={140} r="35" fill="none" stroke="#1e293b" strokeWidth="1.5" />
        <motion.circle
          r="4"
          fill="#3b82f6"
          animate={{
            cx: [
              mainThreadX + mainThreadWidth / 2 + 35,
              mainThreadX + mainThreadWidth / 2,
              mainThreadX + mainThreadWidth / 2 - 35,
              mainThreadX + mainThreadWidth / 2,
              mainThreadX + mainThreadWidth / 2 + 35,
            ],
            cy: [
              140,
              140 - 35,
              140,
              140 + 35,
              140,
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />

        <text
          x={mainThreadX + mainThreadWidth / 2}
          y={200}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          JS, callbacks,
        </text>
        <text
          x={mainThreadX + mainThreadWidth / 2}
          y={212}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          networking I/O
        </text>

        <text
          x={mainThreadX + mainThreadWidth / 2}
          y={245}
          textAnchor="middle"
          fill="#64748b"
          fontSize="7"
          fontFamily="monospace"
        >
          Single-threaded
        </text>
      </motion.g>

      {/* Thread Pool box */}
      <motion.g
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <rect
          x={poolX}
          y={35}
          width={poolWidth}
          height={230}
          rx="10"
          fill="#f59e0b"
          fillOpacity="0.06"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        <text
          x={poolX + poolWidth / 2}
          y={55}
          textAnchor="middle"
          fill="#f59e0b"
          fontSize="12"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Thread Pool
        </text>
        <text
          x={poolX + poolWidth / 2}
          y={72}
          textAnchor="middle"
          fill="#64748b"
          fontSize="8"
          fontFamily="monospace"
        >
          (UV_THREADPOOL_SIZE=4)
        </text>

        {/* Worker threads */}
        {workers.map((worker, i) => (
          <motion.g
            key={worker.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
          >
            <rect
              x={poolX + 15}
              y={worker.y + 40}
              width={poolWidth - 30}
              height={workerHeight}
              rx="6"
              fill="#f59e0b"
              fillOpacity="0.1"
              stroke="#f59e0b"
              strokeWidth="1"
            />
            <text
              x={poolX + poolWidth / 2}
              y={worker.y + 65}
              textAnchor="middle"
              fill="#f59e0b"
              fontSize="10"
              fontFamily="monospace"
            >
              {worker.label}
            </text>
          </motion.g>
        ))}
      </motion.g>

      {/* Operation labels and routing arrows */}
      {operations.map((op, i) => {
        const arrowStartX = mainThreadX + mainThreadWidth;
        const arrowEndX = poolX;
        const labelX = (arrowStartX + arrowEndX) / 2;
        const arrowY = op.y + 55;

        return (
          <motion.g
            key={op.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
          >
            {/* Arrow line */}
            <line
              x1={arrowStartX + 5}
              y1={arrowY}
              x2={arrowEndX - 5}
              y2={workers[i].y + 60}
              stroke={op.color}
              strokeWidth="1.5"
              strokeDasharray="4 2"
              markerEnd={`url(#tpArrow-${i})`}
            />

            {/* Operation label */}
            <rect
              x={labelX - 55}
              y={arrowY - 12}
              width={110}
              height={18}
              rx="4"
              fill={op.color + '18'}
              stroke={op.color}
              strokeWidth="0.8"
            />
            <text
              x={labelX}
              y={arrowY + 2}
              textAnchor="middle"
              fill={op.color}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {op.label}
            </text>
          </motion.g>
        );
      })}

      {/* Bottom note */}
      <motion.text
        x="300"
        y="288"
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Network I/O uses OS async primitives (epoll/kqueue), not the thread pool
      </motion.text>

      <defs>
        {operations.map((op, i) => (
          <marker key={`marker-${i}`} id={`tpArrow-${i}`} markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <polygon points="0 0, 7 2.5, 0 5" fill={op.color} />
          </marker>
        ))}
      </defs>
    </svg>
  );
}
