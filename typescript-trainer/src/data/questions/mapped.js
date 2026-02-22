export default [
  {
    q: "What is the syntax for a mapped type that iterates over keys of T?",
    a: "{ [K in keyof T]: T[K] }",
    cat: "mapped",
    hint: "in keyof iterates over each property",
    ex: {
      before: "type Identity<T> = ???",
      after: "type Identity<T> = { [K in keyof T]: T[K] }",
      desc: "Maps each key K to its original type, producing an identical type"
    }
  },
  {
    q: "How do you make all properties optional in a mapped type?",
    a: "{ [K in keyof T]?: T[K] }",
    cat: "mapped",
    hint: "Add a modifier after the key expression",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "type Optional<T> = { [K in keyof T]?: T[K] }\n// { name?: string; age?: number; }",
      desc: "The ? modifier makes each mapped property optional"
    }
  },
  {
    q: "How do you remove the readonly modifier from all properties in a mapped type?",
    a: "{ -readonly [K in keyof T]: T[K] }",
    cat: "mapped",
    hint: "Prefix the modifier with minus sign",
    ex: {
      before: "interface Frozen { readonly x: number; readonly y: number; }",
      after: "type Mutable<T> = { -readonly [K in keyof T]: T[K] }\n// { x: number; y: number; }",
      desc: "-readonly strips the readonly modifier"
    }
  },
  {
    q: "How do you remove the optional (?) modifier from all properties in a mapped type?",
    a: "{ [K in keyof T]-?: T[K] }",
    cat: "mapped",
    hint: "Minus sign before the question mark",
    ex: {
      before: "interface Partial { name?: string; age?: number; }",
      after: "type Required<T> = { [K in keyof T]-?: T[K] }\n// { name: string; age: number; }",
      desc: "-? makes every property required"
    }
  },
  {
    q: "What keyword is used to remap keys in a mapped type (TypeScript 4.1+)?",
    a: "as",
    cat: "mapped",
    hint: "Placed after 'in keyof T' to transform the key",
    ex: {
      before: "type Getters<T> = ???",
      after: "type Getters<T> = {\n  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]\n}",
      desc: "as clause transforms the output key name"
    }
  },
  {
    q: "How do you filter out keys in a mapped type using key remapping?",
    a: "as never",
    cat: "mapped",
    hint: "Remapping a key to never removes it",
    ex: {
      before: "type OmitFunctions<T> = ???",
      after: "type OmitFunctions<T> = {\n  [K in keyof T as T[K] extends Function ? never : K]: T[K]\n}",
      desc: "Keys remapped to never are excluded from the result"
    }
  },
  {
    q: "Write a mapped type that makes all property values of T into arrays.",
    a: "{ [K in keyof T]: T[K][] }",
    cat: "mapped",
    hint: "Append [] to the value type",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "type Arrayed<T> = { [K in keyof T]: T[K][] }\n// { name: string[]; age: number[]; }",
      desc: "Each property value becomes an array of its original type"
    }
  },
  {
    q: "What does `{ [K in 'x' | 'y' | 'z']: number }` produce?",
    a: "{ x: number; y: number; z: number }",
    cat: "mapped",
    hint: "Mapped types can iterate over any string literal union",
    ex: {
      before: "type Coords = { [K in 'x' | 'y' | 'z']: number }",
      after: "// { x: number; y: number; z: number }",
      desc: "in iterates over the union, creating one property per member"
    }
  },
  {
    q: "Write a mapped type that picks only properties of T whose values extend string.",
    a: "{ [K in keyof T as T[K] extends string ? K : never]: T[K] }",
    cat: "mapped",
    hint: "Combine key remapping with a conditional in the as clause",
    ex: {
      before: "interface Mixed { name: string; age: number; email: string; }",
      after: "type StringProps<T> = {\n  [K in keyof T as T[K] extends string ? K : never]: T[K]\n}\n// { name: string; email: string; }",
      desc: "Conditional in as clause filters keys by their value type"
    }
  },
  {
    q: "Given `type T = { a: 1; b: 2 }`, what does `{ [K in keyof T as Uppercase<string & K>]: T[K] }` produce?",
    a: "{ A: 1; B: 2 }",
    cat: "mapped",
    hint: "Uppercase transforms the key string",
    ex: {
      before: "type T = { a: 1; b: 2 };",
      after: "type Upper = { [K in keyof T as Uppercase<string & K>]: T[K] }\n// { A: 1; B: 2 }",
      desc: "Key remapping with Uppercase transforms lowercase keys"
    }
  }
];
