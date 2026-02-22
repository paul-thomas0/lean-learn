import type { Section } from '../../../types';

export const denoComparisonSections: Section[] = [
  {
    id: 'node-deno-comparison',
    title: 'Node.js vs Deno',
    content: [
      {
        type: 'text',
        content:
          "Deno is a JavaScript/TypeScript runtime created by Ryan Dahl — the original creator of Node.js. Like Node.js, Deno embeds V8 for JavaScript execution. However, Deno was designed from scratch to address architectural decisions in Node.js that Dahl later considered mistakes: the lack of a security sandbox, the centralized npm registry, the CommonJS module system, and the need for a build system (node-gyp) for native extensions. Despite these differences, both runtimes execute JavaScript on V8 and share the same engine internals (hidden classes, TurboFan, garbage collection).",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Runtime Architecture',
      },
      {
        type: 'comparison',
        leftTitle: 'Node.js',
        rightTitle: 'Deno',
        leftContent:
          "Written in **C++**. Uses **libuv** for async I/O and the event loop. Native addons use V8 C++ API or Node-API. Bundled with npm as the package manager. Uses `node-gyp` (Python + C++ toolchain) to compile native modules. The runtime has evolved incrementally since 2009, carrying legacy decisions (CommonJS, `require()`, callback-first APIs).",
        rightContent:
          "Written in **Rust**. Uses **Tokio** (a Rust async runtime) instead of libuv for async I/O. Native extensions use Rust FFI or WebAssembly. No bundled package manager — uses URL imports or the `deno.land/x` registry (though Deno 2.0+ added npm compatibility). Built-in toolchain: formatter, linter, test runner, bundler, and documentation generator.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Security Model',
      },
      {
        type: 'text',
        content:
          "One of Deno's headline features is its **permissions-based security model**. By default, Deno scripts have no access to the file system, network, environment variables, or subprocess spawning. Access must be explicitly granted via command-line flags (`--allow-read`, `--allow-net`, `--allow-env`, etc.) or prompted at runtime. Node.js, by contrast, runs with full access to everything the OS user can access — any `require()`'d module has the same permissions as the main script. Node.js introduced an experimental permission model in v20, but it is not the default and is far less mature.",
      },
      {
        type: 'code',
        language: 'bash',
        code: `# Deno: explicit permissions required
deno run --allow-read=/tmp --allow-net=api.example.com app.ts

# Node.js: full access by default
node app.js

# Node.js experimental permissions (v20+):
node --experimental-permission --allow-fs-read=/tmp app.js`,
        caption:
          'Deno requires explicit permission grants; Node.js runs with full access by default',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Module System & TypeScript',
      },
      {
        type: 'comparison',
        leftTitle: 'Node.js Modules',
        rightTitle: 'Deno Modules',
        leftContent:
          "Originally CommonJS only (`require()`, `module.exports`). ES modules (`import/export`) added in v12+ with `.mjs` extension or `\"type\": \"module\"` in package.json. TypeScript requires a separate compilation step (tsc, ts-node, tsx, or a bundler). The dual CJS/ESM ecosystem creates compatibility complexity. Modules are resolved from `node_modules/` via a hierarchical lookup algorithm.",
        rightContent:
          "ES modules only — no CommonJS support (until Deno 2.0 added Node.js compatibility). Modules are imported by **URL** (`import { x } from 'https://deno.land/std/path/mod.ts'`). TypeScript is a **first-class citizen** — Deno compiles `.ts` files natively using a built-in TypeScript compiler (swc-based transpilation + tsc for type-checking). Deno 2.0+ supports `npm:` specifiers for importing npm packages directly.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'What They Share: V8',
      },
      {
        type: 'text',
        content:
          "Despite their architectural differences, both Node.js and Deno execute JavaScript on the same V8 engine. This means they share identical JavaScript performance characteristics: the same JIT compilation pipeline (Ignition, Sparkplug, Maglev, TurboFan), the same hidden class / inline cache optimization strategies, the same garbage collector (Orinoco), and the same WebAssembly implementation (Liftoff + TurboFan). A computationally intensive pure-JavaScript function will run at virtually the same speed in both runtimes. Performance differences arise from the I/O layer (libuv vs Tokio), the binding overhead, and runtime-specific API implementations.",
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Deno 2.0 and Node.js Compatibility',
        content:
          "Deno 2.0 (released October 2024) added backward compatibility with Node.js and npm. It supports `npm:` specifiers for importing npm packages, recognizes `package.json`, and implements many Node.js built-in APIs (`node:fs`, `node:path`, etc.). This significantly reduces the migration barrier. However, native addons (`.node` files compiled with node-gyp) are not supported — Deno encourages WebAssembly or Rust FFI instead.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Other V8-Based Runtimes',
        content:
          "Node.js and Deno are not the only server-side V8 embedders. **Bun** uses JavaScriptCore (not V8) and focuses on speed. **Cloudflare Workers** embed V8 in a security-sandboxed edge environment. **Google Apps Script** runs on V8. **Electron** embeds both Chromium (with V8) and Node.js. The V8 embedding API makes it possible for anyone to build a custom JavaScript runtime tailored to their specific needs.",
      },
    ],
  },
];
