import type { Section } from '../../../types';

export const threadPoolSections: Section[] = [
  {
    id: 'node-thread-pool',
    title: 'Thread Pool & Worker Threads',
    content: [
      {
        type: 'text',
        content:
          "Although Node.js executes JavaScript on a single main thread, it is not truly single-threaded at the system level. libuv maintains a **thread pool** for operations that cannot be performed asynchronously using OS-level non-blocking APIs. Additionally, the `worker_threads` module allows developers to spawn separate JavaScript execution threads, each with their own V8 isolate. Understanding when and how threads are used in Node.js is critical for diagnosing performance bottlenecks and designing scalable applications.",
      },
      {
        type: 'heading',
        level: 2,
        text: "libuv's Thread Pool",
      },
      {
        type: 'text',
        content:
          "libuv's thread pool exists because not all operating systems provide non-blocking APIs for every type of I/O. For example, POSIX file system operations (`open`, `read`, `write`, `stat`) are always blocking. Rather than blocking the main event loop thread, libuv offloads these operations to a pool of worker threads. The thread pool has a **default size of 4 threads**, configurable via the `UV_THREADPOOL_SIZE` environment variable (maximum 1024). All libuv thread pool work is queued globally — every operation shares the same pool.",
      },
      {
        type: 'diagram',
        diagramId: 'thread-pool',
        caption:
          'The main event loop thread dispatches blocking operations to the libuv thread pool',
      },
      {
        type: 'key-concept',
        title: 'Operations That Use the Thread Pool',
        content:
          "The following Node.js operations are offloaded to the libuv thread pool:\n\n- **File system** — All `fs.*` operations (except `fs.watch()` and `FSWatcher`, which use OS-level file watchers)\n- **DNS** — `dns.lookup()` (uses `getaddrinfo`, which is blocking). Note: `dns.resolve*()` methods use c-ares and do NOT use the thread pool\n- **Crypto** — `crypto.pbkdf2()`, `crypto.scrypt()`, `crypto.randomBytes()`, `crypto.randomFill()`\n- **Zlib** — All compression/decompression operations (`zlib.deflate()`, `zlib.gzip()`, etc.)\n- **Some C++ addons** — Custom native addons that use `uv_queue_work()`",
      },
      {
        type: 'code',
        language: 'bash',
        code: `# Increase the thread pool size before starting Node.js
UV_THREADPOOL_SIZE=16 node server.js

# Check current pool size from within Node.js:
# process.env.UV_THREADPOOL_SIZE (must be set before any async operations)`,
        caption:
          'Set UV_THREADPOOL_SIZE before starting Node.js — it cannot be changed at runtime',
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'Thread Pool Saturation',
        content:
          "With only 4 default threads, the thread pool can become a bottleneck. If you make 100 concurrent `fs.readFile()` calls, only 4 can execute at a time — the rest queue up. This also means `dns.lookup()` calls (used by default for `http.get()` and similar) compete with `fs` and `crypto` operations for the same pool. For I/O-heavy servers, increasing `UV_THREADPOOL_SIZE` to 16-128 can significantly improve throughput. For DNS-heavy applications, prefer `dns.resolve()` (which uses c-ares and the event loop, not the thread pool).",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Worker Threads',
      },
      {
        type: 'text',
        content:
          "The `worker_threads` module (stable since Node.js v12) lets you run JavaScript in parallel OS threads. Each worker thread gets its own **V8 isolate** with its own heap, event loop, and module system. Workers do not share memory by default (objects are serialized via the structured clone algorithm), but they can share memory explicitly using `SharedArrayBuffer` and `Atomics`. Worker threads are ideal for CPU-intensive tasks like image processing, data parsing, or cryptographic operations that would otherwise block the main event loop.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // Main thread: spawn a worker
  const worker = new Worker(__filename, {
    workerData: { input: [10, 20, 30] }
  });
  worker.on('message', (result) => {
    console.log('Result from worker:', result); // 60
  });
  worker.on('error', (err) => console.error(err));
} else {
  // Worker thread: each has its own V8 Isolate
  const sum = workerData.input.reduce((a, b) => a + b, 0);
  parentPort.postMessage(sum);
}`,
        caption:
          'Worker threads run separate V8 isolates — no shared JS heap, communication via message passing',
      },
      {
        type: 'comparison',
        leftTitle: 'libuv Thread Pool',
        rightTitle: 'Worker Threads',
        leftContent:
          'Managed automatically by libuv. Runs C/C++ code (not JavaScript). Fixed pool of threads shared by fs, DNS, crypto, and zlib operations. Cannot be controlled from JavaScript directly. Configurable size via UV_THREADPOOL_SIZE environment variable.',
        rightContent:
          'Managed explicitly by the developer. Each worker runs a full V8 isolate executing JavaScript. Communicate via message passing (structured clone) or SharedArrayBuffer. Ideal for CPU-intensive JavaScript work. Each worker has its own event loop and can use the full Node.js API.',
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'When to Use Worker Threads vs Cluster',
        content:
          "Use `worker_threads` for CPU-intensive JavaScript operations that would block the event loop (parsing, compression, computation). Use the `cluster` module when you need to scale your HTTP server across multiple CPU cores — cluster forks entire Node.js processes that share a listening socket. Workers share process memory space (with isolation); cluster processes are fully independent OS processes with separate memory. For most web servers, cluster or a process manager like PM2 is more appropriate than worker threads.",
      },
    ],
  },
];
