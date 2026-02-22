import { motion } from 'framer-motion';

const regions = [
  {
    id: 'young',
    label: 'Young Generation',
    x: 20,
    y: 50,
    width: 260,
    height: 170,
    color: '#3b82f6',
    subRegions: [
      { label: 'Nursery (Semi-space)', x: 30, y: 80, width: 115, height: 110, color: '#3b82f6' },
      { label: 'Intermediate', x: 155, y: 80, width: 115, height: 110, color: '#8b5cf6' },
    ],
  },
  {
    id: 'old',
    label: 'Old Generation',
    x: 300,
    y: 50,
    width: 280,
    height: 170,
    color: '#10b981',
    subRegions: [],
  },
  {
    id: 'code',
    label: 'Code Space',
    x: 20,
    y: 250,
    width: 170,
    height: 90,
    color: '#f59e0b',
    subRegions: [],
  },
  {
    id: 'large',
    label: 'Large Object Space',
    x: 210,
    y: 250,
    width: 370,
    height: 90,
    color: '#ef4444',
    subRegions: [],
  },
];

// Animated objects in young gen that get promoted
const youngObjects = [
  { cx: 55, cy: 130, r: 5 },
  { cx: 80, cy: 150, r: 4 },
  { cx: 100, cy: 120, r: 6 },
  { cx: 70, cy: 110, r: 3 },
  { cx: 120, cy: 160, r: 5 },
];

const intermediateObjects = [
  { cx: 185, cy: 130, r: 5 },
  { cx: 210, cy: 150, r: 4 },
  { cx: 230, cy: 120, r: 3 },
];

const oldObjects = [
  { cx: 340, cy: 100, r: 6 },
  { cx: 380, cy: 130, r: 5 },
  { cx: 420, cy: 110, r: 7 },
  { cx: 460, cy: 150, r: 5 },
  { cx: 500, cy: 120, r: 4 },
  { cx: 360, cy: 160, r: 6 },
  { cx: 440, cy: 170, r: 5 },
  { cx: 520, cy: 140, r: 4 },
];

export default function HeapDiagram() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full max-w-2xl mx-auto"
      aria-label="V8 heap memory layout showing Young Generation with Nursery and Intermediate spaces, Old Generation, Code Space, and Large Object Space, with animated objects representing memory allocation and promotion"
    >
      <rect width="600" height="400" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="300" y="30" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontFamily="monospace" fontWeight="bold">
        V8 Heap Memory Layout
      </text>

      {/* Main regions */}
      {regions.map((region, i) => (
        <motion.g
          key={region.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }}
        >
          <rect
            x={region.x}
            y={region.y}
            width={region.width}
            height={region.height}
            rx="8"
            fill={region.color + '0d'}
            stroke={region.color}
            strokeWidth="1.5"
          />
          <text
            x={region.x + region.width / 2}
            y={region.y + 16}
            textAnchor="middle"
            fill={region.color}
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            {region.label}
          </text>

          {/* Sub-regions */}
          {region.subRegions.map((sub, j) => (
            <g key={j}>
              <rect
                x={sub.x}
                y={sub.y}
                width={sub.width}
                height={sub.height}
                rx="6"
                fill={sub.color + '0d'}
                stroke={sub.color}
                strokeWidth="1"
                strokeDasharray="4 2"
              />
              <text
                x={sub.x + sub.width / 2}
                y={sub.y + 16}
                textAnchor="middle"
                fill={sub.color}
                fontSize="9"
                fontFamily="monospace"
              >
                {sub.label}
              </text>
            </g>
          ))}
        </motion.g>
      ))}

      {/* Static objects in nursery */}
      {youngObjects.map((obj, i) => (
        <motion.circle
          key={`young-${i}`}
          cx={obj.cx}
          cy={obj.cy}
          r={obj.r}
          fill="#3b82f6"
          fillOpacity="0.6"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 1, 0.8, 1] }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
        />
      ))}

      {/* Objects in intermediate */}
      {intermediateObjects.map((obj, i) => (
        <motion.circle
          key={`inter-${i}`}
          cx={obj.cx}
          cy={obj.cy}
          r={obj.r}
          fill="#8b5cf6"
          fillOpacity="0.6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
        />
      ))}

      {/* Objects in old gen */}
      {oldObjects.map((obj, i) => (
        <motion.circle
          key={`old-${i}`}
          cx={obj.cx}
          cy={obj.cy}
          r={obj.r}
          fill="#10b981"
          fillOpacity="0.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.0 + i * 0.08, duration: 0.3 }}
        />
      ))}

      {/* Promotion arrow: Nursery → Intermediate */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <line x1="145" y1="140" x2="158" y2="140" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#heapArrow)" />
        <text x="152" y="175" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
          Minor GC
        </text>
      </motion.g>

      {/* Promotion arrow: Intermediate → Old Gen */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      >
        <line x1="270" y1="140" x2="302" y2="140" stroke="#10b981" strokeWidth="2" markerEnd="url(#heapArrowGreen)" />
        <text x="286" y="175" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
          Promotion
        </text>
      </motion.g>

      {/* Animated promotion circle */}
      <motion.circle
        cx={100}
        cy={135}
        r={4}
        fill="#f59e0b"
        initial={{ cx: 100, cy: 135, opacity: 0 }}
        animate={{
          cx: [100, 200, 350],
          cy: [135, 135, 135],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          delay: 2.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />

      {/* Code space objects */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {[45, 75, 105, 135].map((x, i) => (
          <rect key={i} x={x} y={280} width={20} height={12} rx="2" fill="#f59e0b" fillOpacity="0.4" />
        ))}
        <text x="105" y="310" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          Compiled code
        </text>
      </motion.g>

      {/* Large object space objects */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
      >
        <rect x="240" y="270" width="60" height="40" rx="4" fill="#ef4444" fillOpacity="0.3" />
        <rect x="320" y="275" width="50" height="35" rx="4" fill="#ef4444" fillOpacity="0.3" />
        <rect x="390" y="270" width="70" height="40" rx="4" fill="#ef4444" fillOpacity="0.3" />
        <text x="395" y="325" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">
          Objects &gt; kMaxRegularHeapObjectSize
        </text>
      </motion.g>

      {/* Legend */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3 }}
      >
        <text x="300" y="370" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          Scavenger (minor GC) collects young gen | Mark-Sweep-Compact (major GC) collects old gen
        </text>
        <circle cx="150" cy="385" r="4" fill="#f59e0b" />
        <text x="160" y="389" fill="#64748b" fontSize="8" fontFamily="monospace">
          = object being promoted
        </text>
      </motion.g>

      <defs>
        <marker id="heapArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6" />
        </marker>
        <marker id="heapArrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
    </svg>
  );
}
