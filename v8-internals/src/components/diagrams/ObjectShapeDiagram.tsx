import { motion } from 'framer-motion';

interface ShapeNode {
  id: string;
  label: string;
  properties: string[];
  x: number;
  y: number;
  color: string;
}

const mainChain: ShapeNode[] = [
  { id: 'empty', label: 'Shape₀', properties: ['{}'], x: 50, y: 140, color: '#64748b' },
  { id: 'x', label: 'Shape₁', properties: ['x: offset 0'], x: 220, y: 140, color: '#3b82f6' },
  { id: 'xy', label: 'Shape₂', properties: ['x: offset 0', 'y: offset 1'], x: 420, y: 140, color: '#10b981' },
];

const branchChain: ShapeNode[] = [
  { id: 'y_first', label: 'Shape₃', properties: ['y: offset 0'], x: 220, y: 270, color: '#f59e0b' },
  { id: 'yx', label: 'Shape₄', properties: ['y: offset 0', 'x: offset 1'], x: 420, y: 270, color: '#ef4444' },
];

function ShapeBox({ node, delay }: { node: ShapeNode; delay: number }) {
  const boxWidth = 140;
  const lineHeight = 16;
  const boxHeight = 36 + node.properties.length * lineHeight;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 200 }}
    >
      <rect
        x={node.x}
        y={node.y}
        width={boxWidth}
        height={boxHeight}
        rx="8"
        fill="#12121a"
        stroke={node.color}
        strokeWidth="1.5"
      />
      <text
        x={node.x + boxWidth / 2}
        y={node.y + 18}
        textAnchor="middle"
        fill={node.color}
        fontSize="11"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {node.label}
      </text>
      <line
        x1={node.x + 8}
        y1={node.y + 26}
        x2={node.x + boxWidth - 8}
        y2={node.y + 26}
        stroke="#1e293b"
        strokeWidth="1"
      />
      {node.properties.map((prop, i) => (
        <text
          key={i}
          x={node.x + boxWidth / 2}
          y={node.y + 42 + i * lineHeight}
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="10"
          fontFamily="monospace"
        >
          {prop}
        </text>
      ))}
    </motion.g>
  );
}

export default function ObjectShapeDiagram() {
  return (
    <svg
      viewBox="0 0 600 350"
      className="w-full max-w-2xl mx-auto"
      aria-label="Hidden class transition diagram showing how V8 creates shape chains when properties are added to objects, and how different property orders create divergent chains"
    >
      <rect width="600" height="350" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="300" y="24" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Hidden Classes (Map Transitions)
      </text>

      {/* Code annotations */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <text x="90" y="120" textAnchor="middle" fill="#64748b" fontSize="9" fontFamily="monospace">
          let obj = {'{}'}
        </text>
        <text x="270" y="120" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace">
          obj.x = 1
        </text>
        <text x="470" y="120" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
          obj.y = 2
        </text>
      </motion.g>

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <text x="270" y="255" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">
          obj2.y = 2
        </text>
        <text x="470" y="255" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">
          obj2.x = 1
        </text>
      </motion.g>

      {/* Arrows - main chain */}
      {mainChain.slice(0, -1).map((node, i) => {
        const next = mainChain[i + 1];
        return (
          <motion.g
            key={`arrow-main-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.2 + 0.3 }}
          >
            <line
              x1={node.x + 140}
              y1={node.y + 30}
              x2={next.x - 4}
              y2={next.y + 30}
              stroke="#1e293b"
              strokeWidth="2"
              markerEnd="url(#shapeArrow)"
            />
            <text
              x={(node.x + 140 + next.x) / 2}
              y={node.y + 22}
              textAnchor="middle"
              fill="#64748b"
              fontSize="8"
              fontFamily="monospace"
            >
              add '{i === 0 ? 'x' : 'y'}'
            </text>
          </motion.g>
        );
      })}

      {/* Branch arrow from empty to y_first */}
      <motion.path
        d={`M ${mainChain[0].x + 120} ${mainChain[0].y + 52}
            Q ${mainChain[0].x + 140} ${branchChain[0].y + 20},
              ${branchChain[0].x - 4} ${branchChain[0].y + 30}`}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        markerEnd="url(#shapeArrowOrange)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      />
      <motion.text
        x={135}
        y={235}
        fill="#f59e0b"
        fontSize="8"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        add 'y' first
      </motion.text>

      {/* Arrow y_first → yx */}
      <motion.line
        x1={branchChain[0].x + 140}
        y1={branchChain[0].y + 30}
        x2={branchChain[1].x - 4}
        y2={branchChain[1].y + 30}
        stroke="#1e293b"
        strokeWidth="2"
        markerEnd="url(#shapeArrow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      />
      <motion.text
        x={(branchChain[0].x + 140 + branchChain[1].x) / 2}
        y={branchChain[0].y + 22}
        textAnchor="middle"
        fill="#64748b"
        fontSize="8"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        add 'x'
      </motion.text>

      {/* Shape boxes */}
      {mainChain.map((node, i) => (
        <ShapeBox key={node.id} node={node} delay={i * 0.2} />
      ))}
      {branchChain.map((node, i) => (
        <ShapeBox key={node.id} node={node} delay={i * 0.2 + 0.8} />
      ))}

      {/* Warning note */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <rect x="110" y="325" width="380" height="18" rx="4" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="0.5" />
        <text x="300" y="337" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">
          Different property order = different shapes = slower property access
        </text>
      </motion.g>

      <defs>
        <marker id="shapeArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
        </marker>
        <marker id="shapeArrowOrange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#f59e0b" />
        </marker>
      </defs>
    </svg>
  );
}
