export default [
  {
    q: "What is the syntax for a conditional type that checks if T extends U?",
    a: "T extends U ? X : Y",
    cat: "conditional",
    hint: "Ternary at the type level",
    ex: {
      before: "type Check<T> = ???",
      after: "type Check<T> = T extends string ? true : false",
      desc: "Conditional types use extends with ternary syntax"
    }
  },
  {
    q: "What keyword extracts a type from within a conditional type's extends clause?",
    a: "infer",
    cat: "conditional",
    hint: "Declares a type variable inline during pattern matching",
    ex: {
      before: "type GetReturn<T> = T extends (...args: any[]) => ___ ? ___ : never",
      after: "type GetReturn<T> = T extends (...args: any[]) => infer R ? R : never",
      desc: "infer R captures the return type into R"
    }
  },
  {
    q: "What does `Exclude<'a' | 'b' | 'c', 'a'>` evaluate to?",
    a: "\"b\" | \"c\"",
    cat: "conditional",
    hint: "Distributive conditional removes matching members",
    ex: {
      before: "type T = Exclude<'a' | 'b' | 'c', 'a'>",
      after: "// \"b\" | \"c\"",
      desc: "Exclude filters out union members that extend the second argument"
    }
  },
  {
    q: "When a conditional type `T extends U ? X : Y` is given a union for T, what behavior occurs?",
    a: "Distributive conditional",
    cat: "conditional",
    hint: "The condition is applied to each union member separately",
    ex: {
      before: "type ToArray<T> = T extends any ? T[] : never;\ntype R = ToArray<string | number>;",
      after: "// string[] | number[]  (not (string | number)[])",
      desc: "Each union member is processed independently then re-unioned"
    }
  },
  {
    q: "How do you prevent distributive behavior in a conditional type?",
    a: "[T] extends [U] ? X : Y",
    cat: "conditional",
    hint: "Wrap both sides in a tuple",
    ex: {
      before: "type ToArray<T> = T extends any ? T[] : never;",
      after: "type ToArray<T> = [T] extends [any] ? T[] : never;\n// ToArray<string | number> = (string | number)[]",
      desc: "Wrapping in square brackets disables distribution"
    }
  },
  {
    q: "What type does `T extends never ? 'yes' : 'no'` evaluate to when T = never?",
    a: "never",
    cat: "conditional",
    hint: "never is an empty union, so distribution produces...",
    ex: {
      before: "type Test<T> = T extends never ? 'yes' : 'no';\ntype R = Test<never>;",
      after: "// never (empty distribution, no members to check)",
      desc: "Distributing over never yields never since there are zero members"
    }
  },
  {
    q: "Using infer, write a type that extracts the element type from a Promise<T>.",
    a: "T extends Promise<infer U> ? U : never",
    cat: "conditional",
    hint: "Pattern match on Promise's type parameter",
    ex: {
      before: "type Unwrap<T> = ???",
      after: "type Unwrap<T> = T extends Promise<infer U> ? U : never\n// Unwrap<Promise<string>> = string",
      desc: "infer U captures the inner type of Promise"
    }
  },
  {
    q: "Using infer, write a type that extracts the first element type of a tuple.",
    a: "T extends [infer First, ...any[]] ? First : never",
    cat: "conditional",
    hint: "Variadic tuple with infer and rest",
    ex: {
      before: "type Head<T extends any[]> = ???",
      after: "type Head<T extends any[]> = T extends [infer First, ...any[]] ? First : never\n// Head<[1, 2, 3]> = 1",
      desc: "infer with rest element captures the first position"
    }
  },
  {
    q: "What does `Extract<string | number | boolean, string | boolean>` evaluate to?",
    a: "string | boolean",
    cat: "conditional",
    hint: "Opposite of Exclude, keeps matching members",
    ex: {
      before: "type T = Extract<string | number | boolean, string | boolean>",
      after: "// string | boolean",
      desc: "Extract keeps union members that extend the second argument"
    }
  },
  {
    q: "Write a conditional type that extracts the argument types of a function type T.",
    a: "T extends (...args: infer P) => any ? P : never",
    cat: "conditional",
    hint: "infer on the parameter list, returns a tuple",
    ex: {
      before: "type Args<T> = ???",
      after: "type Args<T> = T extends (...args: infer P) => any ? P : never\n// Args<(a: string, b: number) => void> = [string, number]",
      desc: "infer P in rest position captures all parameters as a tuple"
    }
  }
];
