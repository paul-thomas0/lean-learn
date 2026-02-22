export default [
  {
    q: "What is the syntax for declaring a generic function that works with any type T?",
    a: "function fn<T>(arg: T): T",
    cat: "generics",
    hint: "Type parameter goes in angle brackets before the parameter list",
    ex: {
      before: "function identity(arg: any): any {\n  return arg;\n}",
      after: "function identity<T>(arg: T): T {\n  return arg;\n}\nidentity('hello'); // T inferred as string",
      desc: "Generic functions preserve type information through type parameters"
    }
  },
  {
    q: "How do you constrain a type parameter T to only accept types that have a `length` property?",
    a: "T extends { length: number }",
    cat: "generics",
    hint: "Uses the extends keyword with a structural constraint",
    ex: {
      before: "function logLength<T>(arg: T) {\n  // arg.length // Error: T has no length\n}",
      after: "function logLength<T extends { length: number }>(arg: T) {\n  console.log(arg.length); // OK\n}",
      desc: "extends constrains T to types with the required shape"
    }
  },
  {
    q: "How do you provide a default type for a generic parameter T?",
    a: "T = DefaultType",
    cat: "generics",
    hint: "Similar to default function parameter syntax",
    ex: {
      before: "interface Container<T> {\n  value: T;\n}",
      after: "interface Container<T = string> {\n  value: T;\n}\nconst c: Container = { value: 'hi' }; // T defaults to string",
      desc: "Default type parameters work like default function arguments"
    }
  },
  {
    q: "What does `keyof T` produce when T is an object type?",
    a: "a union of T's property names",
    cat: "generics",
    hint: "Extracts the keys as string literal types",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "interface User { name: string; age: number; }\ntype Keys = keyof User; // 'name' | 'age'",
      desc: "keyof creates a union of literal types from property keys"
    }
  },
  {
    q: "How do you type a function that takes an object T and a key K of that object, returning T[K]?",
    a: "<T, K extends keyof T>(obj: T, key: K) => T[K]",
    cat: "generics",
    hint: "K must be constrained to keys of T for safe indexed access",
    ex: {
      before: "function get(obj: any, key: string) {\n  return obj[key]; // returns any\n}",
      after: "function get<T, K extends keyof T>(obj: T, key: K): T[K] {\n  return obj[key];\n}\nget({ name: 'Alice' }, 'name'); // returns string",
      desc: "Two type parameters with K constrained to keyof T"
    }
  },
  {
    q: "What is the syntax for a generic interface with two type parameters?",
    a: "interface Name<T, U>",
    cat: "generics",
    hint: "Multiple type parameters are separated by commas",
    ex: {
      before: "// Want: a pair of different types",
      after: "interface Pair<T, U> {\n  first: T;\n  second: U;\n}\nconst p: Pair<string, number> = { first: 'a', second: 1 };",
      desc: "Generic interfaces can have multiple type parameters"
    }
  },
  {
    q: "How do you declare a generic class with a type parameter T?",
    a: "class Name<T>",
    cat: "generics",
    hint: "Type parameter follows the class name",
    ex: {
      before: "class Box {\n  value: any;\n}",
      after: "class Box<T> {\n  value: T;\n  constructor(val: T) { this.value = val; }\n}\nconst b = new Box('hello'); // Box<string>",
      desc: "Generic classes parameterize over types"
    }
  },
  {
    q: "What does `T extends U ? X : Y` represent in TypeScript?",
    a: "conditional type",
    cat: "generics",
    hint: "Like a ternary operator but for types",
    ex: {
      before: "// Want: different type based on a condition",
      after: "type IsString<T> = T extends string ? true : false;\ntype A = IsString<'hi'>;  // true\ntype B = IsString<42>;    // false",
      desc: "Conditional types choose between types based on a condition"
    }
  },
  {
    q: "What keyword is used inside a conditional type to extract (capture) a type from a pattern?",
    a: "infer",
    cat: "generics",
    hint: "Introduces a new type variable in the extends clause",
    ex: {
      before: "// Want: extract the return type from a function type",
      after: "type GetReturn<T> = T extends (...args: any[]) => infer R\n  ? R : never;\ntype N = GetReturn<() => number>; // number",
      desc: "infer captures a type within a conditional type pattern"
    }
  },
  {
    q: "When a conditional type is applied to a union, what behavior occurs?",
    a: "distribution over the union",
    cat: "generics",
    hint: "The conditional is applied to each union member individually",
    ex: {
      before: "type ToArray<T> = T extends any ? T[] : never;",
      after: "type ToArray<T> = T extends any ? T[] : never;\ntype R = ToArray<string | number>;\n// string[] | number[] (not (string | number)[])",
      desc: "Conditional types distribute over union type parameters"
    }
  },
  {
    q: "How do you prevent distribution of a conditional type over a union?",
    a: "[T] extends [U]",
    cat: "generics",
    hint: "Wrap both sides in a tuple to suppress distribution",
    ex: {
      before: "type ToArray<T> = T extends any ? T[] : never;\n// Distributes: string | number -> string[] | number[]",
      after: "type ToArray<T> = [T] extends [any] ? T[] : never;\n// No distribution: string | number -> (string | number)[]",
      desc: "Wrapping in tuples prevents distributive behavior"
    }
  },
];
