import type { Section } from '../../../types';

export const hiddenClassesSections: Section[] = [
  {
    id: 'v8-hidden-classes',
    title: 'Hidden Classes & Inline Caches',
    content: [
      {
        type: 'text',
        content:
          "JavaScript is a dynamically typed language — objects can have properties added, removed, or changed at any time. Naively, this means every property access requires a dictionary lookup by name. V8 avoids this cost through two interconnected mechanisms: **Hidden Classes** (internally called Maps) and **Inline Caches** (ICs). Together, they allow V8 to access object properties at speeds comparable to statically typed languages.",
      },
      {
        type: 'heading',
        level: 2,
        text: 'Hidden Classes (Maps)',
      },
      {
        type: 'text',
        content:
          "Every JavaScript object in V8 has a pointer to a **Hidden Class** (called a `Map` internally — not to be confused with the `Map` data structure). A Hidden Class describes the shape of an object: which properties it has, their order, and the offset at which each property's value is stored. When two objects have the same sequence of properties added in the same order, they share the same Hidden Class. This sharing is what makes fast property access possible.",
      },
      {
        type: 'diagram',
        diagramId: 'object-shapes',
        caption:
          'Hidden Class transitions as properties are added to an object',
      },
      {
        type: 'key-concept',
        title: 'Shape Transitions',
        content:
          "When you add a property to an object, V8 creates a **transition** from the current Hidden Class to a new one that includes the added property. These transitions form a tree. If you create another object and add the same properties in the same order, V8 follows the existing transition chain rather than creating new Hidden Classes. This is why initializing object properties consistently (e.g., always in the constructor) is important for performance — it ensures objects share shapes.",
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Objects sharing the same Hidden Class
function Point(x, y) {
  this.x = x;  // Transition: Map0 (empty) -> Map1 ({x})
  this.y = y;  // Transition: Map1 ({x}) -> Map2 ({x, y})
}

const p1 = new Point(1, 2);  // Hidden Class: Map2
const p2 = new Point(3, 4);  // Hidden Class: Map2 (same!)

// V8 knows that for Map2, property 'x' is at offset 0
// and property 'y' is at offset 1. No dictionary lookup needed.`,
        caption:
          'Objects created with the same property order share a Hidden Class',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// Breaking shape sharing — avoid this pattern
const a = {};
a.x = 1;
a.y = 2;  // Shape: {x, y}

const b = {};
b.y = 1;
b.x = 2;  // Shape: {y, x} — DIFFERENT Hidden Class!

// Even though both objects have the same properties,
// they have different Hidden Classes because the
// properties were added in different order.`,
        caption:
          'Adding properties in different orders creates divergent Hidden Classes',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Inline Caches (ICs)',
      },
      {
        type: 'text',
        content:
          "An **Inline Cache** is a mechanism that caches the result of a property lookup at a specific call site. The first time V8 executes `obj.x`, it performs the full lookup (checking the Hidden Class, finding the offset). The IC then records: \"for objects with Hidden Class Map2, property x is at offset 0.\" On subsequent executions at that same code location, V8 checks if the object's Hidden Class matches the cached one — if so, it reads the value directly from the stored offset, bypassing the full lookup entirely.",
      },
      {
        type: 'heading',
        level: 3,
        text: 'IC States: Monomorphic, Polymorphic, Megamorphic',
      },
      {
        type: 'text',
        content:
          "Inline caches have different states depending on how many different Hidden Classes they've seen:\n\n- **Monomorphic**: The IC has seen exactly one Hidden Class. This is the fastest state — a single comparison and a direct memory load. TurboFan can inline monomorphic property accesses as a simple type guard + offset load.\n\n- **Polymorphic**: The IC has seen 2-4 different Hidden Classes. V8 stores a small array of (Map, handler) pairs and checks each one. Still fast, but requires multiple comparisons.\n\n- **Megamorphic**: The IC has seen more than 4 Hidden Classes. V8 falls back to a generic hash-table lookup. This is significantly slower and prevents TurboFan from generating specialized code for that access site.",
      },
      {
        type: 'comparison',
        leftTitle: 'Monomorphic (Fast)',
        rightTitle: 'Megamorphic (Slow)',
        leftContent:
          '```\nfunction getX(obj) {\n  return obj.x;\n}\n// Always called with same shape\ngetX({x:1, y:2});\ngetX({x:3, y:4});\n```\nSingle Hidden Class seen. IC stores one (Map, offset) pair. TurboFan generates a type guard + direct load.',
        rightContent:
          '```\nfunction getX(obj) {\n  return obj.x;\n}\n// Called with many different shapes\ngetX({x:1});\ngetX({x:1, y:2});\ngetX({x:1, y:2, z:3});\ngetX({x:1, a:2});\ngetX({x:1, b:2});\n```\nMany Hidden Classes seen. Falls back to generic dictionary lookup. TurboFan cannot specialize this access.',
      },
      {
        type: 'heading',
        level: 2,
        text: 'Dictionary Mode (Slow Properties)',
      },
      {
        type: 'text',
        content:
          "When an object has too many properties, or when properties are frequently added and deleted, V8 switches the object to **dictionary mode** (also called slow mode). Instead of storing properties at fixed offsets described by a Hidden Class, V8 uses a hash table. This makes adding and deleting properties cheap but makes every property access an O(1)-amortized hash lookup rather than a constant-offset memory load. Objects in dictionary mode also can't benefit from Inline Caches effectively.",
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'Patterns That Trigger Dictionary Mode',
        content:
          "Several patterns cause V8 to switch an object to dictionary mode: (1) deleting properties with the `delete` operator, (2) adding a very large number of properties dynamically, (3) adding properties with non-standard attributes (e.g., via `Object.defineProperty` with `enumerable: false`), (4) using objects as arbitrary key-value stores with many different property names. If you need a true dictionary, use a `Map` object instead — it's designed for that use case.",
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Writing Shape-Friendly Code',
        content:
          "To get the best performance from Hidden Classes and ICs: (1) Initialize all properties in the constructor or at creation time, in a consistent order. (2) Avoid adding properties after construction. (3) Avoid `delete` — set properties to `null` or `undefined` instead. (4) Pass objects of the same shape to the same functions. (5) Prefer classes or factory functions that produce uniform shapes. (6) Use `--trace-ic` or `--trace-maps` flags with the V8 debug build to inspect IC and Map behavior.",
      },
    ],
  },
];
