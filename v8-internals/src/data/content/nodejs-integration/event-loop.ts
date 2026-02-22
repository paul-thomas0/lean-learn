import type { Section } from '../../../types';

export const nodeEventLoopSections: Section[] = [
  {
    id: 'node-event-loop',
    title: 'The Node.js Event Loop',
    content: [
      {
        type: 'text',
        content:
          "The Node.js event loop is implemented by **libuv**, not by V8. V8 provides the JavaScript execution engine, but it has no built-in event loop — the embedder (Node.js, Chrome, Deno) supplies one. In Node.js, libuv's event loop is a single-threaded loop that polls for I/O events and dispatches JavaScript callbacks. Understanding its phases is critical for predicting the order in which callbacks execute, especially when mixing timers, I/O, and microtasks.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Six Phases of the Event Loop',
      },
      {
        type: 'text',
        content:
          "libuv's event loop cycles through six distinct phases on each iteration (\"tick\"). Each phase has a FIFO queue of callbacks to execute. When the event loop enters a phase, it processes callbacks in that phase's queue until the queue is exhausted or a maximum number of callbacks have been executed, then moves to the next phase. The phases are: **timers**, **pending callbacks**, **idle/prepare**, **poll**, **check**, and **close callbacks**.",
      },
      {
        type: 'diagram',
        diagramId: 'libuv-event-loop',
        caption:
          'The six phases of the libuv event loop: timers -> pending callbacks -> idle/prepare -> poll -> check -> close callbacks',
      },
      {
        type: 'key-concept',
        title: 'Event Loop Phases in Detail',
        content:
          "**1. Timers** — Executes callbacks scheduled by `setTimeout()` and `setInterval()` whose threshold has elapsed. Timers specify a minimum delay, not an exact time.\n\n**2. Pending callbacks** — Executes I/O callbacks deferred from the previous loop iteration (e.g., certain TCP errors).\n\n**3. Idle/Prepare** — Used internally by libuv only; not directly exposed to JavaScript.\n\n**4. Poll** — Retrieves new I/O events and executes I/O-related callbacks (nearly all callbacks except timers, `setImmediate()`, and close callbacks). The loop may block here waiting for I/O if there are no timers scheduled.\n\n**5. Check** — Executes `setImmediate()` callbacks. This phase runs immediately after the poll phase completes.\n\n**6. Close callbacks** — Executes close event callbacks, e.g., `socket.on('close', ...)`.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'setImmediate() vs setTimeout()',
      },
      {
        type: 'text',
        content:
          "A common source of confusion is the ordering of `setImmediate()` and `setTimeout(fn, 0)`. When called from the **main module** (not inside an I/O callback), their order is non-deterministic because the timer's threshold check depends on how fast the event loop starts up. However, when called **inside an I/O callback**, `setImmediate()` always fires first because the check phase (where `setImmediate` runs) comes immediately after the poll phase (where I/O callbacks run), before the loop wraps back around to the timers phase.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const fs = require('fs');

// Inside an I/O callback: setImmediate always fires first
fs.readFile(__filename, () => {
  setImmediate(() => console.log('setImmediate'));  // Always first
  setTimeout(() => console.log('setTimeout'), 0);   // Always second
});

// Outside I/O: order is non-deterministic
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
// Could print in either order!`,
        caption:
          'Demonstrating the ordering difference between setImmediate and setTimeout',
      },
      {
        type: 'heading',
        level: 2,
        text: 'process.nextTick() and Microtasks',
      },
      {
        type: 'text',
        content:
          "Neither `process.nextTick()` nor resolved Promises are part of libuv's event loop phases. They are processed in the **microtask queue**, which is drained between every phase transition (and after every individual callback in some cases). `process.nextTick()` callbacks are processed before Promise microtasks. This means `process.nextTick()` can starve the event loop if used recursively — the loop will never advance to the next phase until the nextTick queue is fully drained.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Execution order demonstration
setTimeout(() => console.log('1: setTimeout'), 0);
setImmediate(() => console.log('2: setImmediate'));

Promise.resolve().then(() => console.log('3: Promise microtask'));
process.nextTick(() => console.log('4: nextTick'));

console.log('5: synchronous');

// Output (guaranteed):
// 5: synchronous
// 4: nextTick
// 3: Promise microtask
// Then 1 and 2 in non-deterministic order`,
        caption:
          'nextTick fires before Promise microtasks, both fire before timers and immediates',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Queue Priority Hierarchy',
      },
      {
        type: 'key-concept',
        title: 'The Three-Tier Queue System',
        content:
          "Between each phase callback, Node.js drains **all** microtasks before continuing. The drain order is strict:\n\n**1. nextTick queue** (highest priority) — `process.nextTick()` callbacks drain first, completely.\n\n**2. Promise microtask queue** — Resolved Promise `.then()`/`.catch()`/`.finally()` callbacks drain next, completely.\n\n**3. Phase callback queue** (lowest priority) — Only after both microtask queues are empty does the event loop execute the next callback from the current phase (timers, poll, check, etc.).\n\nThis means a single phase callback can schedule any number of microtasks, and **all of them** will run before the next phase callback — not just before the next phase.",
      },
      {
        type: 'diagram',
        diagramId: 'microtask-queue',
        caption:
          'Step through the execution order to see how microtasks interleave with phase callbacks',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `setTimeout(() => {
  console.log('T1');
  process.nextTick(() => console.log('NT1'));
  Promise.resolve().then(() => console.log('P1'));
  process.nextTick(() => console.log('NT2'));
  Promise.resolve().then(() => console.log('P2'));
}, 0);
setTimeout(() => console.log('T2'), 0);

// Output: T1, NT1, NT2, P1, P2, T2
// After T1 runs, ALL microtasks drain before T2 executes`,
        caption:
          'Microtasks scheduled inside a timer callback run before the next timer callback',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Node.js v11+: Microtask Drain After Each Callback',
      },
      {
        type: 'text',
        content:
          'Before Node.js v11, microtasks were only drained **between phases**, not between individual callbacks within the same phase. This meant that if two timer callbacks were queued, both would execute before any microtasks ran — diverging from browser behavior where microtasks drain after each task. Node.js v11 changed this to drain microtasks after **every individual callback**, aligning with the HTML specification and making behavior consistent across runtimes.',
      },
      {
        type: 'comparison',
        leftTitle: 'Before v11',
        leftContent:
          '**Phase-level drain only**\n\nBoth timer callbacks run, then microtasks:\n\n`T1 → T2 → NT1 → NT2 → P1 → P2`\n\nMicrotasks only drained between phases, not between callbacks within the same phase.',
        rightTitle: 'v11+ (Current)',
        rightContent:
          '**Callback-level drain**\n\nMicrotasks drain after each callback:\n\n`T1 → NT1 → NT2 → P1 → P2 → T2`\n\nAligns with browser behavior. Microtasks drain after every individual callback execution.',
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Why the Change?',
        content:
          'The v11 change aligned Node.js with the HTML specification\'s microtask checkpoint behavior. This matters for **isomorphic code** — JavaScript that runs in both Node.js and the browser. Without this alignment, Promise-based code could produce different execution orders depending on the runtime, making it difficult to write correct cross-platform async logic.',
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'Starving the Event Loop',
        content:
          "Recursive `process.nextTick()` calls will prevent the event loop from advancing because the microtask queue is drained completely before moving to the next phase. This can block all I/O, timers, and other callbacks. Prefer `setImmediate()` for recursive deferral patterns, as it schedules work in the check phase and allows the event loop to continue processing other phases normally.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Inspecting the Event Loop',
        content:
          'You can observe event loop behavior using `--trace-event-categories v8,node,node.async_hooks` to generate a trace file viewable in Chrome DevTools\' Performance tab. The `perf_hooks` module provides `monitorEventLoopDelay()` to measure event loop lag, and `async_hooks` can track the lifecycle of asynchronous resources through the event loop.',
      },
    ],
  },
];
