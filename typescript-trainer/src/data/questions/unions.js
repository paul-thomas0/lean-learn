export default [
  {
    q: "What operator creates a type that can be one of several types?",
    a: "|",
    cat: "unions",
    hint: "Called the union operator",
    ex: {
      before: "let id: string;\nlet id: number;",
      after: "let id: string | number;",
      desc: "The | operator creates a union of types"
    }
  },
  {
    q: "What operator creates a type that combines all properties of multiple types?",
    a: "&",
    cat: "unions",
    hint: "Called the intersection operator",
    ex: {
      before: "type A = { name: string };\ntype B = { age: number };",
      after: "type A = { name: string };\ntype B = { age: number };\ntype C = A & B;\n// { name: string; age: number }",
      desc: "The & operator creates an intersection type"
    }
  },
  {
    q: "In a discriminated union, what is the shared property used to distinguish variants called?",
    a: "discriminant",
    cat: "unions",
    hint: "A literal-typed property common to all members",
    ex: {
      before: "type Shape =\n  | { kind: 'circle'; radius: number }\n  | { kind: 'square'; side: number };",
      after: "function area(s: Shape) {\n  switch (s.kind) { // 'kind' is the ___\n    case 'circle': return Math.PI * s.radius ** 2;\n    case 'square': return s.side ** 2;\n  }\n}",
      desc: "The discriminant property enables exhaustive narrowing"
    }
  },
  {
    q: "What is the result type of `string & number`?",
    a: "never",
    cat: "unions",
    hint: "No value can be both a string and a number",
    ex: {
      before: "type Impossible = string & number;",
      after: "type Impossible = string & number; // never",
      desc: "Intersecting incompatible types produces never"
    }
  },
  {
    q: "Given `type T = 'a' | 'b' | 'c'`, what is the result of `Exclude<T, 'a'>`?",
    a: "\"b\" | \"c\"",
    cat: "unions",
    hint: "Exclude removes members from a union",
    ex: {
      before: "type T = 'a' | 'b' | 'c';",
      after: "type T = 'a' | 'b' | 'c';\ntype U = Exclude<T, 'a'>; // 'b' | 'c'",
      desc: "Exclude<T, U> removes from T all members assignable to U"
    }
  },
  {
    q: "Given `type T = 'a' | 'b' | 'c'`, what is the result of `Extract<T, 'a' | 'd'>`?",
    a: "\"a\"",
    cat: "unions",
    hint: "Extract keeps only the matching members",
    ex: {
      before: "type T = 'a' | 'b' | 'c';",
      after: "type T = 'a' | 'b' | 'c';\ntype U = Extract<T, 'a' | 'd'>; // 'a'",
      desc: "Extract<T, U> keeps from T only members assignable to U"
    }
  },
  {
    q: "What type results from `string | never`?",
    a: "string",
    cat: "unions",
    hint: "never is the identity element for unions",
    ex: {
      before: "type T = string | never;",
      after: "type T = string | never; // string",
      desc: "never is absorbed in unions — it contributes nothing"
    }
  },
  {
    q: "What type results from `string & unknown`?",
    a: "string",
    cat: "unions",
    hint: "unknown is the identity element for intersections",
    ex: {
      before: "type T = string & unknown;",
      after: "type T = string & unknown; // string",
      desc: "Intersecting with unknown has no effect"
    }
  },
  {
    q: "What type results from `string | unknown`?",
    a: "unknown",
    cat: "unions",
    hint: "unknown absorbs everything in a union",
    ex: {
      before: "type T = string | unknown;",
      after: "type T = string | unknown; // unknown",
      desc: "unknown is the top type and absorbs all union members"
    }
  },
  {
    q: "How do you narrow a union type `string | number` to just `string` using a type guard in an if statement?",
    a: "typeof x === \"string\"",
    cat: "unions",
    hint: "Uses the JavaScript typeof operator",
    ex: {
      before: "function fn(x: string | number) {\n  // x is string | number here\n}",
      after: "function fn(x: string | number) {\n  if (typeof x === 'string') {\n    // x is string here\n  }\n}",
      desc: "typeof narrows union types in conditional branches"
    }
  },
  {
    q: "Given `type A = { x: number } & { x: string }`, what is the type of property x?",
    a: "never",
    cat: "unions",
    hint: "The property types are also intersected",
    ex: {
      before: "type A = { x: number } & { x: string };",
      after: "type A = { x: number } & { x: string };\n// A['x'] is number & string = never",
      desc: "Conflicting property types in intersections become never"
    }
  },
];
