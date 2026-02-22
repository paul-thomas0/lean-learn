export default [
  {
    q: "What utility type creates a type with all properties of T set to optional?",
    a: "Partial<T>",
    cat: "utility",
    hint: "Built-in utility type",
    ex: {
      before: "interface User { name: string; age: number; }",
      after: "type MaybeUser = Partial<User>\n// { name?: string; age?: number; }",
      desc: "All properties become optional"
    }
  },
  {
    q: "What utility type makes all properties of T required (non-optional)?",
    a: "Required<T>",
    cat: "utility",
    hint: "Opposite of Partial",
    ex: {
      before: "interface Config { debug?: boolean; port?: number; }",
      after: "type StrictConfig = Required<Config>\n// { debug: boolean; port: number; }",
      desc: "All optional properties become required"
    }
  },
  {
    q: "What utility type makes all properties of T readonly?",
    a: "Readonly<T>",
    cat: "utility",
    hint: "Prevents reassignment of properties",
    ex: {
      before: "interface Point { x: number; y: number; }",
      after: "type FrozenPoint = Readonly<Point>\n// { readonly x: number; readonly y: number; }",
      desc: "Properties cannot be reassigned after creation"
    }
  },
  {
    q: "What utility type constructs an object type with keys K and values of type V?",
    a: "Record<K, V>",
    cat: "utility",
    hint: "Creates a dictionary-like type",
    ex: {
      before: "type Role = 'admin' | 'user' | 'guest';",
      after: "type Permissions = Record<Role, boolean>\n// { admin: boolean; user: boolean; guest: boolean; }",
      desc: "Each key in the union gets a property of the value type"
    }
  },
  {
    q: "What utility type creates a type by picking only keys K from T?",
    a: "Pick<T, K>",
    cat: "utility",
    hint: "Select a subset of properties",
    ex: {
      before: "interface User { name: string; age: number; email: string; }",
      after: "type NameAndEmail = Pick<User, 'name' | 'email'>\n// { name: string; email: string; }",
      desc: "Only the specified properties are kept"
    }
  },
  {
    q: "What utility type creates a type by removing keys K from T?",
    a: "Omit<T, K>",
    cat: "utility",
    hint: "Opposite of Pick",
    ex: {
      before: "interface User { id: number; name: string; password: string; }",
      after: "type SafeUser = Omit<User, 'password'>\n// { id: number; name: string; }",
      desc: "The specified properties are excluded"
    }
  },
  {
    q: "What utility type removes null and undefined from a union type T?",
    a: "NonNullable<T>",
    cat: "utility",
    hint: "Filters out nullish types",
    ex: {
      before: "type Maybe = string | null | undefined;",
      after: "type Sure = NonNullable<Maybe>\n// string",
      desc: "null and undefined are stripped from the union"
    }
  },
  {
    q: "What utility type extracts the return type of a function type T?",
    a: "ReturnType<T>",
    cat: "utility",
    hint: "Uses conditional types with infer internally",
    ex: {
      before: "function getUser() { return { name: 'Alice', age: 30 }; }",
      after: "type User = ReturnType<typeof getUser>\n// { name: string; age: number; }",
      desc: "Captures the return type of the function"
    }
  },
  {
    q: "What utility type extracts the parameter types of a function type T as a tuple?",
    a: "Parameters<T>",
    cat: "utility",
    hint: "Returns a tuple type of all parameters",
    ex: {
      before: "function add(a: number, b: number): number { return a + b; }",
      after: "type P = Parameters<typeof add>\n// [a: number, b: number]",
      desc: "Function parameters are captured as a tuple"
    }
  },
  {
    q: "What utility type recursively unwraps Promise types to get the resolved value?",
    a: "Awaited<T>",
    cat: "utility",
    hint: "TypeScript 4.5+ built-in, mirrors await behavior",
    ex: {
      before: "type Nested = Promise<Promise<string>>;",
      after: "type Result = Awaited<Nested>\n// string",
      desc: "Recursively unwraps nested Promises"
    }
  },
  {
    q: "What utility type extracts the instance type from a constructor/class type T?",
    a: "InstanceType<T>",
    cat: "utility",
    hint: "Works with constructor types (typeof ClassName)",
    ex: {
      before: "class Foo { x = 1; }",
      after: "type FooInstance = InstanceType<typeof Foo>\n// Foo",
      desc: "Extracts the type that new T() would produce"
    }
  },
  {
    q: "What utility type extracts the parameter types of a constructor function type T?",
    a: "ConstructorParameters<T>",
    cat: "utility",
    hint: "Like Parameters but for class constructors",
    ex: {
      before: "class User { constructor(name: string, age: number) {} }",
      after: "type CP = ConstructorParameters<typeof User>\n// [name: string, age: number]",
      desc: "Captures constructor parameters as a tuple"
    }
  }
];
