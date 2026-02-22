export default [
  {
    q: "What type represents a value that can be any type but requires checking before use?",
    a: "unknown",
    cat: "primitives",
    hint: "Safer alternative to any",
    ex: {
      before: "function process(val: unknown) {\n  // val.toUpperCase() // Error!\n}",
      after: "function process(val: unknown) {\n  if (typeof val === 'string') {\n    val.toUpperCase() // OK\n  }\n}",
      desc: "unknown requires type narrowing before use"
    }
  },
  {
    q: "What type represents a function that never returns (e.g., always throws or has an infinite loop)?",
    a: "never",
    cat: "primitives",
    hint: "The bottom type in TypeScript's type system",
    ex: {
      before: "function fail(msg: string) {\n  throw new Error(msg);\n}",
      after: "function fail(msg: string): never {\n  throw new Error(msg);\n}",
      desc: "never indicates unreachable code or impossible values"
    }
  },
  {
    q: "What is the return type annotation for a function that returns nothing?",
    a: "void",
    cat: "primitives",
    hint: "Not the same as undefined, though related",
    ex: {
      before: "function log(msg: string) {\n  console.log(msg);\n}",
      after: "function log(msg: string): void {\n  console.log(msg);\n}",
      desc: "void means the return value will not be used"
    }
  },
  {
    q: "What TypeScript type represents arbitrarily large integers introduced in ES2020?",
    a: "bigint",
    cat: "primitives",
    hint: "Created with the n suffix: 100n",
    ex: {
      before: "const big = 9007199254740991n;",
      after: "const big: bigint = 9007199254740991n;",
      desc: "bigint is a distinct primitive type from number"
    }
  },
  {
    q: "When you write `const x = 'hello'`, what type does TypeScript infer for x?",
    a: "\"hello\"",
    cat: "primitives",
    hint: "const declarations use narrower types than let",
    ex: {
      before: "let y = 'hello';   // type: string",
      after: "const x = 'hello'; // type: \"hello\"",
      desc: "const narrows to a literal type; let widens to string"
    }
  },
  {
    q: "What type do you get from `typeof Symbol('id')` at the type level?",
    a: "symbol",
    cat: "primitives",
    hint: "A primitive type for unique identifiers",
    ex: {
      before: "const id = Symbol('id');",
      after: "const id: symbol = Symbol('id');",
      desc: "symbol is a primitive type like string or number"
    }
  },
  {
    q: "What is the type of `null` in TypeScript when strictNullChecks is enabled?",
    a: "null",
    cat: "primitives",
    hint: "With strict checks, it is its own distinct type",
    ex: {
      before: "let x: string = null; // Error with strictNullChecks",
      after: "let x: string | null = null; // OK",
      desc: "null must be explicitly included in a union when strict"
    }
  },
  {
    q: "What type annotation allows a variable to hold literally any value with no type checking?",
    a: "any",
    cat: "primitives",
    hint: "Effectively opts out of the type system",
    ex: {
      before: "let val: any = 42;\nval.nonExistent(); // No error!",
      after: "let val: unknown = 42;\n// val.nonExistent(); // Error - safer",
      desc: "any disables type checking; prefer unknown for safety"
    }
  },
  {
    q: "Given `let x = 10`, what type does TypeScript infer for x?",
    a: "number",
    cat: "primitives",
    hint: "let declarations use widened types",
    ex: {
      before: "const y = 10; // type: 10 (literal)",
      after: "let x = 10;   // type: number (widened)",
      desc: "Type widening converts literal types to their base type for let"
    }
  },
  {
    q: "What is the literal type of the expression `true as const`?",
    a: "true",
    cat: "primitives",
    hint: "as const prevents widening to boolean",
    ex: {
      before: "let flag = true;          // type: boolean",
      after: "let flag = true as const;  // type: true",
      desc: "as const preserves the literal type"
    }
  },
  {
    q: "What type does a function parameter have if no annotation is given and noImplicitAny is disabled?",
    a: "any",
    cat: "primitives",
    hint: "The implicit fallback when TypeScript cannot infer a type",
  },
];
