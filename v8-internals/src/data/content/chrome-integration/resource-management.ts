import type { Section } from '../../../types';

export const resourceManagementSections: Section[] = [
  {
    id: 'chrome-resource-management',
    title: 'Tab Resource Management',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Managing Resources Across Tabs',
      },
      {
        type: 'text',
        content:
          'Users often have dozens of tabs open, but only one is actively in use. Chrome uses a progressive strategy to reduce the resource consumption of inactive tabs: first throttling, then freezing, and finally discarding. Each step is more aggressive but recovers more resources. This system lets Chrome handle many tabs without exhausting system memory or draining battery life.',
      },
      {
        type: 'key-concept',
        title: 'Three Stages of Tab Resource Reclamation',
        content:
          '1. **Throttling**: Background tabs have their timers and rAF callbacks severely limited (timers capped at 1/sec, rAF paused). The tab is still alive and can process events. 2. **Freezing**: The tab is fully paused — no tasks run at all. The page can be unfrozen when the user returns. 3. **Discarding**: The renderer process is killed entirely, freeing all its memory. The tab remains in the tab strip with its title and favicon, and Chrome reloads it when the user clicks on it.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Tab Throttling',
      },
      {
        type: 'text',
        content:
          'When a tab moves to the background, Chrome immediately applies throttling. `setTimeout` and `setInterval` callbacks are capped to fire at most once per second (normally the minimum is ~4ms). `requestAnimationFrame` callbacks stop entirely because there is no visible frame to render. The Web Audio API is allowed to continue. Intensive throttling, introduced in Chrome 87, goes further: after 5 minutes in the background, chained timers (setTimeout calling setTimeout) are limited to once per minute.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Foreground tab behavior:
setInterval(() => {
  console.log('tick');  // fires every 100ms as requested
}, 100);

// After moving to background (< 5 minutes):
// → fires once per second (1000ms), not every 100ms

// After 5 minutes in background (intensive throttling):
// → chained timers fire once per minute (60000ms)

// requestAnimationFrame:
requestAnimationFrame(animate);
// → paused entirely in background tabs
// → resumes when tab becomes visible again`,
        caption: 'Timer behavior changes for background tabs',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Tab Freezing',
      },
      {
        type: 'text',
        content:
          'Frozen tabs consume no CPU at all — the event loop is paused and no tasks execute. Chrome proactively freezes tabs that have been hidden for several minutes and are not doing user-perceptible work (no audio playback, no active WebSocket connections, no ongoing downloads). The tab\'s renderer process remains alive, so V8 heap and Blink DOM structures are preserved in memory. When the user returns to a frozen tab, it resumes instantly without a page reload.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Tab Discarding',
      },
      {
        type: 'text',
        content:
          'Under memory pressure, Chrome discards tabs to reclaim memory. Discarding kills the renderer process entirely, freeing all its memory (V8 heap, DOM, layout trees, decoded images — everything). The tab remains in the tab strip with its title and favicon. When the user clicks the tab, Chrome navigates to the URL again, triggering a full page reload. Chrome chooses which tabs to discard based on a heuristic that considers recency of use, whether the tab is playing audio, and whether it has form data.',
      },
      {
        type: 'comparison',
        leftTitle: 'Frozen Tab',
        rightTitle: 'Discarded Tab',
        leftContent:
          'Event loop paused, no CPU usage. Memory is still allocated (V8 heap, DOM, images). Resumes instantly when user returns. JavaScript state is fully preserved — in-memory variables, WebSocket objects all intact.',
        rightContent:
          'Process killed, zero memory usage. All JavaScript state is lost. Requires full page reload when user returns. In-flight requests, form data, scroll position may be lost unless the page handles the Page Lifecycle API.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Memory Pressure Signals',
      },
      {
        type: 'text',
        content:
          'The operating system signals Chrome when memory is running low. On Windows, this comes from memory pressure notifications. On macOS, it comes from the Mach memory pressure system. On Linux, Chrome monitors `/proc/meminfo` and cgroup limits. On Android, Chrome receives `onTrimMemory` callbacks. When pressure increases, Chrome escalates its response: first triggering V8 garbage collection in background tabs, then freezing tabs, then discarding them in order of least recent use.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Page Lifecycle API',
      },
      {
        type: 'text',
        content:
          'The Page Lifecycle API gives web pages visibility into the browser\'s resource management decisions. The `freeze` and `resume` events fire when a tab is frozen or unfrozen. The `document.wasDiscarded` property tells a page that it was previously discarded and is now being reloaded. This lets applications save state before freezing and restore it after a discard.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Listen for the page being frozen
document.addEventListener('freeze', () => {
  // Save application state — no async work allowed here
  sessionStorage.setItem('appState',
    JSON.stringify(getAppState()));
  // Close non-essential connections
  analyticsSocket.close();
});

// Listen for the page being resumed after freeze
document.addEventListener('resume', () => {
  // Re-establish connections, refresh stale data
  reconnectWebSocket();
  refreshDataIfStale();
});

// Detect if the page was discarded and reloaded
if (document.wasDiscarded) {
  const savedState = sessionStorage.getItem('appState');
  if (savedState) {
    restoreAppState(JSON.parse(savedState));
    showNotification('Tab was reloaded to save memory');
  }
}`,
        caption: 'Using the Page Lifecycle API to handle freezing and discarding',
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Debugging Tab Lifecycle',
        content:
          'Visit `chrome://discards` to see the lifecycle state of every tab (active, throttled, frozen, discarded) and manually trigger freezing or discarding for testing. This is invaluable for verifying your Page Lifecycle API handlers work correctly.',
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Impact on Web Applications',
        content:
          'Long-running background tabs (dashboards, chat apps, real-time feeds) are most affected by throttling and freezing. Use the Page Lifecycle API to pause unnecessary work when hidden, persist state before freeze, and gracefully handle reload after discard. Service Workers can handle push notifications even when the tab is discarded.',
      },
    ],
  },
];
