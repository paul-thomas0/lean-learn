import type { Section } from '../../../types';

export const queueSystemSections: Section[] = [
  {
    id: 'node-queue-system',
    title: 'Event Loop Queues In Depth',
    content: [
      {
        type: 'text',
        content:
          "Node.js has **8 distinct queues** that govern callback execution order: 6 macrotask queues (one per libuv event loop phase) and 2 microtask queues that drain between every phase transition and after every individual callback. Understanding exactly which queue holds which callback — and when each queue is drained — is the key to predicting async execution order in Node.js.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Macrotask Queues: One Per Phase',
      },
      {
        type: 'text',
        content:
          "Each of the 6 libuv event loop phases maintains its own FIFO queue. When the loop enters a phase, it drains that phase's queue (up to a system-defined limit) before moving on. These are the **macrotask queues**:",
      },
      {
        type: 'key-concept',
        title: 'The 6 Macrotask Queues',
        content:
          "**1. Timer queue** — Holds callbacks from `setTimeout()` and `setInterval()` whose delay threshold has elapsed. The timer phase checks a min-heap of timers and moves expired callbacks into this queue.\n\n**2. Pending I/O queue** — Holds deferred OS-level callbacks from the previous loop iteration. Examples include certain TCP errors like `ECONNREFUSED` that the OS reports asynchronously.\n\n**3. Idle/Prepare queue** — Used internally by libuv for housekeeping. You never schedule callbacks here directly from JavaScript.\n\n**4. Poll queue** — The largest and most important queue. Holds I/O completion callbacks: `fs.readFile`, incoming network data, DNS results via c-ares, etc. This is the only phase that can **block** — it will wait for I/O if the queue is empty and no timers are pending.\n\n**5. Check queue** — Holds `setImmediate()` callbacks exclusively. Runs immediately after the poll phase, which is why `setImmediate()` always fires before `setTimeout()` when both are scheduled inside an I/O callback.\n\n**6. Close queue** — Holds close event callbacks like `socket.on('close', ...)` and cleanup handlers from `process.on('exit', ...)`.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Microtask Queues: Between Every Callback',
      },
      {
        type: 'text',
        content:
          "Microtask queues are **not** part of libuv — they are managed by Node.js at the V8/JavaScript level. Since Node.js v11, both microtask queues are fully drained after **every individual macrotask callback** and at **every phase transition**. There are exactly 2 microtask queues, and they always drain in the same strict order:",
      },
      {
        type: 'key-concept',
        title: 'The 2 Microtask Queues',
        content:
          "**1. nextTick queue** (highest priority) — Populated by `process.nextTick()`. This queue drains **completely** before any Promise microtasks run. It is Node.js-specific and does not exist in browsers.\n\n**2. Promise microtask queue** — Populated by resolved Promise `.then()`, `.catch()`, `.finally()` callbacks and `await` continuations. This is the standard microtask queue defined by the ECMAScript specification, shared with browsers.",
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'nextTick Can Starve Everything',
        content:
          "Because the nextTick queue must drain completely before any other queue is processed, a recursive `process.nextTick()` call will prevent the event loop from ever advancing. No I/O, no timers, no `setImmediate` — nothing runs until the nextTick queue is empty. Prefer `setImmediate()` for recursive deferral patterns.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Complete Queue Drain Order',
      },
      {
        type: 'text',
        content:
          "On each iteration of the event loop, the 8 queues are processed in this exact order. Between each macrotask phase, and after each individual callback within a phase, both microtask queues are drained:",
      },
      {
        type: 'code',
        language: 'text',
        code: `┌──────────────────────────────────────────────┐
│           EVENT LOOP ITERATION               │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─ TIMERS PHASE ──────────────────────────┐ │
│  │  Drain: setTimeout, setInterval         │ │
│  │  [after each cb: drain microtasks]      │ │
│  └─────────────────────────────────────────┘ │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ┌─ PENDING I/O PHASE ────────────────────┐  │
│  │  Drain: deferred OS callbacks           │  │
│  │  [after each cb: drain microtasks]      │  │
│  └─────────────────────────────────────────┘  │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ┌─ IDLE/PREPARE PHASE ───────────────────┐  │
│  │  Internal libuv housekeeping            │  │
│  └─────────────────────────────────────────┘  │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ┌─ POLL PHASE ───────────────────────────┐  │
│  │  Drain: I/O callbacks (fs, net, dns)    │  │
│  │  May BLOCK here waiting for I/O         │  │
│  │  [after each cb: drain microtasks]      │  │
│  └─────────────────────────────────────────┘  │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ┌─ CHECK PHASE ──────────────────────────┐  │
│  │  Drain: setImmediate callbacks          │  │
│  │  [after each cb: drain microtasks]      │  │
│  └─────────────────────────────────────────┘  │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ┌─ CLOSE PHASE ──────────────────────────┐  │
│  │  Drain: close event callbacks           │  │
│  │  [after each cb: drain microtasks]      │  │
│  └─────────────────────────────────────────┘  │
│  ↓ drain nextTick queue → drain Promises     │
│                                              │
│  ───── loop back to TIMERS ──────────────    │
└──────────────────────────────────────────────┘`,
        caption: 'Complete queue drain order across one event loop iteration',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Queue Mapping: API to Queue',
      },
      {
        type: 'text',
        content:
          "Every async API in Node.js ultimately places its callback into one of these 8 queues. Here is the mapping from common APIs to their destination queue:",
      },
      {
        type: 'comparison',
        leftTitle: 'Macrotask APIs → Queue',
        leftContent:
          "`setTimeout(cb, n)` → **Timer queue**\n\n`setInterval(cb, n)` → **Timer queue**\n\n`fs.readFile(cb)` → **Poll queue**\n\n`net.Server.on('data', cb)` → **Poll queue**\n\n`dns.resolve(cb)` → **Poll queue**\n\n`setImmediate(cb)` → **Check queue**\n\n`socket.on('close', cb)` → **Close queue**",
        rightTitle: 'Microtask APIs → Queue',
        rightContent:
          "`process.nextTick(cb)` → **nextTick queue**\n\n`Promise.resolve().then(cb)` → **Promise queue**\n\n`await expression` → **Promise queue** (continuation)\n\n`queueMicrotask(cb)` → **Promise queue**\n\nMicrotask queues drain after **every** macrotask callback — not just between phases.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Tracing Queue Execution Order',
      },
      {
        type: 'text',
        content:
          "Let's trace through a realistic example that touches all queue types to see the exact execution order:",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const fs = require('fs');

// Schedule across multiple queues
setTimeout(() => console.log('1: Timer'), 0);
setImmediate(() => console.log('2: Check'));

fs.readFile(__filename, () => {
  // Inside an I/O callback (poll phase):
  console.log('3: Poll (I/O callback)');

  // Schedule microtasks from within I/O
  process.nextTick(() => console.log('4: nextTick (from I/O)'));
  Promise.resolve().then(() => console.log('5: Promise (from I/O)'));

  // Schedule macrotasks from within I/O
  setTimeout(() => console.log('6: Timer (from I/O)'), 0);
  setImmediate(() => console.log('7: Check (from I/O)'));
});

// Main module microtasks
process.nextTick(() => console.log('8: nextTick'));
Promise.resolve().then(() => console.log('9: Promise'));

console.log('10: Synchronous');

// Guaranteed output:
// 10: Synchronous          ← call stack
// 8: nextTick              ← nextTick queue (drains first)
// 9: Promise               ← Promise queue (drains second)
// 1: Timer                 ← timers phase (or 2 first — non-deterministic)
// 2: Check                 ← check phase (or 1 first — non-deterministic)
// 3: Poll (I/O callback)   ← poll phase
// 4: nextTick (from I/O)   ← nextTick queue (drains after I/O cb)
// 5: Promise (from I/O)    ← Promise queue (drains after nextTick)
// 7: Check (from I/O)      ← check phase (always before timer here)
// 6: Timer (from I/O)      ← timers phase (next iteration)`,
        caption:
          'Tracing execution across all queue types — note how microtasks always drain immediately after the callback that scheduled them',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Why the Poll Phase Is Special',
      },
      {
        type: 'text',
        content:
          "The poll phase behaves differently from all other phases. When the event loop enters the poll phase and the poll queue is empty, it doesn't just move on — it **blocks** and waits for I/O events to arrive. This is what makes Node.js efficient: instead of busy-looping, it sleeps until there's work to do. However, the poll phase will stop blocking if: (a) a `setImmediate()` callback is pending (it moves to the check phase), or (b) a timer's threshold has elapsed (it wraps back to the timers phase).",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'The 8-Queue Mental Model',
        content:
          "When debugging async ordering issues, mentally map each API call to its queue: `setTimeout` → timer queue, `fs.*` → poll queue, `setImmediate` → check queue, `process.nextTick` → nextTick queue, `Promise.then` → Promise queue. Then walk through the event loop phases in order, remembering that both microtask queues drain after every single callback. This model will correctly predict execution order in virtually all cases.",
      },
      {
        type: 'info',
        variant: 'note',
        title: 'queueMicrotask() vs process.nextTick()',
        content:
          "`queueMicrotask(cb)` was added in Node.js v11 as a platform-independent way to schedule microtasks. It places callbacks in the **Promise microtask queue** (not the nextTick queue), so `process.nextTick()` callbacks will always run first. Prefer `queueMicrotask()` in new code for browser compatibility, and reserve `process.nextTick()` for cases where you genuinely need the highest-priority scheduling.",
      },
    ],
  },
];
