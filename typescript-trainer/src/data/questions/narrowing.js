export default [
  {
    q: "What operator narrows a union type by checking the runtime type of a primitive value?",
    a: "typeof",
    cat: "narrowing",
    hint: "Returns 'string', 'number', 'boolean', etc.",
    ex: {
      before: "function fn(x: string | number) {\n  // x is string | number\n}",
      after: "function fn(x: string | number) {\n  if (typeof x === 'string') {\n    x.toUpperCase(); // x is string\n  }\n}",
      desc: "typeof narrows primitive types in conditional branches"
    }
  },
  {
    q: "What operator narrows a type by checking if a value is an instance of a class?",
    a: "instanceof",
    cat: "narrowing",
    hint: "Checks the prototype chain at runtime",
    ex: {
      before: "function handle(e: Error | string) {\n  // e is Error | string\n}",
      after: "function handle(e: Error | string) {\n  if (e instanceof Error) {\n    e.message; // e is Error\n  }\n}",
      desc: "instanceof narrows to the class type"
    }
  },
  {
    q: "What operator narrows a type by checking if a property exists on an object?",
    a: "in",
    cat: "narrowing",
    hint: "Checks for property existence at runtime",
    ex: {
      before: "type Fish = { swim: () => void };\ntype Bird = { fly: () => void };",
      after: "function move(pet: Fish | Bird) {\n  if ('swim' in pet) {\n    pet.swim(); // pet is Fish\n  }\n}",
      desc: "The in operator narrows based on property existence"
    }
  },
  {
    q: "What is a user-defined type guard's return type syntax to assert that a parameter is a specific type?",
    a: "param is Type",
    cat: "narrowing",
    hint: "Called a type predicate, used as the return type annotation",
    ex: {
      before: "function isString(val: unknown): boolean {\n  return typeof val === 'string';\n}",
      after: "function isString(val: unknown): val is string {\n  return typeof val === 'string';\n}\n// Now narrows in if blocks",
      desc: "Type predicates enable custom narrowing functions"
    }
  },
  {
    q: "In exhaustiveness checking with a switch, what type should the default case variable be if all cases are handled?",
    a: "never",
    cat: "narrowing",
    hint: "If all union members are handled, nothing remains",
    ex: {
      before: "type Shape = 'circle' | 'square';\nfunction area(s: Shape) {\n  switch (s) {\n    case 'circle': return 1;\n    case 'square': return 2;\n  }\n}",
      after: "function area(s: Shape) {\n  switch (s) {\n    case 'circle': return 1;\n    case 'square': return 2;\n    default:\n      const _: never = s; // exhaustive check\n  }\n}",
      desc: "Assigning to never ensures all cases are handled"
    }
  },
  {
    q: "How does TypeScript narrow the type in the else branch of `if (x !== null)`?",
    a: "null",
    cat: "narrowing",
    hint: "Equality narrowing removes the non-null types",
    ex: {
      before: "function fn(x: string | null) {\n  if (x !== null) {\n    // x is string\n  }\n}",
      after: "function fn(x: string | null) {\n  if (x !== null) {\n    // x is string\n  } else {\n    // x is null\n  }\n}",
      desc: "Equality checks narrow both branches"
    }
  },
  {
    q: "What does TypeScript narrow `x` to in the truthy branch of `if (x)` when x is `string | null | undefined`?",
    a: "string",
    cat: "narrowing",
    hint: "Falsy values (null, undefined, empty string) are filtered out",
    ex: {
      before: "function fn(x: string | null | undefined) {\n  // x is string | null | undefined\n}",
      after: "function fn(x: string | null | undefined) {\n  if (x) {\n    // x is string (truthy narrows out null/undefined)\n  }\n}",
      desc: "Truthiness narrowing removes null, undefined, and other falsy types"
    }
  },
  {
    q: "What TypeScript keyword asserts that a value is non-null/non-undefined without a runtime check?",
    a: "! (non-null assertion)",
    cat: "narrowing",
    hint: "A postfix operator placed after the expression",
    ex: {
      before: "const el = document.getElementById('app');\n// el is HTMLElement | null",
      after: "const el = document.getElementById('app')!;\n// el is HTMLElement (asserted non-null)",
      desc: "The ! postfix asserts the value is not null or undefined"
    }
  },
  {
    q: "What does the `asserts` keyword do in a function return type like `asserts val is string`?",
    a: "narrows the type after the function call",
    cat: "narrowing",
    hint: "An assertion function that throws if the condition fails",
    ex: {
      before: "function assertString(val: unknown) {\n  if (typeof val !== 'string') throw Error();\n}",
      after: "function assertString(val: unknown): asserts val is string {\n  if (typeof val !== 'string') throw Error();\n}\n// After calling assertString(x), x is string",
      desc: "Assertion functions narrow the type in subsequent code"
    }
  },
  {
    q: "When narrowing a discriminated union with `switch (shape.kind)`, what property makes this pattern work?",
    a: "a common literal type property",
    cat: "narrowing",
    hint: "Each variant has the same property name with a unique literal value",
    ex: {
      before: "type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'rect'; w: number; h: number };",
      after: "function area(s: Shape) {\n  switch (s.kind) {\n    case 'circle': return Math.PI * s.radius ** 2;\n    case 'rect': return s.w * s.h;\n  }\n}",
      desc: "The literal-typed discriminant property enables narrowing in switch"
    }
  },
];
