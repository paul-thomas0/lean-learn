import type { QuizQuestion } from '../../../types';

export const chromeIntegrationQuiz: QuizQuestion[] = [
  {
    question: 'What is the primary role of the browser process in Chrome\'s multi-process architecture?',
    options: [
      'Executing JavaScript for all tabs',
      'Managing UI, network, storage, and coordinating other processes',
      'Compositing rendered layers and drawing to the screen',
      'Running the Blink rendering engine for the active tab',
    ],
    correctIndex: 1,
    explanation:
      'The browser process is the main coordinator that manages the UI chrome (address bar, tabs), handles network requests, manages file system access, and orchestrates all other processes. It is the most privileged process and the only one that can perform operations like disk I/O and network connections.',
    sectionRef: 'chrome-multi-process',
  },
  {
    question: 'In Chrome\'s renderer process, what is the relationship between Blink and V8?',
    options: [
      'They run in separate processes and communicate via Mojo IPC',
      'V8 is embedded within Blink; they share the main thread and Blink creates V8 Isolates and Contexts',
      'Blink is embedded within V8 and uses V8\'s DOM implementation',
      'They run on separate threads within the renderer process and never share data',
    ],
    correctIndex: 1,
    explanation:
      'Blink owns the DOM, CSS engine, and layout system, while V8 provides JavaScript execution. Blink creates V8 Isolates and Contexts and exposes DOM APIs to JavaScript through V8\'s binding layer. They share the same main thread within the renderer process.',
    sectionRef: 'chrome-renderer-internals',
  },
  {
    question: 'Why can CSS transform and opacity animations run at 60fps even when the main thread is busy?',
    options: [
      'CSS animations bypass V8 entirely and are handled by the GPU directly',
      'The compositor thread handles these animations independently of the main thread',
      'Chrome pre-computes all animation frames during style calculation',
      'The browser process takes over animation when the main thread is blocked',
    ],
    correctIndex: 1,
    explanation:
      'The renderer has a separate compositor thread that handles scrolling, CSS transform/opacity animations, and layer compositing independently of the main thread. This separation means these animations continue smoothly even when JavaScript is blocking the main thread.',
    sectionRef: 'chrome-renderer-internals',
  },
  {
    question: 'What happens during the microtask checkpoint in the browser event loop?',
    options: [
      'One microtask is dequeued and executed, then the loop continues',
      'The entire microtask queue is drained, including microtasks added by microtasks',
      'Microtasks are batched and executed together at the next rendering step',
      'Microtasks are interleaved with macrotasks in round-robin order',
    ],
    correctIndex: 1,
    explanation:
      'After every macrotask, the event loop runs a microtask checkpoint that completely drains the microtask queue. This includes any new microtasks added during microtask execution. This is why an infinite microtask loop will block rendering indefinitely.',
    sectionRef: 'chrome-event-loop',
  },
  {
    question: 'What is the key difference between requestAnimationFrame and setTimeout(fn, 0) for visual updates?',
    options: [
      'requestAnimationFrame runs before setTimeout in the same task queue',
      'setTimeout is more reliable because it has a guaranteed minimum delay',
      'requestAnimationFrame is synchronized with the display refresh rate; setTimeout is not',
      'There is no meaningful difference for visual updates',
    ],
    correctIndex: 2,
    explanation:
      'requestAnimationFrame callbacks run exactly once per frame, right before style/layout/paint, synchronized with the display refresh rate. setTimeout fires as a macrotask that is not synchronized with rendering — it may fire multiple times between frames or miss frames entirely.',
    sectionRef: 'chrome-event-loop',
  },
  {
    question: 'What motivated Chrome to implement Site Isolation as a default feature?',
    options: [
      'The desire to improve JavaScript execution speed by isolating V8 heaps',
      'Spectre CPU vulnerabilities that allowed JavaScript to read cross-origin memory in the same process',
      'Web developers requested separate processes for easier debugging',
      'Chrome needed to support WebAssembly threads across multiple origins',
    ],
    correctIndex: 1,
    explanation:
      'The Spectre vulnerability (January 2018) allowed any code running in a process — including JavaScript — to potentially read all memory in that process via speculative execution side channels. Site Isolation ensures cross-site data is never in the same address space, making cross-site Spectre attacks impossible.',
    sectionRef: 'chrome-site-isolation',
  },
  {
    question: 'What does Cross-Origin Read Blocking (CORB) protect against?',
    options: [
      'Cross-origin JavaScript function calls between iframes',
      'Attackers loading sensitive cross-origin HTML/JSON responses into their renderer process via resource tags like <img>',
      'Cross-origin WebSocket connections stealing authentication cookies',
      'DNS rebinding attacks that bypass same-origin policy checks',
    ],
    correctIndex: 1,
    explanation:
      'CORB prevents the network service from delivering certain cross-origin HTTP responses (HTML, XML, JSON) to a renderer that should not have them. If an attacker page uses <img src="https://bank.com/data">, CORB strips the response body before it reaches the attacker\'s renderer process.',
    sectionRef: 'chrome-site-isolation',
  },
  {
    question: 'What happens to setTimeout intervals when a tab is in the background for more than 5 minutes?',
    options: [
      'They continue to fire at the requested interval',
      'They are paused entirely until the tab is foregrounded',
      'Chained timers are limited to firing at most once per minute',
      'They are converted to requestIdleCallback automatically',
    ],
    correctIndex: 2,
    explanation:
      'Chrome\'s intensive throttling (introduced in Chrome 87) limits chained timers (setTimeout calling setTimeout) to firing at most once per minute after a tab has been in the background for 5 minutes. Regular throttling caps timers to once per second immediately upon backgrounding.',
    sectionRef: 'chrome-resource-management',
  },
  {
    question: 'What is the difference between a frozen tab and a discarded tab?',
    options: [
      'There is no difference; both terms describe the same state',
      'A frozen tab\'s event loop is paused but memory is preserved; a discarded tab\'s process is killed and requires a full reload',
      'A frozen tab uses no memory; a discarded tab keeps its DOM in memory',
      'A frozen tab can still receive push notifications; a discarded tab cannot',
    ],
    correctIndex: 1,
    explanation:
      'A frozen tab has its event loop paused (zero CPU usage) but all memory is retained — V8 heap, DOM, images. When unfrozen, it resumes instantly. A discarded tab has its renderer process killed, freeing all memory. When the user returns, the page must be fully reloaded from the network.',
    sectionRef: 'chrome-resource-management',
  },
  {
    question: 'Which API lets a web page save state before Chrome freezes or discards it?',
    options: [
      'The Visibility API (visibilitychange event)',
      'The Page Lifecycle API (freeze/resume events and document.wasDiscarded)',
      'The Beacon API (navigator.sendBeacon)',
      'The Background Sync API (ServiceWorker sync event)',
    ],
    correctIndex: 1,
    explanation:
      'The Page Lifecycle API provides `freeze` and `resume` events for handling tab freezing, and the `document.wasDiscarded` property to detect that a page was discarded and reloaded. This lets applications save state to sessionStorage before freeze and restore it after a discard.',
    sectionRef: 'chrome-resource-management',
  },
];
