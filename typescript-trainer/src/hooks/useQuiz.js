import { useState, useEffect, useRef } from "react";
import ALL_QUESTIONS from "../data/questions/index";
import { shuffle, genOpts } from "../utils/quiz";

const M = { menu: 0, quiz: 1, results: 2, learn: 3, cheatsheet: 4, references: 5 };

export default function useQuiz() {
  const [mode, setMode] = useState(M.menu);
  const [cats, setCats] = useState(new Set());
  const [qs, setQs] = useState([]);
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [sel, setSel] = useState(null);
  const [hint, setHint] = useState(false);
  const [done, setDone] = useState(false);
  const [hist, setHist] = useState([]);
  const [tl, setTl] = useState(0);
  const [ta, setTa] = useState(false);
  const [gm, setGm] = useState("practice");
  const [showEx, setShowEx] = useState(false);
  const [learnCat, setLearnCat] = useState(null);
  const tr = useRef(null);

  const all = ALL_QUESTIONS.map(q => q.a);
  const cur = qs[qi];

  useEffect(() => {
    if (!ta || mode !== M.quiz) return;
    if (tl > 0) {
      tr.current = setTimeout(() => setTl(t => t - 1), 1000);
    } else if (tl === 0 && !done) {
      tr.current = setTimeout(() => {
        setDone(true);
        setTa(false);
        setStreak(0);
        setHist(h => [...h, { ...qs[qi], ok: false, pick: "⏰ Time's up" }]);
      }, 0);
    }
    return () => clearTimeout(tr.current);
  }, [ta, tl, mode, done, qs, qi]);

  const start = (c) => {
    const pool = ALL_QUESTIONS.filter(q => c.has(q.cat));
    const s = shuffle(pool).slice(0, Math.min(pool.length, gm === "blitz" ? 15 : 20));
    setQs(s.map(q => ({ ...q, opts: genOpts(q.a, all) })));
    setQi(0); setScore(0); setStreak(0); setBest(0); setSel(null); setHint(false); setDone(false); setHist([]); setShowEx(false);
    setMode(M.quiz);
    if (gm === "blitz") { setTl(10); setTa(true); }
  };

  const answer = (o) => {
    if (done) return;
    setSel(o); setDone(true); setTa(false); setShowEx(true);
    const c = o === cur.a;
    if (c) {
      const pts = hint ? 5 : gm === "blitz" ? 15 : 10;
      setScore(s => s + pts + (streak >= 3 ? 5 : 0));
      setStreak(s => { const n = s + 1; setBest(b => Math.max(b, n)); return n; });
    } else {
      setStreak(0);
    }
    setHist(h => [...h, { ...cur, ok: c, pick: o }]);
  };

  const next = () => {
    if (qi + 1 >= qs.length) { setMode(M.results); }
    else { setQi(qi + 1); setSel(null); setHint(false); setDone(false); setShowEx(false); if (gm === "blitz") { setTl(10); setTa(true); } }
  };

  return {
    mode,
    cats, setCats,
    gameMode: gm, setGameMode: setGm,
    question: cur,
    qi, total: qs.length,
    score, streak, best,
    sel, hint, done, showEx,
    timeLeft: tl,
    history: hist,
    start,
    answer,
    next,
    showHint: () => setHint(true),
    goToMenu: () => setMode(M.menu),
    learnCat,
    goToLearn: (catKey) => { setLearnCat(catKey); setMode(M.learn); },
    goToCheatSheet: () => setMode(M.cheatsheet),
    goToReferences: () => setMode(M.references),
  };
}
