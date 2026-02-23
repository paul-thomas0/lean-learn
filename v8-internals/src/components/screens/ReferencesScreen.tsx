import { motion } from 'framer-motion';
import type { NavigationTarget } from '../../types';

interface ReferencesScreenProps {
  onNavigate: (target: NavigationTarget) => void;
}

interface ReferenceLink {
  title: string;
  url: string;
  desc: string;
}

interface ReferenceSection {
  category: string;
  icon: string;
  color: string;
  links: ReferenceLink[];
}

const REFERENCES: ReferenceSection[] = [
  {
    category: "Official V8 Documentation",
    icon: "📖",
    color: "#3b82f6",
    links: [
      { title: "V8 Official Blog", url: "https://v8.dev/blog", desc: "Official V8 blog — detailed posts on every major optimization, feature, and internals change by the V8 team" },
      { title: "V8 Documentation", url: "https://v8.dev/docs", desc: "Official V8 docs — embedding guide, build instructions, and architecture overview" },
      { title: "V8 Source Code (Chromium)", url: "https://chromium.googlesource.com/v8/v8", desc: "Official V8 source repository — explore the actual compiler, runtime, and GC implementation" },
    ],
  },
  {
    category: "Compilation Pipeline",
    icon: "⚙️",
    color: "#22d3ee",
    links: [
      { title: "Ignition — V8's Interpreter (Franziska Hinkelmann)", url: "https://v8.dev/blog/ignition-interpreter", desc: "V8 team's deep dive into the Ignition bytecode interpreter — architecture and design decisions" },
      { title: "TurboFan — V8's Optimizing Compiler", url: "https://v8.dev/docs/turbofan", desc: "Official docs on TurboFan — the Sea of Nodes IR, optimization phases, and code generation" },
      { title: "Sparkplug — V8's Baseline Compiler", url: "https://v8.dev/blog/sparkplug", desc: "Blog post introducing Sparkplug — the non-optimizing compiler that bridges Ignition and TurboFan" },
      { title: "Maglev — V8's Mid-tier Compiler", url: "https://v8.dev/blog/maglev", desc: "Introduction to Maglev — V8's mid-tier optimizing compiler for faster startup" },
      { title: "Liftoff — V8's WebAssembly Baseline Compiler", url: "https://v8.dev/blog/liftoff", desc: "How Liftoff provides fast WebAssembly compilation with minimal optimization overhead" },
    ],
  },
  {
    category: "Hidden Classes & Inline Caches",
    icon: "🔑",
    color: "#4ade80",
    links: [
      { title: "V8's Hidden Classes (Mathias Bynens & Benedikt Meurer)", url: "https://mathiasbynens.be/notes/shapes-ics", desc: "Definitive article on V8 Shapes (hidden classes) and Inline Caches by two V8 team members" },
      { title: "V8 Internals — How Objects Are Represented (Marja Hölttä)", url: "https://v8.dev/blog/fast-properties", desc: "Official V8 blog on fast vs slow properties, in-object storage, and dictionary mode" },
      { title: "What's Up With Monomorphism? (Vyacheslav Egorov)", url: "https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html", desc: "Vyacheslav Egorov (ex-V8 team) explains monomorphic, polymorphic, and megamorphic call sites" },
    ],
  },
  {
    category: "Garbage Collection",
    icon: "♻️",
    color: "#fb923c",
    links: [
      { title: "Trash Talk — V8 Garbage Collection (Peter Marshall)", url: "https://v8.dev/blog/trash-talk", desc: "Official V8 blog post explaining the generational garbage collector — Scavenger and Mark-Compact" },
      { title: "Concurrent Marking in V8", url: "https://v8.dev/blog/concurrent-marking", desc: "How V8 performs garbage collection concurrently with JavaScript execution to reduce pauses" },
      { title: "Orinoco — V8's Parallel GC", url: "https://v8.dev/blog/orinoco", desc: "Overview of the Orinoco project — parallel, concurrent, and incremental garbage collection in V8" },
    ],
  },
  {
    category: "Chrome Architecture & Integration",
    icon: "🌐",
    color: "#a78bfa",
    links: [
      { title: "Inside Look at Modern Web Browser (Mariko Kosaka)", url: "https://developer.chrome.com/blog/inside-browser-part1", desc: "Google's 4-part series on Chrome internals — processes, navigation, rendering, and compositing" },
      { title: "Blink Rendering Engine", url: "https://www.chromium.org/blink/", desc: "Chromium project docs on Blink — how the rendering engine integrates with V8" },
      { title: "Chrome DevTools Protocol", url: "https://chromedevtools.github.io/devtools-protocol/", desc: "Official protocol documentation — how DevTools communicates with V8 for debugging and profiling" },
      { title: "Life of a Pixel (Chrome University)", url: "https://www.youtube.com/watch?v=K2QHdgAKP-s", desc: "Chromium team's comprehensive talk on how a pixel gets rendered — from HTML to screen" },
    ],
  },
  {
    category: "Node.js & V8 Integration",
    icon: "🟢",
    color: "#4ade80",
    links: [
      { title: "Node.js Documentation — V8 Module", url: "https://nodejs.org/api/v8.html", desc: "Official Node.js docs for the v8 module — heap statistics, serialization, and flags" },
      { title: "libuv Documentation", url: "https://docs.libuv.org/en/v1.x/", desc: "Official libuv docs — the event loop, async I/O, and cross-platform abstractions powering Node.js" },
      { title: "Node.js Event Loop (Bert Belder)", url: "https://www.youtube.com/watch?v=PNa9OMajw9w", desc: "Talk by libuv creator explaining how the event loop really works — phases, timers, and I/O" },
      { title: "N-API (Node-API) Documentation", url: "https://nodejs.org/api/n-api.html", desc: "Official docs for Node-API — the stable C/C++ API for building native addons independent of V8 versions" },
    ],
  },
  {
    category: "Performance & Optimization",
    icon: "⚡",
    color: "#f472b6",
    links: [
      { title: "V8 Perf — Thorsten Lorenz", url: "https://github.com/nicknisi/v8-perf", desc: "Community-maintained collection of V8 performance notes — JIT, GC, hidden classes, and profiling tips" },
      { title: "JavaScript Engine Fundamentals — Mathias Bynens", url: "https://mathiasbynens.be/notes/prototypes", desc: "How JavaScript engines optimize prototype chains — by V8 team member Mathias Bynens" },
      { title: "Benedikt Meurer's Blog", url: "https://benediktmeurer.de/", desc: "Blog by V8 tech lead — deep dives into TurboFan optimizations, deoptimizations, and benchmarking" },
    ],
  },
  {
    category: "Community & Talks",
    icon: "🎓",
    color: "#fbbf24",
    links: [
      { title: "Franziska Hinkelmann — JavaScript Engines (JSConf EU)", url: "https://www.youtube.com/watch?v=p-iiEDtpy6I", desc: "Excellent conference talk on how JavaScript engines work — parsing, compilation, and optimization" },
      { title: "Marja Hölttä — Parsing JavaScript (JSConf EU)", url: "https://www.youtube.com/watch?v=Fg7niTmNNLg", desc: "V8 engineer explains how V8 parses JavaScript — lazy parsing, pre-parsing, and script streaming" },
      { title: "Understanding V8's Bytecode — Franziska Hinkelmann", url: "https://medium.com/nicknisi/understanding-v8s-bytecode-317d46c94775", desc: "Practical guide to reading and understanding V8's Ignition bytecodes" },
      { title: "Chrome University (YouTube Playlist)", url: "https://www.youtube.com/playlist?list=PLNYkxOF6rcICgS7eFJrGDhMBwWtdTgzpx", desc: "Google's internal Chrome University talks made public — rendering, networking, security, and V8" },
    ],
  },
];

export function ReferencesScreen({ onNavigate }: ReferencesScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <button
          onClick={() => onNavigate({ screen: 'home' })}
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-4 inline-block"
        >
          ← Back to home
        </button>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">📚 References</h1>
        <p className="text-[var(--text-secondary)]">
          Official documentation, key blog posts, and conference talks to deepen your understanding of V8, Chrome, and Node.js internals
        </p>
      </div>

      <div className="grid gap-6">
        {REFERENCES.map((section, sectionIdx) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: sectionIdx * 0.05 }}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] overflow-hidden"
          >
            <div
              className="flex items-center gap-3 px-5 py-3 border-b border-[var(--border)]"
              style={{ background: `linear-gradient(135deg, ${section.color}08, ${section.color}03)` }}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-sm font-bold" style={{ color: section.color }}>{section.category}</span>
              <span className="ml-auto text-xs text-[var(--text-muted)]">{section.links.length}</span>
            </div>

            <div className="divide-y divide-[var(--border)]">
              {section.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-3 hover:bg-[var(--bg-tertiary)] transition-colors"
                >
                  <div className="text-sm font-semibold text-[var(--accent-blue)] mb-1">
                    {link.title}
                    <span className="text-xs ml-1.5 opacity-60">↗</span>
                  </div>
                  <div className="text-xs text-[var(--text-muted)] leading-relaxed">{link.desc}</div>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
