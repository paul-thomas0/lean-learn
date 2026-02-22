export default [
  { q: "Search all TODOs", a: "Space-st", cat: "todo", hint: "s = search, t = todo",
    ex: { before: null, after: '┌─ TODOs ──────────────────┐\n│ TODO  app.ts:12          │\n│ FIXME lib.ts:5           │\n│ HACK  utils.ts:20        │\n└──────────────────────────┘', desc: "Search all TODO/FIXME/HACK comments in project" } },
  { q: "TODOs in Trouble", a: "Space-xT", cat: "todo",
    ex: { before: null, after: '┌─ Trouble TODOs ──────────┐\n│ TODO  app.ts:12  fix me  │\n│ FIXME lib.ts:5  broken   │\n└──────────────────────────┘', desc: "Opens all TODO comments in Trouble panel" } },
  { q: "Next TODO comment", a: "]t", cat: "todo", hint: "] = next",
    ex: { before: '│ code here\n// TODO: fix this', after: '// TODO: │fix this', desc: "Jump to next TODO comment in file" } },
  { q: "Previous TODO comment", a: "[t", cat: "todo",
    ex: { before: '// TODO: fix this\n│ code here', after: '// TODO: │fix this', desc: "Jump to previous TODO comment in file" } },
  { q: "Toggle line comment", a: "gcc", cat: "todo", hint: "gc = go comment",
    ex: { before: '│const x = 1;', after: '│// const x = 1;', desc: "Comments/uncomments the current line" } },
  { q: "Comment visual selection", a: "gc", cat: "todo",
    ex: { before: '[const x = 1;\nconst y = 2;]  ← selected', after: '// const x = 1;\n// const y = 2;', desc: "Comments/uncomments all selected lines" } },
];
