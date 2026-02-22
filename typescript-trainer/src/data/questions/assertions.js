export default [
  {
    q: "What keyword is used for type assertions to tell TypeScript to treat a value as a specific type?",
    a: "as",
    cat: "assertions",
    hint: "Placed after the expression",
    ex: {
      before: "const input = document.getElementById('name');",
      after: "const input = document.getElementById('name') as HTMLInputElement;",
      desc: "as asserts the value is the specified type"
    }
  },
  {
    q: "What assertion makes an object literal's properties become readonly literal types instead of widened types?",
    a: "as const",
    cat: "assertions",
    hint: "Freezes the type to its most narrow form",
    ex: {
      before: "const config = { port: 3000, debug: true };",
      after: "const config = { port: 3000, debug: true } as const;\n// { readonly port: 3000; readonly debug: true; }",
      desc: "as const narrows to literal types and adds readonly"
    }
  },
  {
    q: "What keyword validates that an expression matches a type without changing the inferred type?",
    a: "satisfies",
    cat: "assertions",
    hint: "TypeScript 4.9+, validates without widening or narrowing",
    ex: {
      before: "type Color = 'red' | 'green' | 'blue';\nconst c = 'red';",
      after: "const c = 'red' satisfies Color;\n// type is still 'red', not Color",
      desc: "satisfies checks compatibility while preserving the literal type"
    }
  },
  {
    q: "What postfix operator asserts that a value is non-null and non-undefined?",
    a: "!",
    cat: "assertions",
    hint: "Non-null assertion operator, placed after the expression",
    ex: {
      before: "const el: HTMLElement | null = document.getElementById('app');",
      after: "const el = document.getElementById('app')!;\n// type is HTMLElement (null removed)",
      desc: "The ! operator removes null and undefined from the type"
    }
  },
  {
    q: "What is the return type syntax for a type predicate function that narrows a parameter?",
    a: "param is Type",
    cat: "assertions",
    hint: "Used as the return type of a type guard function",
    ex: {
      before: "function isString(val: unknown): ??? { return typeof val === 'string'; }",
      after: "function isString(val: unknown): val is string {\n  return typeof val === 'string';\n}",
      desc: "Type predicate narrows the parameter type after the check"
    }
  },
  {
    q: "What is the return type syntax for an assertion function that throws if a condition is false?",
    a: "asserts condition",
    cat: "assertions",
    hint: "Assertion functions narrow types after the call",
    ex: {
      before: "function assert(cond: boolean): ??? { if (!cond) throw new Error(); }",
      after: "function assert(cond: boolean): asserts cond {\n  if (!cond) throw new Error();\n}",
      desc: "After calling assert(x), x is narrowed to truthy"
    }
  },
  {
    q: "What is the return type for an assertion function that narrows a parameter to a specific type?",
    a: "asserts param is Type",
    cat: "assertions",
    hint: "Combines asserts with type predicate syntax",
    ex: {
      before: "function assertString(val: unknown): ??? {\n  if (typeof val !== 'string') throw new Error();\n}",
      after: "function assertString(val: unknown): asserts val is string {\n  if (typeof val !== 'string') throw new Error();\n}",
      desc: "After calling assertString(x), x is narrowed to string"
    }
  },
  {
    q: "What is the key difference between `as` and `satisfies`?",
    a: "as changes the type, satisfies only validates it",
    cat: "assertions",
    hint: "One alters inference, the other preserves it",
    ex: {
      before: "const x = 'hello' as string;   // type: string\nconst y = 'hello' satisfies string; // type: 'hello'",
      after: "// as widens to string, satisfies keeps literal 'hello'",
      desc: "satisfies validates without affecting the inferred type"
    }
  },
  {
    q: "How do you assert a value to the `unknown` type before asserting to an unrelated type (double assertion)?",
    a: "expr as unknown as T",
    cat: "assertions",
    hint: "Two as keywords, going through unknown",
    ex: {
      before: "const x: string = 'hello';\nconst y = x as number; // Error!",
      after: "const y = x as unknown as number; // Compiles",
      desc: "Double assertion bypasses type compatibility checks via unknown"
    }
  },
  {
    q: "In an `as const` array, what happens to the inferred type of `['a', 'b', 'c'] as const`?",
    a: "readonly [\"a\", \"b\", \"c\"]",
    cat: "assertions",
    hint: "Becomes a readonly tuple of literal types",
    ex: {
      before: "const arr = ['a', 'b', 'c'];           // string[]",
      after: "const arr = ['a', 'b', 'c'] as const;   // readonly ['a', 'b', 'c']",
      desc: "as const creates a readonly tuple with literal element types"
    }
  }
];
