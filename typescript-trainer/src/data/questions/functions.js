export default [
  {
    q: "What is the return type annotation for a callback that returns nothing and whose return value is intentionally ignored?",
    a: "void",
    cat: "functions",
    hint: "Allows the callback to return anything, but the caller won't use it",
    ex: {
      before: "type Callback = (item: string) => ???;",
      after: "type Callback = (item: string) => void;\n// forEach uses this — callbacks can return anything",
      desc: "void in callback position means the return value is discarded"
    }
  },
  {
    q: "How do you declare a function type that takes a string and returns a number using arrow syntax?",
    a: "(s: string) => number",
    cat: "functions",
    hint: "Uses arrow notation in a type expression",
    ex: {
      before: "// Declare a function type variable",
      after: "let parse: (s: string) => number;\nparse = parseInt;",
      desc: "Arrow function types use => to separate params from return"
    }
  },
  {
    q: "What keyword before a parameter name indicates it types the implicit `this` context, not an actual argument?",
    a: "this",
    cat: "functions",
    hint: "Must be the first parameter and is erased at runtime",
    ex: {
      before: "function getName() {\n  return this.name; // 'this' is any\n}",
      after: "function getName(this: { name: string }) {\n  return this.name; // 'this' is typed\n}",
      desc: "The this parameter types the calling context"
    }
  },
  {
    q: "How do you type a rest parameter that accepts any number of string arguments?",
    a: "...args: string[]",
    cat: "functions",
    hint: "Uses the spread operator with an array type",
    ex: {
      before: "function join(sep: string, ???) { }",
      after: "function join(sep: string, ...args: string[]) {\n  return args.join(sep);\n}",
      desc: "Rest parameters are typed as arrays"
    }
  },
  {
    q: "What is the syntax for declaring function overloads in TypeScript?",
    a: "multiple signatures before implementation",
    cat: "functions",
    hint: "Write the overload signatures, then the implementation signature",
    ex: {
      before: "// Want: different return types based on input",
      after: "function parse(input: string): number;\nfunction parse(input: number): string;\nfunction parse(input: string | number) {\n  return typeof input === 'string'\n    ? parseInt(input) : String(input);\n}",
      desc: "Overload signatures are listed before the implementation"
    }
  },
  {
    q: "What utility type extracts the return type of a function type T?",
    a: "ReturnType<T>",
    cat: "functions",
    hint: "A built-in conditional type that infers the return",
    ex: {
      before: "function getUser() {\n  return { name: 'Alice', age: 30 };\n}",
      after: "function getUser() {\n  return { name: 'Alice', age: 30 };\n}\ntype User = ReturnType<typeof getUser>;\n// { name: string; age: number }",
      desc: "ReturnType extracts what a function returns"
    }
  },
  {
    q: "What utility type extracts the parameter types of a function type T as a tuple?",
    a: "Parameters<T>",
    cat: "functions",
    hint: "Returns a tuple type of all parameter types",
    ex: {
      before: "function add(a: number, b: number): number { return a + b; }",
      after: "function add(a: number, b: number): number { return a + b; }\ntype P = Parameters<typeof add>; // [number, number]",
      desc: "Parameters<T> gives a tuple of the function's param types"
    }
  },
  {
    q: "How do you type a generic function that takes an array of T and returns T?",
    a: "<T>(arr: T[]) => T",
    cat: "functions",
    hint: "Type parameter goes before the parameter list",
    ex: {
      before: "// Want: function that returns first element of any array",
      after: "function first<T>(arr: T[]): T {\n  return arr[0];\n}\nfirst([1, 2, 3]); // returns number",
      desc: "Generic functions use <T> before parameters"
    }
  },
  {
    q: "What is the type of a constructor function (newable) that produces an instance of type T?",
    a: "new (...args: any[]) => T",
    cat: "functions",
    hint: "Uses the new keyword in the type signature",
    ex: {
      before: "// Want: a type for any class constructor",
      after: "type Constructor<T> = new (...args: any[]) => T;\nfunction create<T>(ctor: Constructor<T>): T {\n  return new ctor();\n}",
      desc: "The new keyword in a type represents a constructor"
    }
  },
  {
    q: "What does TypeScript infer as the return type of `function f() { return; }`?",
    a: "void",
    cat: "functions",
    hint: "A bare return statement returns undefined, but the type is...",
    ex: {
      before: "function f() { return; }",
      after: "function f() { return; } // return type: void",
      desc: "Functions with no return value are inferred as void"
    }
  },
];
