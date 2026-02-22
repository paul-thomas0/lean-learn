export default [
  {
    q: "What keyword declares a named object type that can be extended and merged?",
    a: "interface",
    cat: "objects",
    hint: "Supports declaration merging unlike the alternative",
    ex: {
      before: "// How to define a named object shape?",
      after: "interface User {\n  name: string;\n  age: number;\n}",
      desc: "Interfaces define object shapes and support merging"
    }
  },
  {
    q: "What keyword creates a type alias that can represent any type, not just objects?",
    a: "type",
    cat: "objects",
    hint: "More flexible than interface but cannot be merged",
    ex: {
      before: "// Can represent unions, primitives, tuples, etc.",
      after: "type ID = string | number;\ntype Point = { x: number; y: number };",
      desc: "type aliases can name any type expression"
    }
  },
  {
    q: "How do you mark a property `age` as optional in an interface?",
    a: "age?: number",
    cat: "objects",
    hint: "Uses a special character after the property name",
    ex: {
      before: "interface User {\n  name: string;\n  age: number; // required\n}",
      after: "interface User {\n  name: string;\n  age?: number; // optional\n}",
      desc: "The ? modifier makes a property optional"
    }
  },
  {
    q: "What modifier prevents a property from being reassigned after initialization?",
    a: "readonly",
    cat: "objects",
    hint: "Placed before the property name",
    ex: {
      before: "interface Config {\n  port: number;\n}",
      after: "interface Config {\n  readonly port: number;\n}\n// cfg.port = 4000; // Error!",
      desc: "readonly prevents reassignment of the property"
    }
  },
  {
    q: "What is the syntax for an index signature that allows any string key mapping to a number value?",
    a: "[key: string]: number",
    cat: "objects",
    hint: "Uses bracket notation with a parameter name and type",
    ex: {
      before: "// Want: any string key -> number value",
      after: "interface Scores {\n  [key: string]: number;\n}\nconst s: Scores = { math: 95, eng: 88 };",
      desc: "Index signatures allow arbitrary keys of a given type"
    }
  },
  {
    q: "What happens when you assign an object literal with extra properties directly to a typed variable?",
    a: "excess property check error",
    cat: "objects",
    hint: "Only applies to fresh object literals, not variables",
    ex: {
      before: "interface Point { x: number; y: number; }",
      after: "interface Point { x: number; y: number; }\nconst p: Point = { x: 1, y: 2, z: 3 };\n// Error: 'z' does not exist in type 'Point'",
      desc: "Object literals are checked for excess properties"
    }
  },
  {
    q: "What keyword does an interface use to inherit properties from another interface?",
    a: "extends",
    cat: "objects",
    hint: "Creates a subtype relationship",
    ex: {
      before: "interface Animal { name: string; }\n// Want to add 'bark' property",
      after: "interface Animal { name: string; }\ninterface Dog extends Animal {\n  bark(): void;\n}",
      desc: "extends creates an interface that inherits all parent properties"
    }
  },
  {
    q: "What utility type makes all properties of T optional?",
    a: "Partial<T>",
    cat: "objects",
    hint: "Useful for update/patch operations",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "interface User { name: string; age: number; }\nfunction update(u: User, patch: Partial<User>) {\n  return { ...u, ...patch };\n}",
      desc: "Partial<T> makes every property optional"
    }
  },
  {
    q: "What utility type makes all properties of T required (removing optional modifiers)?",
    a: "Required<T>",
    cat: "objects",
    hint: "The opposite of Partial",
    ex: {
      before: "interface Props { title?: string; width?: number; }",
      after: "interface Props { title?: string; width?: number; }\ntype Strict = Required<Props>;\n// { title: string; width: number }",
      desc: "Required<T> removes all ? modifiers"
    }
  },
  {
    q: "What utility type constructs a type with properties K of type T?",
    a: "Record<K, T>",
    cat: "objects",
    hint: "Creates a mapped object type from keys and values",
    ex: {
      before: "// Want: object with string keys and number values",
      after: "type Prices = Record<string, number>;\nconst p: Prices = { apple: 1.5, banana: 0.75 };",
      desc: "Record<K, T> maps keys of type K to values of type T"
    }
  },
  {
    q: "What utility type creates a type by picking properties K from T?",
    a: "Pick<T, K>",
    cat: "objects",
    hint: "Selects a subset of properties",
    ex: {
      before: "interface User { id: number; name: string; email: string; }",
      after: "interface User { id: number; name: string; email: string; }\ntype Preview = Pick<User, 'id' | 'name'>;\n// { id: number; name: string }",
      desc: "Pick<T, K> extracts only the specified properties"
    }
  },
  {
    q: "What utility type creates a type by removing properties K from T?",
    a: "Omit<T, K>",
    cat: "objects",
    hint: "The opposite of Pick",
    ex: {
      before: "interface User { id: number; name: string; email: string; }",
      after: "interface User { id: number; name: string; email: string; }\ntype NoEmail = Omit<User, 'email'>;\n// { id: number; name: string }",
      desc: "Omit<T, K> removes the specified properties"
    }
  },
];
