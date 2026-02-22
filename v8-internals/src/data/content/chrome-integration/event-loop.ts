import type { Section } from '../../../types';

export const chromeEventLoopSections: Section[] = [
  {
    id: 'chrome-event-loop',
    title: 'The Browser Event Loop',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'How the Browser Event Loop Works',
      },
      {
        type: 'text',
        content:
          'The browser event loop is the heartbeat of every web page. It is responsible for executing JavaScript, processing user input, running timers, and coordinating rendering. Unlike the simplified model often taught (one big queue), the real browser event loop in Blink is a sophisticated scheduler with multiple task queues, priority levels, and tight integration with the rendering pipeline.',
      },
      {
        type: 'key-concept',
        title: 'One Iteration of the Event Loop',
        content:
          '1. Pick the highest-priority task from a task queue and run it to completion. 2. Run the microtask checkpoint — drain the entire microtask queue (Promises, queueMicrotask, MutationObserver). 3. If it is time to render (~16ms since last frame), run the rendering steps: resize events, scroll events, requestAnimationFrame callbacks, style recalc, layout, paint. 4. If the task queues are empty, wait for new tasks or run requestIdleCallback work.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Task Queues (Macrotasks)',
      },
      {
        type: 'text',
        content:
          'The event loop maintains multiple task queues, not just one. Different event sources post to different queues: user interaction events, timer callbacks (setTimeout/setInterval), network callbacks, DOM manipulation tasks, and more. The browser scheduler decides which queue to pull from next based on priority. User input events typically get the highest priority so the page feels responsive.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Different task sources → different queues
setTimeout(() => console.log('timer'), 0);        // Timer task queue
fetch('/api').then(() => console.log('network'));  // Microtask (Promise)
button.addEventListener('click', () => {           // User interaction queue
  console.log('click');
});

// Execution order when click happens during pending timer:
// 1. "click"    — user interaction has highest priority
// 2. "network"  — microtask runs after click task
// 3. "timer"    — timer queue is lower priority`,
        caption: 'Task queue priorities affect execution order',
      },
      {
        type: 'diagram',
        diagramId: 'browser-event-loop',
        caption: 'Browser event loop showing task selection, microtask checkpoint, and rendering steps',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Microtask Checkpoint',
      },
      {
        type: 'text',
        content:
          'After every task (and after certain DOM callbacks), the event loop runs a microtask checkpoint. This drains the entire microtask queue — including any microtasks queued by microtasks — before moving on. Microtasks include Promise `.then`/`.catch`/`.finally` callbacks, `queueMicrotask()` callbacks, and `MutationObserver` notifications. Because the microtask queue is fully drained, a microtask that endlessly enqueues more microtasks will block rendering indefinitely.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Microtask queue is fully drained before rendering
Promise.resolve().then(() => console.log('micro 1'));
Promise.resolve().then(() => {
  console.log('micro 2');
  // This microtask is added and runs before any rendering
  Promise.resolve().then(() => console.log('micro 3'));
});

// Output order: "micro 1", "micro 2", "micro 3"
// Only after ALL microtasks drain will rendering proceed

// WARNING: This blocks forever — no rendering, no input
function bad() {
  queueMicrotask(bad);  // infinite microtask loop
}`,
        caption: 'Microtask queue draining behavior and infinite loop danger',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Rendering Steps',
      },
      {
        type: 'text',
        content:
          'If approximately 16ms have passed since the last frame (for 60fps displays), the event loop enters the rendering steps. This happens at most once per frame and includes: dispatching resize and scroll events, running `requestAnimationFrame` callbacks, recalculating styles, running layout, updating paint records, and compositing. The browser may skip rendering steps if nothing visual has changed or if the tab is hidden.',
      },
      {
        type: 'comparison',
        leftTitle: 'setTimeout(fn, 0)',
        rightTitle: 'requestAnimationFrame(fn)',
        leftContent:
          'Queues a macrotask that runs at the next opportunity. Not synchronized with rendering — may fire multiple times between frames or miss a frame entirely. Minimum delay is ~4ms in nested calls. Continues to fire in background tabs (throttled to 1/sec).',
        rightContent:
          'Callback runs exactly once per frame, right before style/layout/paint. Perfectly synchronized with the display refresh rate. Automatically paused when the tab is hidden. Ideal for visual updates and animations.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Task Prioritization in Blink',
      },
      {
        type: 'text',
        content:
          'Blink\'s scheduler assigns priorities to task queues to keep the page responsive. During user interaction, input-related tasks are boosted. During page load, tasks that block first paint are prioritized. During idle periods, lower-priority cleanup tasks run. The scheduler also implements task yielding — long tasks can voluntarily yield control using `scheduler.yield()` (or the older pattern of `setTimeout(continuation, 0)`) to avoid blocking input.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Modern task scheduling with the Scheduler API
// High priority — runs before normal tasks
scheduler.postTask(() => {
  updateCriticalUI();
}, { priority: 'user-blocking' });

// Normal priority
scheduler.postTask(() => {
  processData();
}, { priority: 'user-visible' });

// Low priority — runs during idle time
scheduler.postTask(() => {
  sendAnalytics();
}, { priority: 'background' });

// Yielding to keep main thread responsive
async function processLargeArray(items) {
  for (let i = 0; i < items.length; i++) {
    processItem(items[i]);
    if (i % 100 === 0) {
      await scheduler.yield();  // let input events run
    }
  }
}`,
        caption: 'Scheduler API for controlling task priority and yielding the main thread',
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Long Tasks and Interaction to Next Paint (INP)',
        content:
          'A "long task" is any task that takes more than 50ms, blocking the main thread from responding to input. Chrome\'s INP (Interaction to Next Paint) metric measures the worst-case delay between user input and the next visual update. Breaking long tasks into smaller chunks with `scheduler.yield()` or `setTimeout` is the primary strategy for improving INP.',
      },
    ],
  },
];
