import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QueueItem {
  id: string;
  label: string;
}

interface Step {
  phaseQueue: QueueItem[];
  nextTickQueue: QueueItem[];
  promiseQueue: QueueItem[];
  executing: QueueItem | null;
  output: string[];
  narration: string;
}

const steps: Step[] = [
  {
    phaseQueue: [
      { id: 'T1', label: 'T1 callback' },
      { id: 'T2', label: 'T2 callback' },
    ],
    nextTickQueue: [],
    promiseQueue: [],
    executing: null,
    output: [],
    narration:
      'Two setTimeout callbacks (T1, T2) are queued in the Timers phase queue. Microtask queues are empty.',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [],
    promiseQueue: [],
    executing: { id: 'T1', label: 'T1 callback' },
    output: ['T1'],
    narration:
      'T1 callback is dequeued and begins executing. It logs "T1" and schedules nextTick and Promise callbacks.',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [
      { id: 'NT1', label: 'NT1' },
      { id: 'NT2', label: 'NT2' },
    ],
    promiseQueue: [
      { id: 'P1', label: 'P1' },
      { id: 'P2', label: 'P2' },
    ],
    executing: null,
    output: ['T1'],
    narration:
      'T1 finishes. Before the next phase callback, Node drains all microtasks. nextTick queue has NT1, NT2. Promise queue has P1, P2.',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [{ id: 'NT2', label: 'NT2' }],
    promiseQueue: [
      { id: 'P1', label: 'P1' },
      { id: 'P2', label: 'P2' },
    ],
    executing: { id: 'NT1', label: 'NT1' },
    output: ['T1', 'NT1'],
    narration:
      'nextTick queue drains first (higher priority). NT1 executes and logs "NT1".',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [],
    promiseQueue: [
      { id: 'P1', label: 'P1' },
      { id: 'P2', label: 'P2' },
    ],
    executing: { id: 'NT2', label: 'NT2' },
    output: ['T1', 'NT1', 'NT2'],
    narration:
      'NT2 executes and logs "NT2". nextTick queue is now empty. Promise microtasks are next.',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [],
    promiseQueue: [{ id: 'P2', label: 'P2' }],
    executing: { id: 'P1', label: 'P1' },
    output: ['T1', 'NT1', 'NT2', 'P1'],
    narration:
      'Promise queue drains next. P1 executes and logs "P1".',
  },
  {
    phaseQueue: [{ id: 'T2', label: 'T2 callback' }],
    nextTickQueue: [],
    promiseQueue: [],
    executing: { id: 'P2', label: 'P2' },
    output: ['T1', 'NT1', 'NT2', 'P1', 'P2'],
    narration:
      'P2 executes and logs "P2". All microtask queues are now empty.',
  },
  {
    phaseQueue: [],
    nextTickQueue: [],
    promiseQueue: [],
    executing: { id: 'T2', label: 'T2 callback' },
    output: ['T1', 'NT1', 'NT2', 'P1', 'P2', 'T2'],
    narration:
      'With all microtasks drained, the event loop resumes the phase queue. T2 executes and logs "T2".',
  },
  {
    phaseQueue: [],
    nextTickQueue: [],
    promiseQueue: [],
    executing: null,
    output: ['T1', 'NT1', 'NT2', 'P1', 'P2', 'T2'],
    narration:
      'All queues are empty. Final output: T1 → NT1 → NT2 → P1 → P2 → T2. Microtasks always drain completely between phase callbacks.',
  },
];

const COLORS = {
  bg: '#12121a',
  phase: '#3b82f6',
  nextTick: '#ef4444',
  promise: '#a855f7',
  exec: '#10b981',
  text: '#e2e8f0',
  muted: '#64748b',
  surface: '#1e293b',
};

const COL_X = [30, 185, 340];
const QUEUE_Y = 60;
const QUEUE_W = 130;
const QUEUE_H = 140;
const ITEM_H = 26;
const EXEC_Y = 230;
const OUTPUT_Y = 310;

function QueueColumn({
  x,
  label,
  color,
  items,
}: {
  x: number;
  label: string;
  color: string;
  items: QueueItem[];
}) {
  return (
    <g>
      <text
        x={x + QUEUE_W / 2}
        y={QUEUE_Y - 10}
        textAnchor="middle"
        fill={color}
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {label}
      </text>
      <rect
        x={x}
        y={QUEUE_Y}
        width={QUEUE_W}
        height={QUEUE_H}
        rx="6"
        fill={COLORS.surface}
        stroke={color}
        strokeWidth="1.5"
        opacity="0.6"
      />
      <AnimatePresence>
        {items.map((item, i) => (
          <motion.g
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            <rect
              x={x + 8}
              y={QUEUE_Y + 10 + i * (ITEM_H + 4)}
              width={QUEUE_W - 16}
              height={ITEM_H}
              rx="4"
              fill={color + '33'}
              stroke={color}
              strokeWidth="1"
            />
            <text
              x={x + QUEUE_W / 2}
              y={QUEUE_Y + 10 + i * (ITEM_H + 4) + ITEM_H / 2 + 4}
              textAnchor="middle"
              fill={COLORS.text}
              fontSize="11"
              fontFamily="monospace"
            >
              {item.label}
            </text>
          </motion.g>
        ))}
      </AnimatePresence>
    </g>
  );
}

export default function MicrotaskQueueDiagram() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = steps[step];

  useEffect(() => {
    if (autoPlay) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length - 1) {
            setAutoPlay(false);
            return s;
          }
          return s + 1;
        });
      }, 2000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay]);

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        viewBox="0 0 500 480"
        className="w-full max-w-lg mx-auto"
        aria-label="Interactive microtask queue priority diagram showing how nextTick, Promise, and phase callbacks are ordered"
      >
        <rect width="500" height="480" fill={COLORS.bg} rx="8" />

        {/* Title */}
        <text
          x="250"
          y="30"
          textAnchor="middle"
          fill={COLORS.text}
          fontSize="13"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Microtask Queue Priority
        </text>
        <text
          x="250"
          y="44"
          textAnchor="middle"
          fill={COLORS.muted}
          fontSize="10"
          fontFamily="monospace"
        >
          Step {step + 1} of {steps.length}
        </text>

        {/* Queue columns */}
        <QueueColumn
          x={COL_X[0]}
          label="Phase Queue"
          color={COLORS.phase}
          items={current.phaseQueue}
        />
        <QueueColumn
          x={COL_X[1]}
          label="nextTick Queue"
          color={COLORS.nextTick}
          items={current.nextTickQueue}
        />
        <QueueColumn
          x={COL_X[2]}
          label="Promise Queue"
          color={COLORS.promise}
          items={current.promiseQueue}
        />

        {/* Priority arrows */}
        <text
          x={165}
          y={QUEUE_Y + QUEUE_H / 2 + 4}
          textAnchor="middle"
          fill={COLORS.muted}
          fontSize="16"
          fontFamily="monospace"
        >
          ›
        </text>
        <text
          x={325}
          y={QUEUE_Y + QUEUE_H / 2 + 4}
          textAnchor="middle"
          fill={COLORS.muted}
          fontSize="16"
          fontFamily="monospace"
        >
          ›
        </text>

        {/* Execution zone */}
        <text
          x="250"
          y={EXEC_Y - 8}
          textAnchor="middle"
          fill={COLORS.exec}
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Executing
        </text>
        <rect
          x="150"
          y={EXEC_Y}
          width="200"
          height="36"
          rx="6"
          fill={COLORS.surface}
          stroke={COLORS.exec}
          strokeWidth="1.5"
          opacity="0.6"
        />
        <AnimatePresence mode="wait">
          {current.executing && (
            <motion.g
              key={current.executing.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
            >
              <rect
                x="158"
                y={EXEC_Y + 5}
                width="184"
                height="26"
                rx="4"
                fill={COLORS.exec + '33'}
                stroke={COLORS.exec}
                strokeWidth="1"
              />
              <text
                x="250"
                y={EXEC_Y + 23}
                textAnchor="middle"
                fill={COLORS.text}
                fontSize="12"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {current.executing.label}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Output */}
        <text
          x="250"
          y={OUTPUT_Y}
          textAnchor="middle"
          fill={COLORS.muted}
          fontSize="10"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Console Output
        </text>
        <rect
          x="50"
          y={OUTPUT_Y + 8}
          width="400"
          height="30"
          rx="6"
          fill={COLORS.surface}
          strokeWidth="0"
        />
        <text
          x="250"
          y={OUTPUT_Y + 28}
          textAnchor="middle"
          fill={COLORS.text}
          fontSize="12"
          fontFamily="monospace"
        >
          {current.output.length > 0
            ? current.output.join(' → ')
            : '(empty)'}
        </text>

        {/* Narration */}
        <foreignObject x="20" y={OUTPUT_Y + 50} width="460" height="100">
          <div
            // @ts-expect-error xmlns is valid for foreignObject HTML
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              color: COLORS.muted,
              fontFamily: 'monospace',
              fontSize: '11px',
              lineHeight: '1.5',
              textAlign: 'center',
              padding: '0 8px',
            }}
          >
            {current.narration}
          </div>
        </foreignObject>
      </svg>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="px-3 py-1.5 rounded text-xs font-mono bg-[#1e293b] text-[#e2e8f0] border border-[#334155] hover:border-[#3b82f6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Prev
        </button>
        <button
          onClick={() => {
            if (autoPlay) {
              setAutoPlay(false);
            } else {
              if (step >= steps.length - 1) setStep(0);
              setAutoPlay(true);
            }
          }}
          className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors ${
            autoPlay
              ? 'bg-[#3b82f6] text-white border-[#3b82f6]'
              : 'bg-[#1e293b] text-[#e2e8f0] border-[#334155] hover:border-[#3b82f6]'
          }`}
        >
          {autoPlay ? '⏸ Pause' : '▶ Auto'}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
          className="px-3 py-1.5 rounded text-xs font-mono bg-[#1e293b] text-[#e2e8f0] border border-[#334155] hover:border-[#3b82f6] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
