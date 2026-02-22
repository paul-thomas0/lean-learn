export default [
  {
    q: "How do you define a recursive type that deeply makes all properties optional?",
    a: "{ [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] }",
    cat: "advanced",
    hint: "Mapped type that references itself for nested objects",
    ex: {
      before: "type DeepPartial<T> = ???",
      after: "type DeepPartial<T> = {\n  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]\n}",
      desc: "Recursively applies Partial to nested object properties"
    }
  },
  {
    q: "What technique allows you to add new properties to an existing interface across multiple declarations?",
    a: "Declaration merging",
    cat: "advanced",
    hint: "Re-declaring the same interface name combines them",
    ex: {
      before: "interface Window { title: string; }",
      after: "interface Window { title: string; }\ninterface Window { customProp: number; }\n// Window has both title and customProp",
      desc: "Multiple interface declarations with the same name are merged"
    }
  },
  {
    q: "What syntax adds new types or values to an existing module from outside that module?",
    a: "declare module 'module-name' { ... }",
    cat: "advanced",
    hint: "Module augmentation uses declare module with the module's string name",
    ex: {
      before: "// express doesn't have myProp on Request",
      after: "declare module 'express' {\n  interface Request { myProp: string; }\n}",
      desc: "Module augmentation extends third-party types"
    }
  },
  {
    q: "What keyword marks a type parameter as covariant in TypeScript 4.7+?",
    a: "out",
    cat: "advanced",
    hint: "Variance annotation on generic type parameters",
    ex: {
      before: "interface Producer<T> { get(): T; }",
      after: "interface Producer<out T> { get(): T; }",
      desc: "out marks T as only appearing in output positions"
    }
  },
  {
    q: "What keyword marks a type parameter as contravariant in TypeScript 4.7+?",
    a: "in",
    cat: "advanced",
    hint: "Opposite of out, for input positions",
    ex: {
      before: "interface Consumer<T> { accept(val: T): void; }",
      after: "interface Consumer<in T> { accept(val: T): void; }",
      desc: "in marks T as only appearing in input positions"
    }
  },
  {
    q: "What pattern creates a nominal/opaque type by intersecting a primitive with a unique symbol brand?",
    a: "type Brand<T, B> = T & { readonly __brand: B }",
    cat: "advanced",
    hint: "Uses intersection with a phantom property",
    ex: {
      before: "type USD = number;\ntype EUR = number;\n// USD and EUR are interchangeable!",
      after: "type Brand<T, B> = T & { readonly __brand: B };\ntype USD = Brand<number, 'USD'>;\ntype EUR = Brand<number, 'EUR'>;\n// USD and EUR are now incompatible",
      desc: "Branded types prevent accidental mixing of structurally identical types"
    }
  },
  {
    q: "In a recursive type that flattens nested arrays, what is the conditional check?",
    a: "T extends Array<infer U> ? Flatten<U> : T",
    cat: "advanced",
    hint: "Unwrap one array layer and recurse",
    ex: {
      before: "type Flatten<T> = ???",
      after: "type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T\n// Flatten<number[][][]> = number",
      desc: "Recursively unwraps array layers until a non-array is found"
    }
  },
  {
    q: "What pattern allows chaining methods that return `this` for a fluent/builder API?",
    a: "return this",
    cat: "advanced",
    hint: "Polymorphic this type in method return",
    ex: {
      before: "class Builder {\n  setName(n: string): ??? { this.name = n; }\n}",
      after: "class Builder {\n  setName(n: string): this { this.name = n; return this; }\n}\n// new Builder().setName('x').setAge(1) // chains",
      desc: "Returning this preserves the derived class type through the chain"
    }
  },
  {
    q: "How do you type a JSON value recursively in TypeScript?",
    a: "string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }",
    cat: "advanced",
    hint: "Union of primitives, arrays, and objects that reference themselves",
    ex: {
      before: "type JsonValue = ???",
      after: "type JsonValue =\n  | string | number | boolean | null\n  | JsonValue[]\n  | { [key: string]: JsonValue }",
      desc: "Recursive type covering all valid JSON structures"
    }
  },
  {
    q: "What TypeScript feature lets you add a property to the global scope's type?",
    a: "declare global { ... }",
    cat: "advanced",
    hint: "Global augmentation inside a module file",
    ex: {
      before: "// Need to add myGlobal to globalThis",
      after: "declare global {\n  var myGlobal: string;\n}\n// Now globalThis.myGlobal is typed",
      desc: "declare global augments the global scope from within a module"
    }
  }
];
