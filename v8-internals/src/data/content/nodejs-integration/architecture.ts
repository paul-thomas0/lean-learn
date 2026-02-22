import type { Section } from '../../../types';

export const nodeArchitectureSections: Section[] = [
  {
    id: 'node-architecture',
    title: 'Node.js Architecture',
    content: [
      {
        type: 'text',
        content:
          "Node.js is a runtime that allows JavaScript to run outside the browser by embedding Google's V8 engine inside a C++ application. Unlike browsers — which pair V8 with a rendering engine and Web APIs — Node.js pairs V8 with **libuv** (for asynchronous I/O) and a set of C++ bindings that expose operating system functionality to JavaScript. Understanding this layered architecture is essential to understanding how Node.js achieves high-throughput, non-blocking I/O with a single-threaded JavaScript execution model.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Layered Architecture',
      },
      {
        type: 'text',
        content:
          "Node.js has a clear layered structure. At the top is your **JavaScript application code**. Below that is the **Node.js standard library** (`fs`, `http`, `crypto`, `stream`, etc.) — written mostly in JavaScript but with performance-critical parts in C++. These standard library modules call into **C++ bindings** (the internal binding layer), which interface with two core dependencies: **V8** for JavaScript execution and **libuv** for cross-platform asynchronous I/O. At the bottom is the **operating system**, providing syscalls for file I/O, networking, timers, and process management.",
      },
      {
        type: 'diagram',
        diagramId: 'node-architecture',
        caption:
          'Node.js layered architecture: JS Userland -> Node.js stdlib -> C++ Bindings -> V8 + libuv -> Operating System',
      },
      {
        type: 'key-concept',
        title: 'V8 as an Embedded Engine',
        content:
          "V8 is designed to be embeddable. Node.js creates a V8 **Isolate** (an isolated instance of the V8 engine with its own heap) and a **Context** (a sandboxed execution environment with its own global object). Node.js then extends the global scope by injecting its own APIs — `require()`, `process`, `Buffer`, `__dirname`, and others — that don't exist in V8 itself. V8 handles parsing, compiling, and executing JavaScript; Node.js provides the runtime environment around it.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Role of libuv',
      },
      {
        type: 'text',
        content:
          "**libuv** is a C library originally written for Node.js that provides cross-platform asynchronous I/O. It abstracts away OS-specific mechanisms — `epoll` on Linux, `kqueue` on macOS/BSD, and `IOCP` on Windows — behind a unified API. libuv provides the **event loop**, a **thread pool** for blocking operations, async TCP/UDP sockets, async DNS resolution, file system operations, child processes, signal handling, and high-resolution timers. Without libuv, Node.js would need platform-specific code for every I/O operation.",
      },
      {
        type: 'code',
        language: 'cpp',
        code: `// Simplified: How Node.js initializes V8 and libuv
#include <v8.h>
#include <uv.h>

int main(int argc, char* argv[]) {
  // Initialize V8
  v8::V8::InitializePlatform(platform);
  v8::V8::Initialize();

  // Create an Isolate (one per Node.js instance)
  v8::Isolate* isolate = v8::Isolate::New(create_params);

  // Create a Context with Node.js globals
  v8::Local<v8::Context> context = v8::Context::New(isolate);

  // Initialize libuv event loop
  uv_loop_t* loop = uv_default_loop();

  // Load and execute the user's JavaScript
  ExecuteScript(isolate, context, "app.js");

  // Run the libuv event loop until no more work
  uv_run(loop, UV_RUN_DEFAULT);

  return 0;
}`,
        caption:
          'Simplified pseudocode showing how Node.js bootstraps V8 and libuv together',
      },
      {
        type: 'heading',
        level: 2,
        text: 'C++ Bindings and Addons',
      },
      {
        type: 'text',
        content:
          "Node.js exposes native functionality to JavaScript through **C++ bindings**. When you call `fs.readFile()`, the JavaScript standard library eventually calls into a C++ function registered with V8. This C++ function uses libuv to perform the actual file read asynchronously. The result is passed back through V8's callback mechanism. Developers can also write their own **native addons** — shared libraries (`.node` files) written in C/C++ that extend Node.js with custom native functionality, useful for CPU-intensive work, interfacing with system libraries, or reusing existing C/C++ code.",
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Key Dependencies Beyond V8 and libuv',
        content:
          "Node.js bundles several other important C/C++ libraries: **llhttp** (HTTP parser, replaced the older http_parser), **c-ares** (async DNS resolution, used alongside libuv's DNS), **OpenSSL** (TLS/SSL and cryptographic operations), **zlib** (compression), and **ICU** (internationalization). Each of these is accessed through the same C++ binding layer that bridges JavaScript and native code.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Single-Threaded Does Not Mean Single-Process',
        content:
          "Node.js runs your JavaScript on a single thread (the main thread / event loop thread), but it is not limited to a single thread internally. libuv maintains a thread pool (default 4 threads) for blocking operations like file I/O and DNS lookups. Additionally, the `cluster` module lets you fork multiple Node.js processes sharing the same port, and the `worker_threads` module lets you spawn true OS threads running separate V8 isolates for CPU-intensive work.",
      },
    ],
  },
];
