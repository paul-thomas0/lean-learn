export default [
  {
    q: "What operator produces a union of all property names of a type T?",
    a: "keyof T",
    cat: "keyof",
    hint: "Returns string | number | symbol literal union",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "type Keys = keyof User\n// \"name\" | \"age\"",
      desc: "keyof extracts property name literals"
    }
  },
  {
    q: "How do you access the type of a specific property K on type T?",
    a: "T[K]",
    cat: "keyof",
    hint: "Indexed access / lookup type",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "type NameType = User[\"name\"]\n// string",
      desc: "Square bracket notation looks up the property type"
    }
  },
  {
    q: "What operator extracts the type of a value-level variable or expression?",
    a: "typeof",
    cat: "keyof",
    hint: "Bridges the value world and the type world",
    ex: {
      before: "const config = { debug: true, port: 3000 };",
      after: "type Config = typeof config\n// { debug: boolean; port: number; }",
      desc: "typeof lifts a runtime value into the type system"
    }
  },
  {
    q: "Given `const routes = { home: '/', about: '/about' }`, what expression produces the union '/' | '/about'?",
    a: "(typeof routes)[keyof typeof routes]",
    cat: "keyof",
    hint: "Combine typeof, keyof, and indexed access",
    ex: {
      before: "const routes = { home: '/', about: '/about' };",
      after: "type Route = (typeof routes)[keyof typeof routes]\n// \"/\" | \"/about\"",
      desc: "Indexed access with keyof extracts all value types"
    }
  },
  {
    q: "Given `const sizes = { sm: 1, md: 2, lg: 3 } as const`, what is `keyof typeof sizes`?",
    a: "\"sm\" | \"md\" | \"lg\"",
    cat: "keyof",
    hint: "keyof typeof on an as const object",
    ex: {
      before: "const sizes = { sm: 1, md: 2, lg: 3 } as const;",
      after: "type SizeKey = keyof typeof sizes\n// \"sm\" | \"md\" | \"lg\"",
      desc: "keyof typeof extracts literal key names from a const object"
    }
  },
  {
    q: "Write a generic constraint so that K must be a valid key of T: `function get<T, ___>(obj: T, key: K): T[K]`",
    a: "K extends keyof T",
    cat: "keyof",
    hint: "Constrain K to the keys of T",
    ex: {
      before: "function get<T, K>(obj: T, key: K): T[K]",
      after: "function get<T, K extends keyof T>(obj: T, key: K): T[K]",
      desc: "K extends keyof T ensures type-safe property access"
    }
  },
  {
    q: "What is `keyof any` in TypeScript?",
    a: "string | number | symbol",
    cat: "keyof",
    hint: "The broadest possible key type",
    ex: {
      before: "type K = keyof any;",
      after: "// string | number | symbol",
      desc: "Any valid JavaScript property key type"
    }
  },
  {
    q: "Given `interface Nested { a: { b: { c: number } } }`, what is `Nested['a']['b']['c']`?",
    a: "number",
    cat: "keyof",
    hint: "Chained indexed access types",
    ex: {
      before: "interface Nested { a: { b: { c: number } } }",
      after: "type Deep = Nested['a']['b']['c']\n// number",
      desc: "Indexed access can be chained to reach nested types"
    }
  },
  {
    q: "Given `type Arr = string[]`, what does `Arr[number]` evaluate to?",
    a: "string",
    cat: "keyof",
    hint: "Indexed access on an array type using number",
    ex: {
      before: "type Arr = string[];",
      after: "type Elem = Arr[number]\n// string",
      desc: "Indexing an array type with number extracts the element type"
    }
  },
  {
    q: "Given `const tuple = ['a', 1, true] as const`, what is `(typeof tuple)[number]`?",
    a: "\"a\" | 1 | true",
    cat: "keyof",
    hint: "Indexed access on a const tuple with number",
    ex: {
      before: "const tuple = ['a', 1, true] as const;",
      after: "type Elem = (typeof tuple)[number]\n// \"a\" | 1 | true",
      desc: "number index on a const tuple yields a union of all element literals"
    }
  }
];
