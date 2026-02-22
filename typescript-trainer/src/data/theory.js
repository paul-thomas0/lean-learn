export const FUNDAMENTALS = {
  structural: {
    heading: "Structural Typing",
    content: "TypeScript uses structural typing (duck typing) — if two types have the same shape, they're compatible. Unlike nominal typing (used in Java/C#), you don't need to explicitly declare that a type implements an interface. If it has the required properties, it fits. This means { name: string, age: number } is assignable to { name: string } because it has all the required fields.",
  },
  inference: {
    heading: "Type Inference",
    content: "TypeScript infers types automatically in most cases. When you write `let x = 5`, TypeScript knows x is a number. When you write `const x = 5`, TypeScript infers the literal type 5. Function return types are inferred from return statements. You only need explicit annotations at boundaries — function parameters, complex objects, or when inference isn't specific enough.",
  },
  typesVsValues: {
    heading: "Types vs Values",
    content: "TypeScript has two parallel worlds: the type level and the value level. Types exist only at compile time and are erased in JavaScript output. `type`, `interface`, and type annotations are type-level. Variables, functions, and classes exist at both levels. The `typeof` operator bridges these worlds — in type position, `typeof myVar` gives you the type of a value.",
  },
};

export const CATEGORY_THEORY = {
  primitives: {
    intro: "Primitive types are the building blocks of TypeScript's type system. Understanding them — especially the differences between any, unknown, and never — is essential.",
    concepts: [
      { heading: "The Primitive Types", content: "TypeScript has 7 primitive types matching JavaScript: string, number, boolean, null, undefined, symbol, and bigint. Additionally, void represents the absence of a return value. These are the atoms from which all other types are built." },
      { heading: "any vs unknown vs never", content: "any opts out of type checking entirely — anything goes. unknown is the type-safe counterpart: you can assign anything to it, but must narrow before using it. never represents the empty type — no value can be never. It appears in exhaustive checks and functions that never return." },
      { heading: "Literal Types", content: "TypeScript can narrow primitives to exact values: 'hello' is a string literal type, 42 is a number literal type, true is a boolean literal type. const declarations infer literal types, while let declarations widen to the base type. Literal types are the foundation of discriminated unions." },
      { heading: "Type Widening & Narrowing", content: "Widening happens when TypeScript broadens a literal type to its base type (e.g., let x = 'hi' becomes string). Narrowing is the reverse — using typeof, instanceof, or other checks to refine a broad type to something more specific. Control flow analysis tracks narrowing automatically." },
    ],
  },
  unions: {
    intro: "Union and intersection types let you combine types in powerful ways — unions for 'either/or' and intersections for 'both/and'.",
    concepts: [
      { heading: "Union Types (A | B)", content: "A union type accepts values of any member type. string | number accepts both strings and numbers. You can only access properties common to all members unless you narrow first. Unions are the basis for modeling variants and optional values." },
      { heading: "Intersection Types (A & B)", content: "An intersection combines multiple types into one that has all properties from each. { name: string } & { age: number } gives { name: string; age: number }. Intersections are useful for mixins and combining interfaces." },
      { heading: "Discriminated Unions", content: "A discriminated union uses a common literal property (the discriminant) to distinguish variants. Each variant has a unique value for that property. TypeScript narrows the type based on checking the discriminant, enabling exhaustive pattern matching." },
      { heading: "Union Distribution", content: "When unions interact with generic conditional types, they distribute: if T is A | B, then T extends U ? X : Y becomes (A extends U ? X : Y) | (B extends U ? X : Y). This is how Exclude and Extract work under the hood." },
    ],
  },
  arrays: {
    intro: "Arrays and tuples represent ordered collections. TypeScript distinguishes between homogeneous arrays and fixed-length tuples with specific element types.",
    concepts: [
      { heading: "Array Types", content: "Two equivalent syntaxes: string[] and Array<string>. The element type can be any type, including unions (string | number)[]. Arrays are mutable by default — push, pop, etc. are allowed." },
      { heading: "Readonly Arrays", content: "readonly string[] or ReadonlyArray<string> prevents mutation — no push, pop, or index assignment. Useful for function parameters that shouldn't modify the input. A mutable array is assignable to a readonly one, but not vice versa." },
      { heading: "Tuple Types", content: "Tuples are fixed-length arrays with specific types per position: [string, number] is a 2-element tuple. They can have optional elements [string, number?], rest elements [string, ...number[]], and labels [name: string, age: number]." },
      { heading: "Variadic Tuple Types", content: "TypeScript supports spread in tuple types: [...T, ...U] concatenates tuples. This enables type-safe functions like concat, zip, and other operations that combine arrays. The rest element captures remaining items." },
    ],
  },
  objects: {
    intro: "Object types describe the shape of JavaScript objects. TypeScript offers interfaces, type aliases, and powerful modifiers for precise modeling.",
    concepts: [
      { heading: "Interfaces vs Type Aliases", content: "Both define object shapes, but interfaces support declaration merging (adding properties across multiple declarations) while type aliases support unions and intersections directly. Interfaces use `extends` for inheritance; type aliases use `&`. Prefer interfaces for object shapes that might be extended." },
      { heading: "Optional & Readonly Properties", content: "Optional properties (name?: string) may be undefined. Readonly properties (readonly id: number) can't be reassigned after initialization. These modifiers can be added or removed with mapped types using +/- syntax." },
      { heading: "Index Signatures", content: "[key: string]: number means any string key maps to a number value. All named properties must be compatible with the index signature. Use Record<string, number> as a cleaner alternative for dictionaries." },
      { heading: "Excess Property Checks", content: "When assigning an object literal directly to a typed variable, TypeScript checks for extra properties. This catches typos and mistaken properties. Assigning through a variable or using a type assertion bypasses this check." },
    ],
  },
  functions: {
    intro: "Function types describe callable values. TypeScript supports overloads, generic functions, and precise parameter/return modeling.",
    concepts: [
      { heading: "Function Type Expressions", content: "The syntax (a: string, b: number) => boolean describes a function type. Parameter names are required in type position but don't need to match at the call site. The return type follows the arrow." },
      { heading: "Call Signatures & Construct Signatures", content: "Interfaces can describe callable objects: { (x: number): string } is a call signature. { new (x: number): MyClass } is a construct signature. Some objects are both callable and constructable." },
      { heading: "Function Overloads", content: "Overloads declare multiple function signatures followed by a single implementation. TypeScript resolves to the first matching overload. The implementation signature must be compatible with all overload signatures but isn't directly callable." },
      { heading: "Generic Functions", content: "Generic functions use type parameters to relate inputs and outputs: function first<T>(arr: T[]): T. TypeScript infers type arguments from usage. Add constraints with extends: function longest<T extends { length: number }>(a: T, b: T): T." },
    ],
  },
  narrowing: {
    intro: "Type narrowing is how TypeScript refines broad types into more specific ones within conditional blocks. It's essential for safely working with unions.",
    concepts: [
      { heading: "typeof Guards", content: "typeof x === 'string' narrows x to string. Works for string, number, boolean, symbol, bigint, undefined, object, and function. Note: typeof null === 'object' is a JavaScript quirk that TypeScript handles." },
      { heading: "instanceof and in Guards", content: "x instanceof Date narrows x to Date. 'name' in x narrows x to types that have a name property. Both work with control flow analysis to refine types in branches." },
      { heading: "Type Predicates", content: "A type predicate is a return type of the form `x is Type`: function isString(val: unknown): val is string. When the function returns true, TypeScript narrows the parameter to that type. This is how you create custom narrowing functions." },
      { heading: "Exhaustiveness with never", content: "In a switch/if-else chain covering all union members, the remaining type in the default case is never. Assigning to a never variable ensures you handle all cases — if you add a new variant, TypeScript errors at compile time." },
    ],
  },
  generics: {
    intro: "Generics let you write reusable code that works with any type while preserving type relationships. They're the foundation of TypeScript's advanced type system.",
    concepts: [
      { heading: "Type Parameters", content: "A type parameter is a placeholder for a type, declared in angle brackets: function identity<T>(arg: T): T. The caller decides what T is, either explicitly identity<string>('hi') or through inference identity('hi')." },
      { heading: "Constraints with extends", content: "Constraints limit what types a parameter accepts: <T extends { length: number }> means T must have a length property. This lets you access length safely while keeping T generic. Multiple constraints use intersection: T extends A & B." },
      { heading: "Default Type Parameters", content: "Type parameters can have defaults: <T = string>. This lets callers omit the type argument when the default works. Defaults must come after required parameters, just like function argument defaults." },
      { heading: "Multiple Type Parameters", content: "Functions can have multiple type parameters: function map<T, U>(arr: T[], fn: (item: T) => U): U[]. Each parameter captures a different type relationship. Use as few as needed — unnecessary parameters add complexity." },
    ],
  },
  keyof: {
    intro: "keyof and indexed access types let you derive new types from existing ones by working with their keys and value types.",
    concepts: [
      { heading: "The keyof Operator", content: "keyof T produces a union of T's property names as string literal types. For { name: string; age: number }, keyof gives 'name' | 'age'. This is the foundation for creating type-safe property access patterns." },
      { heading: "Indexed Access Types", content: "T[K] looks up the type of property K in T. For { name: string; age: number }, T['name'] is string. K must extend keyof T. You can use unions: T['name' | 'age'] gives string | number." },
      { heading: "typeof in Type Position", content: "typeof myVariable gives you the type of a value at the type level. Combined with keyof: keyof typeof myObject gives the keys of a value. This bridges the value world and type world." },
      { heading: "Lookup Types", content: "You can chain indexed access: T[K][J] looks up nested types. Array element types use T[number]. Tuple element types use T[0], T[1], etc. These are building blocks for type-level programming." },
    ],
  },
  conditional: {
    intro: "Conditional types let you express type-level if/else logic. Combined with infer, they enable powerful type transformations.",
    concepts: [
      { heading: "Basic Syntax", content: "T extends U ? X : Y checks if T is assignable to U. If yes, the result is X; otherwise Y. This is like a ternary operator at the type level. Example: T extends string ? 'yes' : 'no'." },
      { heading: "The infer Keyword", content: "infer declares a type variable inside a conditional: T extends Array<infer U> ? U : never extracts the element type of an array. infer can appear in return types, parameter types, and more. It's how ReturnType and Parameters work." },
      { heading: "Distributive Conditional Types", content: "When T is a union and appears as the checked type, the conditional distributes over each member. string | number extends X ? Y : Z becomes (string extends X ? Y : Z) | (number extends X ? Y : Z). Wrap in [T] to prevent distribution." },
      { heading: "Filtering with never", content: "Since never disappears from unions, conditional types can filter: T extends U ? T : never keeps only members of T that extend U. This is exactly how Extract<T, U> works. Exclude uses the opposite: T extends U ? never : T." },
    ],
  },
  mapped: {
    intro: "Mapped types transform every property in a type systematically. They're the type-level equivalent of Array.map().",
    concepts: [
      { heading: "Basic Mapped Types", content: "{ [K in keyof T]: NewType } iterates over each key K of T and produces a new property with a transformed type. Partial<T> is { [K in keyof T]?: T[K] } — same keys, same types, but all optional." },
      { heading: "Modifier Addition & Removal", content: "Use + or - to add or remove readonly and ? modifiers. Required<T> is { [K in keyof T]-?: T[K] } — removes optionality. -readonly removes readonly. This gives precise control over property modifiers." },
      { heading: "Key Remapping with as", content: "{ [K in keyof T as NewKey]: T[K] } transforms the key itself. Use template literals for prefixing: { [K in keyof T as `get${Capitalize<K>}`]: () => T[K] }. Filter keys by remapping to never." },
      { heading: "Iterating Over Unions", content: "The in clause works with any union, not just keyof: { [K in 'a' | 'b' | 'c']: number } creates { a: number; b: number; c: number }. This is how Record<K, V> works: { [P in K]: V }." },
    ],
  },
  template: {
    intro: "Template literal types bring string manipulation to the type level, enabling pattern matching and type-safe string operations.",
    concepts: [
      { heading: "Template Literal Syntax", content: "Backtick types work like template strings: `hello_${string}` matches any string starting with 'hello_'. Union members multiply: `${'get' | 'set'}_${'name' | 'age'}` produces 'get_name' | 'get_age' | 'set_name' | 'set_age'." },
      { heading: "Intrinsic String Types", content: "Four built-in types manipulate string literal types: Uppercase<'hello'> gives 'HELLO', Lowercase<'HELLO'> gives 'hello', Capitalize<'hello'> gives 'Hello', Uncapitalize<'Hello'> gives 'hello'. These are compiler intrinsics, not regular generics." },
      { heading: "Pattern Matching with infer", content: "Template literals with infer extract parts of strings: T extends `${infer Prefix}_${infer Rest}` ? Prefix : never. This enables parsing routes, event names, CSS properties, and other string patterns at the type level." },
      { heading: "Type-Safe Event Handlers", content: "Combine template literals with mapped types for patterns like: { [K in keyof T as `on${Capitalize<K>}Change`]: (value: T[K]) => void }. This generates type-safe event handler interfaces from data shapes." },
    ],
  },
  utility: {
    intro: "TypeScript ships with built-in utility types that perform common type transformations. Most are implemented using mapped and conditional types.",
    concepts: [
      { heading: "Property Modifiers", content: "Partial<T> makes all properties optional. Required<T> makes all required. Readonly<T> makes all readonly. These use mapped types with modifier syntax (+? / -? / +readonly)." },
      { heading: "Property Selection", content: "Pick<T, K> keeps only the specified keys. Omit<T, K> removes the specified keys. Record<K, V> creates an object type with keys K and values V. These are essential for shaping API responses and component props." },
      { heading: "Union Filtering", content: "Exclude<T, U> removes members of T assignable to U. Extract<T, U> keeps only members assignable to U. NonNullable<T> removes null and undefined. These use conditional types with never filtering." },
      { heading: "Function Introspection", content: "ReturnType<F> extracts the return type of a function type. Parameters<F> extracts parameter types as a tuple. ConstructorParameters<C> and InstanceType<C> do the same for classes. Awaited<T> unwraps Promise types recursively." },
    ],
  },
  assertions: {
    intro: "Type assertions and guards let you tell TypeScript things it can't infer on its own. Use them carefully — they bypass type safety.",
    concepts: [
      { heading: "Type Assertions (as)", content: "value as Type tells TypeScript to treat a value as a specific type. It doesn't change the runtime value — it's a compile-time override. You can only assert to related types (or go through unknown for unrelated ones). Use sparingly." },
      { heading: "const Assertions", content: "as const makes TypeScript infer the narrowest possible type: literal types instead of string/number, readonly arrays instead of mutable, and readonly properties on objects. It's the opposite of type widening." },
      { heading: "The satisfies Operator", content: "expr satisfies Type checks that an expression matches a type without changing the inferred type. Unlike `as`, it doesn't widen or narrow — it validates while preserving the specific type. Great for configuration objects." },
      { heading: "Non-null Assertion (!)", content: "The postfix ! operator removes null and undefined from a type: value! asserts value is non-null. It's a convenience shortcut but unsafe if the value actually is null. Prefer proper narrowing when possible." },
    ],
  },
  advanced: {
    intro: "Advanced patterns push TypeScript's type system to its limits — recursive types, branded types, variance annotations, and more.",
    concepts: [
      { heading: "Recursive Types", content: "Types can reference themselves: type Tree<T> = { value: T; children: Tree<T>[] }. JSON can be modeled as: type Json = string | number | boolean | null | Json[] | { [key: string]: Json }. TypeScript handles recursive types with depth limits." },
      { heading: "Branded/Opaque Types", content: "A branded type adds a phantom property to prevent accidental assignment: type USD = number & { __brand: 'USD' }. This makes USD and EUR incompatible even though both are numbers at runtime. Use for IDs, currencies, and validated values." },
      { heading: "Declaration Merging", content: "Multiple declarations with the same name merge into one. Interface declarations merge their members. Namespaces merge with classes, functions, and enums. Module augmentation uses this to extend third-party types." },
      { heading: "Variance Annotations", content: "TypeScript 4.7+ supports explicit variance: out T (covariant — T only appears in output positions), in T (contravariant — T only appears in input positions), in out T (invariant). These help TypeScript check assignability more precisely." },
    ],
  },
};
