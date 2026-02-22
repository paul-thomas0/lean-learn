import { ac, ok, no, t1, t2, t3, mono, page, container, sf, divider } from "../constants/theme";
import CodeBlock from "./CodeBlock";

export default function ResultsScreen({ history, score, best, onRetry, onMenu }) {
  const correct = history.filter(h => h.ok).length;
  const pct = Math.round((correct / history.length) * 100);
  const missed = history.filter(h => !h.ok);
  const grade = pct >= 90 ? "S" : pct >= 75 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";
  const gc = pct >= 75 ? ok : pct >= 50 ? "#facc15" : no;
  return (
    <div style={page}>
      <div style={{ ...container, maxWidth: 540 }}>
        {/* Hero score */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            fontSize: 72, fontWeight: 900, color: gc, marginBottom: 4,
            textShadow: `0 0 40px ${gc}30`, letterSpacing: -2,
          }}>{grade}</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: ac, letterSpacing: -1 }}>⭐ {score}</div>
          <p style={{ color: t2, marginTop: 10, fontSize: 14 }}>{pct}% correct · Best streak: 🔥 {best}</p>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 28 }}>
          {[{ l: "Correct", v: correct, c: ok }, { l: "Wrong", v: missed.length, c: no }, { l: "Total", v: history.length, c: ac }].map(s => (
            <div key={s.l} style={{
              background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "18px 16px",
              textAlign: "center", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: s.c, letterSpacing: -1 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: t3, marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Review missed */}
        {missed.length > 0 && (
          <>
            <hr style={divider} />
            <div style={{ fontSize: 11, color: t3, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 16 }}>Review Missed</div>
            {missed.map((m, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)", borderRadius: 14, padding: 18,
                marginBottom: 12, borderLeft: `3px solid ${no}`,
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeftWidth: 3, borderLeftColor: no,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8, lineHeight: 1.4 }}>{m.q}</div>
                <div style={{ fontSize: 13, display: "flex", gap: 20, marginBottom: 6 }}>
                  <span style={{ color: ok }}>✅ <code style={{ fontFamily: mono, fontWeight: 700 }}>{m.a}</code></span>
                  <span style={{ color: no }}>❌ <code style={{ fontFamily: mono, fontWeight: 700 }}>{m.pick}</code></span>
                </div>
                {m.hint && <div style={{ fontSize: 12, color: "#facc15", marginBottom: 6, opacity: 0.85 }}>💡 {m.hint}</div>}
                {m.ex && <CodeBlock ex={m.ex} />}
              </div>
            ))}
          </>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, marginTop: 28, marginBottom: 32 }}>
          <button onClick={onRetry} style={{
            flex: 1, padding: 16, borderRadius: 12, border: "none",
            background: `linear-gradient(135deg, ${ac}, #a78bfa)`,
            color: "#0a0e1a", fontSize: 15, fontWeight: 800, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(34,211,238,0.2)",
            letterSpacing: 0.3,
          }}>Retry</button>
          <button onClick={onMenu} style={{
            flex: 1, padding: 16, borderRadius: 12,
            border: "1px solid rgba(34,211,238,0.3)",
            background: "rgba(34,211,238,0.06)",
            color: ac, fontSize: 15, fontWeight: 800, cursor: "pointer",
            letterSpacing: 0.3,
          }}>Menu</button>
        </div>
      </div>
    </div>
  );
}
