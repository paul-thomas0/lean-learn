import type { Section } from '../../../types';

export const eventLoopComparisonSections: Section[] = [
  {
    id: 'node-event-loop-comparison',
    title: 'Browser vs Node.js Event Loop',
    content: [
      {
        type: 'text',
        content:
          "Both browsers and Node.js use an event loop to manage asynchronous operations, but their implementations are fundamentally different. Browsers use a rendering-engine-integrated event loop (specified by the HTML spec and implemented by Blink/WebKit/Gecko), while Node.js uses **libuv's** event loop. The differences affect task scheduling, microtask draining behavior, and available APIs. Understanding these differences is essential when writing isomorphic JavaScript or debugging timing-sensitive code that behaves differently across environments.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Architecture Comparison',
      },
      {
        type: 'diagram',
        diagramId: 'event-loop-comparison',
        caption:
          'Side-by-side comparison of the browser event loop (Blink) and the Node.js event loop (libuv)',
      },
      {
        type: 'comparison',
        leftTitle: 'Browser Event Loop (Blink)',
        rightTitle: 'Node.js Event Loop (libuv)',
        leftContent:
          "Defined by the HTML Living Standard. Single task queue model with multiple task sources (DOM events, timers, network, etc.). The event loop interleaves task execution with **rendering steps** (style, layout, paint) — typically targeting 60fps. Uses `requestAnimationFrame()` for frame-aligned work and `requestIdleCallback()` for low-priority background tasks.",
        rightContent:
          "Implemented by libuv in C. Uses a **multi-phase** architecture with six distinct phases (timers, pending, idle/prepare, poll, check, close). No rendering step — Node.js has no UI. Uses `setImmediate()` (check phase) instead of `requestAnimationFrame()`. The poll phase can block waiting for I/O, which browsers never do on the main thread.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Task Scheduling Differences',
      },
      {
        type: 'comparison',
        leftTitle: 'Browser Task Scheduling',
        rightTitle: 'Node.js Task Scheduling',
        leftContent:
          "Tasks come from multiple **task sources** (DOM manipulation, user interaction, networking, history traversal, timers). The browser picks one task from one queue per iteration, then processes all microtasks, then optionally renders. `setTimeout(fn, 0)` is clamped to 4ms after 5 nested calls (per the HTML spec). The browser may prioritize user-input tasks over timer tasks for responsiveness.",
        rightContent:
          "Tasks are grouped by **phase**, not by source. All ready timer callbacks run, then all pending callbacks, then poll, etc. There is no 4ms clamping on `setTimeout` — a `setTimeout(fn, 0)` is set to 1ms minimum. `setImmediate()` is unique to Node.js and fires in the check phase. Node.js does not have `requestAnimationFrame()` or `requestIdleCallback()` since there is no rendering step.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Microtask Draining Behavior',
      },
      {
        type: 'text',
        content:
          "Both environments drain the microtask queue (Promises, `queueMicrotask()`) to completion before continuing. However, the timing differs. In the **browser**, microtasks are drained after each task and before rendering. In **Node.js** (since v11+), microtasks are drained between each phase of the event loop and after each individual callback within a phase. Before Node.js v11, microtasks were only drained between phases, which led to subtle ordering differences compared to browsers.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// This code behaves the same in both environments (Node v11+):
Promise.resolve().then(() => console.log('microtask 1'));
Promise.resolve().then(() => console.log('microtask 2'));
setTimeout(() => {
  console.log('timeout 1');
  Promise.resolve().then(() => console.log('microtask 3'));
}, 0);
setTimeout(() => {
  console.log('timeout 2');
}, 0);

// Both: microtask 1, microtask 2, timeout 1, microtask 3, timeout 2
// Before Node v11: microtask 1, microtask 2, timeout 1, timeout 2, microtask 3
// (microtasks were drained between phases, not between callbacks)`,
        caption:
          'Node.js v11+ aligned microtask draining behavior with browsers',
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Rendering Step (Browser Only)',
      },
      {
        type: 'comparison',
        leftTitle: 'Browser: Rendering Pipeline',
        rightTitle: 'Node.js: No Rendering',
        leftContent:
          "After processing a task and its microtasks, the browser may execute a **rendering step**: run `requestAnimationFrame` callbacks, recalculate styles, perform layout, paint, and composite. This happens roughly every 16.6ms (60fps). Long-running JavaScript blocks this pipeline, causing jank. The browser may skip rendering if no visual changes are pending or if the tab is backgrounded.",
        rightContent:
          "Node.js has no rendering pipeline. The event loop runs purely for I/O and timer processing. This means there is no concept of \"jank\" or frame drops, but long-running synchronous JavaScript still blocks the event loop, preventing I/O callbacks from firing. The equivalent concern is **event loop lag** — measured via `perf_hooks.monitorEventLoopDelay()`.",
      },
      {
        type: 'info',
        variant: 'note',
        title: 'process.nextTick() Has No Browser Equivalent',
        content:
          "`process.nextTick()` is unique to Node.js. It schedules a callback that fires before any other microtasks (including Promise callbacks) at the current microtask checkpoint. The closest browser equivalent is `queueMicrotask()`, but that behaves like a Promise microtask and does not have the same priority as `nextTick`. In Node.js, `nextTick` callbacks are processed before the Promise microtask queue.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Writing Cross-Environment Async Code',
        content:
          "To write code that behaves consistently in both browsers and Node.js: use `Promise.resolve().then()` or `queueMicrotask()` instead of `process.nextTick()`. Use `setTimeout()` instead of `setImmediate()`. Avoid relying on the precise ordering of timer callbacks relative to I/O callbacks, as the scheduling differs between environments. Libraries like `immediate` or `asap` can normalize these differences.",
      },
    ],
  },
];
