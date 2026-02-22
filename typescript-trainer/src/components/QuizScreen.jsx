import { ac, ok, no, t1, t2, mono, page, container } from "../constants/theme";
import CodeBlock from "./CodeBlock";
import CATEGORIES from "../data/categories";

export default function QuizScreen({ question, qi, total, score, streak, gameMode, timeLeft, hint, done, showEx, sel, onAnswer, onHint, onNext }) {
  const cat = CATEGORIES[question.cat];
  const prog = ((qi + 1) / total) * 100;
  return (
    <div style={page}>
      <div style={{ ...container, maxWidth: 540 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: t2, fontWeight: 600 }}>{qi + 1} / {total}</span>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {streak >= 3 && <span style={{ fontSize: 13, color: "#facc15", fontWeight: 700 }}>🔥 {streak}</span>}
            <span style={{ fontSize: 15, fontWeight: 800, color: ac }}>⭐ {score}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, marginBottom: 28, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${prog}%`, background: `linear-gradient(90deg, ${ac}, #a78bfa)`, borderRadius: 4, transition: "width 0.4s ease" }} />
        </div>

        {/* Timer */}
        {gameMode === "blitz" && (
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <span style={{ fontSize: 36, fontWeight: 900, color: timeLeft <= 3 ? no : ac, fontVariantNumeric: "tabular-nums", letterSpacing: -1 }}>{timeLeft}</span>
          </div>
        )}

        {/* Category badge */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <span style={{
            fontSize: 11, padding: "5px 14px", borderRadius: 20,
            background: `${cat.color}12`, border: `1px solid ${cat.color}25`,
            color: cat.color, fontWeight: 700, letterSpacing: 0.3,
          }}>{cat.icon} {cat.name}</span>
        </div>

        {/* Question card */}
        <div style={{
          background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: "36px 28px",
          textAlign: "center", marginBottom: 24,
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <p style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.4, letterSpacing: -0.3 }}>{question.q}</p>
          {hint && question.hint && <p style={{ color: "#facc15", fontSize: 13, marginTop: 14, marginBottom: 0, opacity: 0.9 }}>💡 {question.hint}</p>}
        </div>

        {/* Hint button */}
        {!hint && question.hint && !done && (
          <button onClick={onHint} style={{
            display: "block", margin: "0 auto 20px", background: "none",
            border: "none", color: t2, fontSize: 13, cursor: "pointer",
            transition: "color 0.2s",
          }}>💡 Show hint (-5 pts)</button>
        )}

        {/* Answer options */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {question.opts.map((o, i) => {
            let bg = "rgba(255,255,255,0.03)", br = "rgba(255,255,255,0.08)", tc = t1;
            if (done) {
              if (o === question.a) { bg = "rgba(74,222,128,0.1)"; br = ok; tc = ok; }
              else if (o === sel) { bg = "rgba(248,113,113,0.1)"; br = no; tc = no; }
            }
            return (
              <button key={i} onClick={() => onAnswer(o)} style={{
                padding: "18px 14px", borderRadius: 14, border: `2px solid ${br}`,
                background: bg, color: tc, fontSize: 14, fontWeight: 700,
                fontFamily: mono, cursor: done ? "default" : "pointer",
                transition: "all 0.2s ease", minHeight: 58,
                wordBreak: "break-word", lineHeight: 1.3,
              }}>{o}</button>
            );
          })}
        </div>

        {/* After answering */}
        {done && (
          <div>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 14, color: sel === question.a ? ok : no, fontWeight: 700, marginBottom: 8 }}>
                {sel === question.a ? (streak >= 3 ? "🔥 On fire! +bonus" : "✅ Correct!") : <span>❌ It&apos;s <code style={{ fontFamily: mono }}>{question.a}</code></span>}
              </p>
            </div>
            {showEx && question.ex && <CodeBlock ex={question.ex} />}
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button onClick={onNext} style={{
                padding: "14px 52px", borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${ac}, #a78bfa)`,
                color: "#0a0e1a", fontSize: 15, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(59,130,246,0.2)",
                letterSpacing: 0.3, transition: "all 0.2s ease",
              }}>
                {qi + 1 >= total ? "See Results" : "Next →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
