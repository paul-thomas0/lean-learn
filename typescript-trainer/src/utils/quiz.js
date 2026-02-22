export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function genOpts(correct, pool) {
  const s = new Set([correct]);
  for (const o of shuffle(pool.filter(a => a !== correct))) {
    if (s.size >= 4) break;
    s.add(o);
  }
  return shuffle([...s]);
}
