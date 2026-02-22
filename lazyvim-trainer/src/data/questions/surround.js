export default [
  { q: "Add surround", a: "gsa", cat: "surround", hint: "gs = go surround",
    ex: { before: 'hello │world     gsa iw "', after: 'hello "world"', desc: "Wraps text object with chosen surround char" } },
  { q: "Delete surround", a: "gsd", cat: "surround",
    ex: { before: '"hel│lo"         gsd "', after: 'hello', desc: "Removes the surrounding characters" } },
  { q: "Replace surround", a: "gsr", cat: "surround",
    ex: { before: '"hel│lo"         gsr " \'', after: "'hello'", desc: "Swaps one surround pair for another" } },
];
