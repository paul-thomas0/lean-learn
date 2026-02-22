export default [
  {
    q: "What are the two equivalent syntaxes for typing an array of strings?",
    a: "string[] | Array<string>",
    cat: "arrays",
    hint: "One uses bracket notation, the other uses a generic",
    ex: {
      before: "let a: string[];\nlet b: Array<string>;",
      after: "// Both are identical:\nlet a: string[] = ['hi'];\nlet b: Array<string> = ['hi'];",
      desc: "string[] and Array<string> are interchangeable"
    }
  },
  {
    q: "What type annotation creates a fixed-length array with a string at index 0 and a number at index 1?",
    a: "[string, number]",
    cat: "arrays",
    hint: "A fixed-length array with specific types per position",
    ex: {
      before: "const pair = ['hello', 42];",
      after: "const pair: [string, number] = ['hello', 42];",
      desc: "Tuple types specify the type of each element by position"
    }
  },
  {
    q: "What modifier makes an array type immutable, preventing push, pop, and index assignment?",
    a: "readonly",
    cat: "arrays",
    hint: "Placed before the array type",
    ex: {
      before: "let arr: string[] = ['a'];\narr.push('b'); // OK",
      after: "let arr: readonly string[] = ['a'];\n// arr.push('b'); // Error!\n// arr[0] = 'z';  // Error!",
      desc: "readonly arrays prevent all mutations"
    }
  },
  {
    q: "What is the type of `[1, 'two', true] as const`?",
    a: "readonly [1, \"two\", true]",
    cat: "arrays",
    hint: "as const makes the tuple readonly with literal types",
    ex: {
      before: "const t = [1, 'two', true];\n// type: (string | number | boolean)[]",
      after: "const t = [1, 'two', true] as const;\n// type: readonly [1, 'two', true]",
      desc: "as const creates a readonly tuple with literal element types"
    }
  },
  {
    q: "How do you type a tuple where the first element is a string followed by any number of numbers?",
    a: "[string, ...number[]]",
    cat: "arrays",
    hint: "Uses a rest element in the tuple",
    ex: {
      before: "// Want: ['label', 1, 2, 3, ...]",
      after: "type Row = [string, ...number[]];\nconst r: Row = ['scores', 98, 85, 92];",
      desc: "Rest elements allow variable-length tuples"
    }
  },
  {
    q: "What utility type extracts the element type from an array type T[]?",
    a: "T[number]",
    cat: "arrays",
    hint: "Uses indexed access with the number type",
    ex: {
      before: "type Arr = string[];",
      after: "type Arr = string[];\ntype Elem = Arr[number]; // string",
      desc: "Indexing an array type with number gives the element type"
    }
  },
  {
    q: "What is the type of `arr.length` when arr has type `[string, number, boolean]`?",
    a: "3",
    cat: "arrays",
    hint: "Tuple types know their exact length",
    ex: {
      before: "const arr: [string, number, boolean] = ['a', 1, true];",
      after: "const arr: [string, number, boolean] = ['a', 1, true];\narr.length; // type: 3",
      desc: "Tuple length is a numeric literal type"
    }
  },
  {
    q: "How do you type a labeled tuple parameter with names `name` and `age`?",
    a: "[name: string, age: number]",
    cat: "arrays",
    hint: "Labels appear before the colon in each position",
    ex: {
      before: "type Person = [string, number];",
      after: "type Person = [name: string, age: number];",
      desc: "Labeled tuples improve readability and IDE hints"
    }
  },
  {
    q: "Given `type T = [1, 2, 3]`, what does `T['length']` resolve to?",
    a: "3",
    cat: "arrays",
    hint: "Accessing the length property of a tuple type",
    ex: {
      before: "type T = [1, 2, 3];",
      after: "type T = [1, 2, 3];\ntype Len = T['length']; // 3",
      desc: "Tuple types expose length as a literal number type"
    }
  },
  {
    q: "What is the generic readonly array type equivalent to `readonly T[]`?",
    a: "ReadonlyArray<T>",
    cat: "arrays",
    hint: "A built-in generic interface for immutable arrays",
    ex: {
      before: "let a: readonly string[];",
      after: "let a: ReadonlyArray<string>;\n// Equivalent to readonly string[]",
      desc: "ReadonlyArray<T> and readonly T[] are interchangeable"
    }
  },
  {
    q: "How do you type an optional element at the end of a tuple `[string, number?]`? What values are valid for the second element?",
    a: "number | undefined",
    cat: "arrays",
    hint: "Optional tuple elements become a union with undefined",
    ex: {
      before: "type T = [string, number?];",
      after: "type T = [string, number?];\nconst a: T = ['hi'];       // OK\nconst b: T = ['hi', 42];   // OK",
      desc: "Optional tuple elements can be omitted or undefined"
    }
  },
];
