import type { QuizQuestion } from '../../../types';

export const v8EngineQuiz: QuizQuestion[] = [
  {
    question:
      "What is the role of V8's Ignition component?",
    options: [
      'It is the top-tier optimizing compiler that produces highly optimized machine code',
      'It is the bytecode interpreter that executes JavaScript as compact register-based bytecodes',
      'It is the parser that converts source code into an Abstract Syntax Tree',
      'It is the garbage collector that manages heap memory allocation',
    ],
    correctIndex: 1,
    explanation:
      'Ignition is V8\'s bytecode interpreter. It compiles the AST into a compact register-based bytecode format and executes it. Ignition provides fast startup and collects type feedback that the optimizing compilers (Sparkplug, Maglev, TurboFan) use for speculative optimization.',
    sectionRef: 'v8-compilation-pipeline',
  },
  {
    question:
      'What happens when TurboFan-optimized code encounters a type it was not compiled for?',
    options: [
      'V8 throws a TypeError at runtime',
      'The code continues to run with degraded performance but no change in tier',
      'V8 deoptimizes — discards the optimized code and falls back to the interpreter',
      'TurboFan recompiles the function inline with the new type information',
    ],
    correctIndex: 2,
    explanation:
      "When optimized code encounters a type assumption violation (e.g., a function compiled for integer arguments receives a string), V8 performs a deoptimization bailout. It discards the machine code, reconstructs the interpreter stack frame, and resumes execution in Ignition. Repeated deoptimizations can cause a function to be permanently excluded from optimization.",
    sectionRef: 'v8-compilation-pipeline',
  },
  {
    question:
      'What distinguishes Sparkplug from TurboFan in V8\'s compilation pipeline?',
    options: [
      'Sparkplug is a non-optimizing baseline compiler that translates bytecodes directly to machine code without any IR or optimization passes',
      'Sparkplug generates bytecode while TurboFan generates an AST',
      'Sparkplug handles async functions while TurboFan handles synchronous ones',
      'Sparkplug uses SSA form while TurboFan uses a stack-based IR',
    ],
    correctIndex: 0,
    explanation:
      "Sparkplug is V8's baseline compiler that translates Ignition bytecodes directly to machine code in a single pass, with no intermediate representation and no optimizations. It provides a quick performance uplift over interpreted bytecode. TurboFan, by contrast, builds a full SSA-based IR (sea of nodes) and applies aggressive optimizations.",
    sectionRef: 'v8-compilation-pipeline',
  },
  {
    question:
      'In SSA form, what is the purpose of a phi (φ) function?',
    options: [
      'It performs type narrowing to eliminate redundant type checks',
      'It selects the correct variable version at a control-flow merge point based on which branch was taken',
      'It marks variables as constants for constant propagation',
      'It allocates registers for variables during code generation',
    ],
    correctIndex: 1,
    explanation:
      "In SSA form, every variable is assigned exactly once. When control flow merges (e.g., after an if/else), a phi function selects between the variable versions from each incoming branch. For example, φ(x2, x3) resolves to x2 if the 'then' branch was taken or x3 if the 'else' branch was taken.",
    sectionRef: 'v8-ssa-optimization',
  },
  {
    question:
      'What does escape analysis enable V8 to do?',
    options: [
      'Detect and prevent memory leaks from closures',
      'Replace heap-allocated objects with scalar values when the object does not escape the function',
      'Optimize global variable access by caching values in registers',
      'Eliminate try-catch blocks that never throw exceptions',
    ],
    correctIndex: 1,
    explanation:
      "Escape analysis determines whether an object's reference can be observed outside the function that created it. If the object doesn't escape (isn't returned, stored in a global, or captured by a closure), V8 can perform scalar replacement — replacing the object with individual local variables for each field. This eliminates the heap allocation and reduces GC pressure.",
    sectionRef: 'v8-ssa-optimization',
  },
  {
    question:
      'Why does adding properties to objects in different orders cause performance problems in V8?',
    options: [
      'It triggers garbage collection more frequently',
      'It causes objects to have different Hidden Classes, preventing inline cache hits',
      'It forces V8 to use the interpreter instead of compiled code',
      'It increases the size of the AST, slowing down parsing',
    ],
    correctIndex: 1,
    explanation:
      "V8 creates Hidden Class transitions based on the order properties are added. Objects with properties added in different orders get different Hidden Classes (Maps) even if they end up with the same properties. When a function receives objects with different Hidden Classes, its inline caches become polymorphic or megamorphic, falling back to slower generic property lookups instead of direct offset-based access.",
    sectionRef: 'v8-hidden-classes',
  },
  {
    question:
      'What is the state of an inline cache that has seen more than 4 different Hidden Classes?',
    options: [
      'Monomorphic',
      'Polymorphic',
      'Megamorphic',
      'Deoptimized',
    ],
    correctIndex: 2,
    explanation:
      "An inline cache transitions through three states: monomorphic (1 Hidden Class seen — fastest), polymorphic (2-4 Hidden Classes — checks a small array of map/handler pairs), and megamorphic (more than 4 Hidden Classes — falls back to generic hash-table lookup). Megamorphic ICs are significantly slower and prevent TurboFan from generating specialized property access code.",
    sectionRef: 'v8-hidden-classes',
  },
  {
    question:
      'How does V8\'s Young Generation garbage collector (Scavenger) reclaim memory?',
    options: [
      'It marks dead objects and adds their memory to a free list',
      'It uses reference counting to identify objects with zero references',
      'It copies live objects from from-space to to-space, then swaps the spaces — dead objects are implicitly freed',
      'It compacts the entire heap by moving all objects to contiguous memory locations',
    ],
    correctIndex: 2,
    explanation:
      "The Young Generation uses semi-space copying (Cheney's algorithm, parallelized). When from-space fills up, the Scavenger copies all reachable objects to to-space (or promotes them to old space). Then from-space and to-space swap roles. Dead objects are never explicitly freed — they are simply left behind in the old from-space, which becomes the new (empty) to-space.",
    sectionRef: 'v8-garbage-collection',
  },
  {
    question:
      'What is the purpose of write barriers in V8\'s garbage collector?',
    options: [
      'They prevent JavaScript from writing to read-only memory regions',
      'They track pointer stores to maintain remembered sets (old-to-young refs) and preserve the tri-color marking invariant during concurrent GC',
      'They enforce immutability on frozen objects created with Object.freeze()',
      'They buffer write operations to optimize sequential memory access patterns',
    ],
    correctIndex: 1,
    explanation:
      "Write barriers are injected at every pointer store and serve two critical purposes: (1) generational write barriers record when an old-generation object stores a reference to a young-generation object, so the Scavenger doesn't need to scan the entire old generation; (2) concurrent marking write barriers ensure that when a black (fully-processed) object gets a new reference to a white (unvisited) object during concurrent marking, the white object is turned grey so it won't be missed.",
    sectionRef: 'v8-garbage-collection',
  },
  {
    question:
      'Why are large objects (>256 KB) allocated directly in the Large Object Space instead of the Young Generation?',
    options: [
      'Large objects are always long-lived, so they skip the nursery by design',
      'Copying large objects during Scavenge would be too expensive, so they are allocated in a non-moving space and collected with mark-sweep',
      'The Young Generation has a strict maximum object size enforced by the JavaScript specification',
      'Large objects require special alignment that only the Large Object Space provides',
    ],
    correctIndex: 1,
    explanation:
      "The Young Generation's semi-space Scavenger works by copying live objects between spaces. Copying a >256 KB object would be prohibitively expensive and waste significant memory bandwidth. The Large Object Space (LOS) avoids this by allocating large objects in place and collecting them with mark-sweep — they are never moved. This is a pragmatic tradeoff between collection strategy and object size.",
    sectionRef: 'v8-garbage-collection',
  },
];
