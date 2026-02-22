import type { Section } from '../../../types';

export const ssaOptimizationSections: Section[] = [
  {
    id: 'v8-ssa-optimization',
    title: 'SSA Form & Optimizations',
    content: [
      {
        type: 'text',
        content:
          "**Static Single Assignment (SSA) form** is a property of an intermediate representation (IR) where every variable is assigned exactly once. Both Maglev and TurboFan use SSA-based IRs internally. SSA form simplifies many compiler optimizations because it makes data flow explicit — you can trace any use of a value back to its single definition point without ambiguity. This is the foundation that enables V8 to perform powerful optimizations on your JavaScript code.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Is SSA Form?',
      },
      {
        type: 'text',
        content:
          "In normal code, a variable can be reassigned many times. In SSA form, each assignment creates a new versioned variable (e.g., `x` becomes `x1`, `x2`, `x3`). When control flow merges (e.g., after an if/else), a special **phi function** (φ) selects the correct version based on which branch was taken. This makes def-use chains trivial to compute and enables optimizations that would be complex or impossible on a mutable-variable IR.",
      },
      {
        type: 'comparison',
        leftTitle: 'JavaScript Source',
        rightTitle: 'SSA Form',
        leftContent:
          '```\nlet x = 10;\nif (condition) {\n  x = x + 1;\n} else {\n  x = x + 2;\n}\nreturn x;\n```',
        rightContent:
          '```\nx1 = 10\nif (condition):\n  x2 = x1 + 1\nelse:\n  x3 = x1 + 2\nx4 = φ(x2, x3)\nreturn x4\n```\nEach x is assigned exactly once. The φ node merges values at the join point.',
      },
      {
        type: 'diagram',
        diagramId: 'ssa-visualizer',
        caption:
          'SSA graph showing phi functions at control-flow merge points',
      },
      {
        type: 'heading',
        level: 2,
        text: 'TurboFan\'s "Sea of Nodes" IR',
      },
      {
        type: 'text',
        content:
          "TurboFan uses a **sea of nodes** representation — a graph where both data flow and control flow are expressed as edges between nodes. Unlike a traditional CFG (control flow graph) with basic blocks, TurboFan's IR has no fixed instruction ordering within a block. Nodes float freely and are only constrained by their data and effect dependencies. This makes optimizations like code motion and scheduling more flexible. Each node represents an operation (Add, Load, Call, etc.) with typed inputs and outputs.",
      },
      {
        type: 'key-concept',
        title: 'Sea of Nodes',
        content:
          "In TurboFan's sea of nodes, there are three kinds of edges: **value edges** (data dependencies), **effect edges** (ordering constraints for side effects like memory writes), and **control edges** (branch/merge structure). A pure computation node like Add only has value edges, so the scheduler is free to place it anywhere that satisfies its inputs. Side-effecting nodes are threaded along an effect chain to preserve ordering.",
      },
      {
        type: 'heading',
        level: 3,
        text: 'Constant Propagation & Folding',
      },
      {
        type: 'text',
        content:
          "**Constant propagation** replaces uses of a variable with its constant value when the compiler can prove it's always the same. **Constant folding** evaluates constant expressions at compile time. In SSA form, these are straightforward: if a node's inputs are all constants, the node can be replaced with the computed result. For example, `x1 = 3; y1 = x1 * 4` becomes `y1 = 12`. V8 aggressively folds arithmetic, comparisons, and even some object operations.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Before optimization
function compute() {
  const width = 10;
  const height = 20;
  const area = width * height;  // TurboFan folds this to 200
  const doubled = area * 2;     // Folded to 400
  return doubled;
}
// TurboFan can reduce this entire function to: return 400`,
        caption:
          'Constant folding eliminates computation at compile time',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Dead Code Elimination (DCE)',
      },
      {
        type: 'text',
        content:
          "Dead code elimination removes nodes that have no effect on the program's output. In SSA form, a value is dead if it has no uses. DCE simply walks the graph and removes unreachable or unused nodes. This naturally cleans up after other optimizations — for example, after inlining a function, branches that were dependent on a now-constant argument become dead and are pruned. TurboFan also eliminates unreachable control flow paths (e.g., `if (false) { ... }`).",
      },
      {
        type: 'heading',
        level: 3,
        text: 'Escape Analysis',
      },
      {
        type: 'text',
        content:
          "**Escape analysis** determines whether an object allocated inside a function \"escapes\" — that is, whether a reference to it becomes visible outside the function (via return value, global assignment, closure capture, etc.). If an object does not escape, V8 can perform **scalar replacement**: instead of allocating the object on the heap, its fields are replaced with local variables (SSA values). This eliminates the heap allocation entirely, reduces GC pressure, and enables further optimizations on the individual fields.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Escape analysis in action
function distance(x1, y1, x2, y2) {
  // This object does NOT escape the function
  const delta = { dx: x2 - x1, dy: y2 - y1 };
  return Math.sqrt(delta.dx ** 2 + delta.dy ** 2);
}
// TurboFan can eliminate the {dx, dy} allocation entirely,
// replacing delta.dx and delta.dy with scalar SSA values.

function leaky(x1, y1, x2, y2) {
  const delta = { dx: x2 - x1, dy: y2 - y1 };
  cache.lastDelta = delta;  // Object ESCAPES via external reference
  return Math.sqrt(delta.dx ** 2 + delta.dy ** 2);
}
// The object escapes, so V8 must allocate it on the heap.`,
        caption:
          'Escape analysis eliminates heap allocations for non-escaping objects',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Loop-Invariant Code Motion (LICM)',
      },
      {
        type: 'text',
        content:
          "Loop-invariant code motion identifies computations inside a loop whose result does not change across iterations and hoists them above the loop. In SSA form, this is detected when a node inside a loop body only depends on values defined outside the loop (or on loop-invariant values). TurboFan moves such nodes to the loop's preheader block, so the computation executes once instead of N times.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Before LICM
function process(arr, config) {
  for (let i = 0; i < arr.length; i++) {
    const threshold = config.max * 0.9;  // invariant!
    if (arr[i] > threshold) arr[i] = threshold;
  }
}

// After LICM (conceptually)
function process(arr, config) {
  const threshold = config.max * 0.9;  // hoisted above loop
  const len = arr.length;              // also hoisted
  for (let i = 0; i < len; i++) {
    if (arr[i] > threshold) arr[i] = threshold;
  }
}`,
        caption:
          'LICM hoists loop-invariant expressions out of the loop body',
      },
      {
        type: 'info',
        variant: 'note',
        title: 'Optimization Phases in TurboFan',
        content:
          "TurboFan runs its optimizations in phases: type narrowing, inlining, typed lowering, escape analysis, load elimination, simplified lowering, generic lowering, effect linearization, dead code elimination, instruction selection, register allocation, and code generation. Each phase operates on the SSA graph, progressively lowering high-level operations into machine-specific instructions. You can visualize these phases using the `--trace-turbo` flag, which outputs JSON consumable by the Turbolizer tool.",
      },
    ],
  },
];
