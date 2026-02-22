import type { QuizQuestion } from '../../../types';

export const nodejsIntegrationQuiz: QuizQuestion[] = [
  {
    question: 'Which library provides the event loop implementation in Node.js?',
    options: ['V8', 'libuv', 'Blink', 'Tokio'],
    correctIndex: 1,
    explanation:
      "libuv is the C library that implements Node.js's event loop and provides cross-platform asynchronous I/O. V8 provides JavaScript execution but has no built-in event loop.",
    sectionRef: 'node-architecture',
  },
  {
    question: 'In which event loop phase does setImmediate() execute its callbacks?',
    options: ['Timers phase', 'Poll phase', 'Check phase', 'Close callbacks phase'],
    correctIndex: 2,
    explanation:
      'setImmediate() callbacks are executed in the check phase, which runs immediately after the poll phase completes. This is why setImmediate() always fires before setTimeout() when both are scheduled inside an I/O callback.',
    sectionRef: 'node-event-loop',
  },
  {
    question: 'What is the default number of threads in the libuv thread pool?',
    options: ['1', '4', '8', '16'],
    correctIndex: 1,
    explanation:
      'libuv has a default thread pool size of 4 threads. This can be configured via the UV_THREADPOOL_SIZE environment variable (up to 1024), but must be set before any async operations are initiated.',
    sectionRef: 'node-thread-pool',
  },
  {
    question: 'Which DNS method in Node.js does NOT use the libuv thread pool?',
    options: ['dns.lookup()', 'dns.resolve()', 'dns.lookup() with hints', 'dns.lookupService()'],
    correctIndex: 1,
    explanation:
      'dns.resolve() (and all dns.resolve*() variants) use the c-ares library, which performs asynchronous DNS resolution on the event loop without using the thread pool. dns.lookup() uses the blocking getaddrinfo system call and requires the thread pool.',
    sectionRef: 'node-thread-pool',
  },
  {
    question: 'What is the primary advantage of Node-API (N-API) over the raw V8 C++ API for native addons?',
    options: [
      'Better performance for computation',
      'ABI stability across Node.js versions',
      'Access to more V8 internals',
      'Automatic TypeScript type generation',
    ],
    correctIndex: 1,
    explanation:
      'Node-API provides an ABI-stable interface, meaning native addons compiled with Node-API work across different Node.js versions without recompilation. The raw V8 API changes between V8 versions, requiring addons to be recompiled for each Node.js major version.',
    sectionRef: 'node-v8-bindings',
  },
  {
    question: 'In Node.js, what is the execution order of process.nextTick() callbacks relative to Promise microtasks?',
    options: [
      'Promise microtasks fire first',
      'process.nextTick() fires first',
      'They execute in the order they were scheduled',
      'They execute simultaneously on different threads',
    ],
    correctIndex: 1,
    explanation:
      'process.nextTick() callbacks are processed before Promise microtasks at each microtask checkpoint. The nextTick queue is drained completely before the Promise microtask queue is processed.',
    sectionRef: 'node-event-loop',
  },
  {
    question: 'How many distinct queues does the Node.js event loop manage in total?',
    options: ['4 (one per phase)', '6 (one per phase)', '8 (6 macrotask + 2 microtask)', '2 (macrotask + microtask)'],
    correctIndex: 2,
    explanation:
      'Node.js manages 8 queues: 6 macrotask queues (one for each libuv phase — timers, pending I/O, idle/prepare, poll, check, close) plus 2 microtask queues (nextTick queue and Promise microtask queue).',
    sectionRef: 'node-queue-system',
  },
  {
    question: 'Which queue does queueMicrotask() place its callback into?',
    options: ['The nextTick queue', 'The Promise microtask queue', 'The check queue', 'The timer queue'],
    correctIndex: 1,
    explanation:
      'queueMicrotask() places callbacks in the Promise microtask queue, not the nextTick queue. This means process.nextTick() callbacks always run before queueMicrotask() callbacks at each microtask checkpoint.',
    sectionRef: 'node-queue-system',
  },
  {
    question: 'Why does the poll phase sometimes block instead of immediately moving to the next phase?',
    options: [
      'It is a bug in older Node.js versions',
      'It blocks to wait for I/O events when the poll queue is empty and no timers or setImmediate callbacks are pending',
      'It always blocks for exactly 1 second',
      'It blocks to allow microtasks to drain',
    ],
    correctIndex: 1,
    explanation:
      'The poll phase blocks and waits for I/O events when its queue is empty, making Node.js efficient by sleeping instead of busy-looping. It stops blocking if a setImmediate() callback is pending or a timer threshold has elapsed.',
    sectionRef: 'node-queue-system',
  },
  {
    question: 'How does the browser event loop differ from the Node.js event loop regarding rendering?',
    options: [
      'Both have a rendering step but with different timing',
      'Node.js uses requestAnimationFrame for rendering',
      'The browser event loop includes a rendering step; Node.js does not',
      'Neither has a rendering step — rendering is handled separately',
    ],
    correctIndex: 2,
    explanation:
      'The browser event loop interleaves task execution with rendering steps (style, layout, paint) targeting 60fps. Node.js has no rendering pipeline since it has no UI — its event loop handles only I/O and timer processing.',
    sectionRef: 'node-event-loop-comparison',
  },
  {
    question: 'What async I/O library does Deno use instead of libuv?',
    options: ['libevent', 'Boost.Asio', 'Tokio', 'mio'],
    correctIndex: 2,
    explanation:
      'Deno is written in Rust and uses Tokio — a Rust async runtime — for its event loop and asynchronous I/O, replacing the C-based libuv used by Node.js.',
    sectionRef: 'node-deno-comparison',
  },
  {
    question: 'What does a v8::HandleScope do in the V8 C++ API?',
    options: [
      'Manages network connection handles',
      'Creates a scope that automatically frees Local handles when it exits',
      'Provides a global registry of all JavaScript objects',
      'Isolates V8 instances from each other',
    ],
    correctIndex: 1,
    explanation:
      'A HandleScope is a stack-allocated container for Local<T> handles. When a HandleScope is destroyed (goes out of scope), all Local handles created within it are automatically freed. This prevents handle table overflow, especially in loops that create many temporary JavaScript values.',
    sectionRef: 'node-v8-bindings',
  },
  {
    question: 'Since Node.js v11, when are microtasks drained in the event loop?',
    options: [
      'Only between event loop phases',
      'Only at the end of each full event loop iteration',
      'Between each phase and after each individual callback',
      'Only when explicitly flushed with process.flushMicrotasks()',
    ],
    correctIndex: 2,
    explanation:
      'Since Node.js v11, microtasks are drained between each event loop phase and after each individual callback within a phase. This aligns Node.js behavior with browsers, where microtasks drain after each task. Before v11, microtasks were only drained between phases.',
    sectionRef: 'node-event-loop-comparison',
  },
];
