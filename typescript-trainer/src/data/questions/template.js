export default [
  {
    q: "What is the syntax for a template literal type combining a string literal with a type parameter?",
    a: "`${T}`",
    cat: "template",
    hint: "Backticks with dollar-brace interpolation at the type level",
    ex: {
      before: "type Prefix<T extends string> = ???",
      after: "type Prefix<T extends string> = `pre_${T}`\n// Prefix<'name'> = 'pre_name'",
      desc: "Template literal types use the same syntax as JS template strings"
    }
  },
  {
    q: "What built-in type converts a string literal type to uppercase?",
    a: "Uppercase<T>",
    cat: "template",
    hint: "Intrinsic string manipulation type",
    ex: {
      before: "type T = Uppercase<'hello'>",
      after: "// 'HELLO'",
      desc: "Uppercase transforms every character to uppercase"
    }
  },
  {
    q: "What built-in type capitalizes only the first letter of a string literal type?",
    a: "Capitalize<T>",
    cat: "template",
    hint: "Different from Uppercase which transforms all characters",
    ex: {
      before: "type T = Capitalize<'hello'>",
      after: "// 'Hello'",
      desc: "Capitalize uppercases the first character only"
    }
  },
  {
    q: "What built-in type lowercases only the first letter of a string literal type?",
    a: "Uncapitalize<T>",
    cat: "template",
    hint: "Inverse of Capitalize",
    ex: {
      before: "type T = Uncapitalize<'Hello'>",
      after: "// 'hello'",
      desc: "Uncapitalize lowercases the first character only"
    }
  },
  {
    q: "Given `type Color = 'red' | 'blue'` and `type Size = 'sm' | 'lg'`, what is `${Size}-${Color}`?",
    a: "\"sm-red\" | \"sm-blue\" | \"lg-red\" | \"lg-blue\"",
    cat: "template",
    hint: "Template literals distribute over unions",
    ex: {
      before: "type Color = 'red' | 'blue';\ntype Size = 'sm' | 'lg';",
      after: "type Combo = `${Size}-${Color}`\n// 'sm-red' | 'sm-blue' | 'lg-red' | 'lg-blue'",
      desc: "All combinations of the two unions are produced"
    }
  },
  {
    q: "Using a template literal type with infer, extract the event name from strings like 'onClick', 'onHover'.",
    a: "T extends `on${infer Event}` ? Event : never",
    cat: "template",
    hint: "Pattern match on the 'on' prefix using infer",
    ex: {
      before: "type ExtractEvent<T> = ???",
      after: "type ExtractEvent<T> = T extends `on${infer Event}` ? Event : never\n// ExtractEvent<'onClick'> = 'Click'",
      desc: "Template literal with infer captures the remaining string"
    }
  },
  {
    q: "What built-in type converts a string literal type to all lowercase?",
    a: "Lowercase<T>",
    cat: "template",
    hint: "Intrinsic string manipulation type, opposite of Uppercase",
    ex: {
      before: "type T = Lowercase<'HELLO'>",
      after: "// 'hello'",
      desc: "Lowercase transforms every character to lowercase"
    }
  },
  {
    q: "Write a type that creates getter method names from property keys, e.g., 'name' becomes 'getName'.",
    a: "`get${Capitalize<T>}`",
    cat: "template",
    hint: "Combine template literal with Capitalize",
    ex: {
      before: "type Getter<T extends string> = ???",
      after: "type Getter<T extends string> = `get${Capitalize<T>}`\n// Getter<'name'> = 'getName'",
      desc: "Template literal prefixes 'get' and capitalizes the property name"
    }
  },
  {
    q: "Given `type Path = `/${string}/${string}``, does '/api/users' extend Path?",
    a: "true",
    cat: "template",
    hint: "string in template literal matches any string segment",
    ex: {
      before: "type Path = `/${string}/${string}`;\ntype Test = '/api/users' extends Path ? true : false;",
      after: "// true",
      desc: "Template literal patterns with string act as wildcards"
    }
  },
  {
    q: "How many types are in the union `${boolean}`?",
    a: "2",
    cat: "template",
    hint: "boolean is true | false",
    ex: {
      before: "type T = `${boolean}`;",
      after: "// 'true' | 'false'",
      desc: "boolean distributes into its two literal members"
    }
  }
];
