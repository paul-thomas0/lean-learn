import type { Section } from '../../../types';

export const garbageCollectionSections: Section[] = [
  {
    id: 'v8-garbage-collection',
    title: 'Garbage Collection',
    content: [
      {
        type: 'text',
        content:
          "V8's garbage collector, codenamed **Orinoco**, is a highly concurrent and parallel generational garbage collector. It manages the JavaScript heap automatically, reclaiming memory from objects that are no longer reachable. Orinoco is designed to minimize pause times — most GC work happens concurrently on background threads while JavaScript continues to execute on the main thread.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Generational Hypothesis',
      },
      {
        type: 'text',
        content:
          'V8\'s GC is built on the **generational hypothesis**: most objects die young. In practice, the vast majority of JavaScript objects (temporaries, intermediate results, short-lived closures) become unreachable very quickly after allocation. A smaller fraction of objects survive and live for the duration of the program. By dividing the heap into generations and collecting the young generation frequently (and cheaply), V8 avoids scanning the entire heap on every collection.',
      },
      {
        type: 'key-concept',
        title: 'Generational Collection',
        content:
          "The V8 heap is divided into two main generations: the **Young Generation** (also called the nursery or new space) and the **Old Generation** (old space). New objects are allocated in the Young Generation. Objects that survive one or two GC cycles are promoted (\"tenured\") to the Old Generation. Young Generation collections (Scavenges) are fast and frequent. Old Generation collections (Mark-Sweep-Compact) are less frequent but more expensive.",
      },
      {
        type: 'diagram',
        diagramId: 'heap-memory',
        caption:
          'V8 heap layout: Young Generation (semi-spaces), Old Generation, Large Object Space, Code Space, Map Space',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Young Generation: The Parallel Scavenger',
      },
      {
        type: 'text',
        content:
          "The Young Generation uses a **semi-space** design: it is divided into two equally-sized halves called \"from-space\" and \"to-space.\" New objects are allocated sequentially (bump-pointer allocation) in from-space. When from-space fills up, a **Scavenge** occurs: all live objects in from-space are copied to to-space (or promoted to old space if they've survived before), and the roles of from-space and to-space are swapped. Dead objects are simply left behind — no deallocation is needed. V8's Scavenger runs in parallel across multiple threads, with each thread claiming and processing a portion of the live object graph.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Young Generation allocation and collection cycle

// 1. Objects are allocated sequentially in from-space
let a = { value: 1 };  // Allocated in from-space
let b = { value: 2 };  // Allocated right after 'a'
let c = { value: 3 };  // Allocated right after 'b'

// 2. Remove reference to 'b'
b = null;

// 3. When from-space fills up, Scavenge triggers:
//    - 'a' is live (reachable) -> copied to to-space
//    - 'b' is dead (null)      -> left behind (reclaimed)
//    - 'c' is live (reachable) -> copied to to-space
//    - from-space and to-space swap roles

// 4. If 'a' survives another Scavenge, it is promoted
//    to the Old Generation`,
        caption:
          'Semi-space Scavenge: live objects are copied, dead ones are implicitly freed',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Old Generation: Concurrent Mark-Sweep-Compact',
      },
      {
        type: 'text',
        content:
          "The Old Generation is collected using a **Mark-Sweep-Compact** algorithm. This happens in three phases:\n\n1. **Marking**: Starting from root objects (global object, stack frames, handles), V8 traverses the object graph and marks all reachable objects. This is done primarily on background threads (**concurrent marking**) while JavaScript continues to run. A small amount of incremental marking also happens on the main thread in short steps interleaved with JavaScript execution.\n\n2. **Sweeping**: After marking, unmarked (dead) objects are freed. Sweeping is done concurrently on background threads. The freed memory is added to free lists for future allocation.\n\n3. **Compaction**: Over time, the heap becomes fragmented. V8 selectively compacts heavily fragmented pages by copying live objects to new pages and updating pointers. Compaction is done in parallel but requires a brief pause.",
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Tri-Color Marking',
        content:
          "V8 uses a **tri-color marking** scheme: objects are white (unvisited), grey (visited but children not yet processed), or black (visited and all children processed). Marking starts with roots as grey and processes grey objects until none remain. Because marking is concurrent, JavaScript can mutate the object graph during marking. V8 uses **write barriers** to handle this: when JavaScript writes a pointer from a black object to a white object, the write barrier turns the white object grey, ensuring it won't be missed.",
      },
      {
        type: 'heading',
        level: 3,
        text: 'Write Barriers',
      },
      {
        type: 'text',
        content:
          "**Write barriers** are small code snippets inserted by the compiler at every pointer store. They serve two purposes: (1) **Generational write barriers** track old-to-young pointers. When an old generation object stores a reference to a young generation object, V8 records this in a remembered set so the Scavenger knows to treat the old object as a root. Without this, the Scavenger would have to scan the entire old generation. (2) **Concurrent marking write barriers** maintain the tri-color invariant during concurrent marking, as described above.",
      },
      {
        type: 'key-concept',
        title: 'Incremental & Concurrent GC',
        content:
          "V8 uses three strategies to minimize GC pauses: **Parallel** — multiple GC threads work together during a stop-the-world pause to finish faster. **Incremental** — GC work is broken into small steps interleaved with JavaScript execution on the main thread, spreading the pause cost over time. **Concurrent** — GC work runs entirely on background threads while JavaScript runs uninterrupted on the main thread. Modern V8 uses all three: concurrent marking + incremental finalization + parallel compaction.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Large Object Space & Other Spaces',
      },
      {
        type: 'text',
        content:
          "Objects larger than a threshold (typically ~256 KB) are allocated directly in the **Large Object Space** (LOS), bypassing the Young Generation entirely. These objects are never moved by the GC (copying them would be too expensive), so they are collected in place with mark-sweep. V8 also maintains a **Code Space** for compiled machine code, a **Map Space** for Hidden Class (Map) objects, and a **Read-Only Space** for immutable objects like `undefined`, `null`, and built-in prototypes.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Reducing GC Pressure in Practice',
        content:
          "To write GC-friendly JavaScript: (1) Minimize short-lived allocations in hot loops — reuse objects or use typed arrays. (2) Avoid creating closures in hot paths (each closure is an allocation). (3) Use object pools for frequently created/destroyed objects. (4) Prefer `for` loops over `.map()/.filter()` chains when memory is critical (each produces a new array). (5) Use `--trace-gc` or Chrome DevTools Memory panel to profile allocation rates and GC pauses.",
      },
      {
        type: 'comparison',
        leftTitle: 'Minor GC (Scavenge)',
        rightTitle: 'Major GC (Mark-Sweep-Compact)',
        leftContent:
          'Collects the Young Generation only. Uses semi-space copying. Fast (typically 1-5ms). Happens frequently. Parallel across multiple threads. Only processes a small portion of the heap.',
        rightContent:
          'Collects the entire heap (focused on Old Generation). Uses mark-sweep-compact. Slower (10-50ms+ with concurrent phases). Less frequent. Mostly concurrent — marking and sweeping happen on background threads with minimal main-thread pauses.',
      },
    ],
  },
];
