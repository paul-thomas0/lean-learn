import { motion } from 'framer-motion';

interface ProcessBox {
  label: string;
  sublabel: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const browserProcess: ProcessBox = {
  label: 'Browser Process',
  sublabel: 'UI, navigation, storage, network coordination',
  x: 150,
  y: 30,
  width: 300,
  height: 55,
  color: '#3b82f6',
};

const renderers: ProcessBox[] = [
  { label: 'Renderer 1', sublabel: 'Tab: example.com', x: 20, y: 180, width: 160, height: 55, color: '#10b981' },
  { label: 'Renderer 2', sublabel: 'Tab: app.io', x: 210, y: 180, width: 160, height: 55, color: '#10b981' },
  { label: 'Renderer 3', sublabel: 'iframe: ads.net', x: 400, y: 180, width: 160, height: 55, color: '#10b981' },
];

const utilityProcesses: ProcessBox[] = [
  { label: 'GPU Process', sublabel: 'Compositing, WebGL, video decode', x: 20, y: 290, width: 170, height: 55, color: '#8b5cf6' },
  { label: 'Network Process', sublabel: 'HTTP, DNS, TLS, caching', x: 215, y: 290, width: 170, height: 55, color: '#f59e0b' },
  { label: 'Plugin / Utility', sublabel: 'Extensions, audio, etc.', x: 410, y: 290, width: 170, height: 55, color: '#64748b' },
];

function ProcessRect({ proc, delay }: { proc: ProcessBox; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', stiffness: 180 }}
    >
      <rect
        x={proc.x}
        y={proc.y}
        width={proc.width}
        height={proc.height}
        rx="8"
        fill={proc.color + '12'}
        stroke={proc.color}
        strokeWidth="1.5"
      />
      <text
        x={proc.x + proc.width / 2}
        y={proc.y + 22}
        textAnchor="middle"
        fill={proc.color}
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {proc.label}
      </text>
      <text
        x={proc.x + proc.width / 2}
        y={proc.y + 40}
        textAnchor="middle"
        fill="#64748b"
        fontSize="8"
        fontFamily="monospace"
      >
        {proc.sublabel}
      </text>
    </motion.g>
  );
}

export default function ChromeProcessDiagram() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full max-w-2xl mx-auto"
      aria-label="Chrome multi-process architecture diagram showing Browser Process, Renderer Processes, GPU Process, Network Process, and Plugin processes connected via IPC"
    >
      <rect width="600" height="400" fill="#12121a" rx="8" />

      {/* Title */}
      <text x="300" y="20" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontFamily="monospace" fontWeight="bold">
        Chrome Multi-Process Architecture
      </text>

      {/* Browser Process */}
      <ProcessRect proc={browserProcess} delay={0.1} />

      {/* IPC arrows: Browser → Renderers */}
      {renderers.map((renderer, i) => (
        <motion.g
          key={`ipc-br-${i}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <line
            x1={browserProcess.x + browserProcess.width / 2}
            y1={browserProcess.y + browserProcess.height}
            x2={renderer.x + renderer.width / 2}
            y2={renderer.y}
            stroke="#1e293b"
            strokeWidth="1.5"
            markerEnd="url(#ipcArrow)"
          />
        </motion.g>
      ))}

      {/* Label for IPC */}
      <motion.text
        x={300}
        y={140}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        IPC (Mojo)
      </motion.text>

      {/* Renderers */}
      {renderers.map((renderer, i) => (
        <ProcessRect key={`r-${i}`} proc={renderer} delay={0.3 + i * 0.1} />
      ))}

      {/* IPC arrows: Renderers → GPU, Network */}
      {renderers.map((renderer, i) => (
        <motion.g key={`ipc-rg-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1 }}>
          <line
            x1={renderer.x + renderer.width / 2}
            y1={renderer.y + renderer.height}
            x2={utilityProcesses[0].x + utilityProcesses[0].width / 2}
            y2={utilityProcesses[0].y}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="3 2"
            strokeOpacity="0.5"
          />
          <line
            x1={renderer.x + renderer.width / 2}
            y1={renderer.y + renderer.height}
            x2={utilityProcesses[1].x + utilityProcesses[1].width / 2}
            y2={utilityProcesses[1].y}
            stroke="#1e293b"
            strokeWidth="1"
            strokeDasharray="3 2"
            strokeOpacity="0.5"
          />
        </motion.g>
      ))}

      {/* Label for IPC */}
      <motion.text
        x={300}
        y={268}
        textAnchor="middle"
        fill="#64748b"
        fontSize="9"
        fontFamily="monospace"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        IPC
      </motion.text>

      {/* Utility processes */}
      {utilityProcesses.map((proc, i) => (
        <ProcessRect key={`u-${i}`} proc={proc} delay={0.6 + i * 0.1} />
      ))}

      {/* Site Isolation note */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        <rect x="100" y="365" width="400" height="22" rx="4" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="0.5" />
        <text x="300" y="380" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
          Site Isolation: each site gets its own renderer process for security
        </text>
      </motion.g>

      <defs>
        <marker id="ipcArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1e293b" />
        </marker>
      </defs>
    </svg>
  );
}
