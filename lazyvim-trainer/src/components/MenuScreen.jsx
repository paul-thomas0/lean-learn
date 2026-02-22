import { useState } from "react";
import { bg, sf, sf2, ac, t1, t2, t3, btn, sans, page, container } from "../constants/theme";

const tabStyle = (active) => ({
  flex: 1, padding: "11px 0", borderRadius: 10,
  border: "none",
  background: active ? "rgba(34,211,238,0.12)" : "transparent",
  color: active ? ac : t3, cursor: "pointer",
  fontSize: 13, fontWeight: 700, letterSpacing: 0.3,
  transition: "all 0.25s ease",
  position: "relative",
});

export default function MenuScreen({ categories, allQuestions, cats, setCats, gameMode, setGameMode, onStart, onLearn, onCheatSheet }) {
  const [tab, setTab] = useState("practice");
  const ck = Object.keys(categories);
  return (
    <div style={page}>
      <div style={container}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 52, marginBottom: 12, filter: "drop-shadow(0 4px 24px rgba(34,211,238,0.2))" }}>⌨️</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, background: "linear-gradient(135deg, #22d3ee, #a78bfa, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0, letterSpacing: -0.5 }}>LazyVim Trainer</h1>
          <p style={{ color: t2, marginTop: 10, fontSize: 15, fontWeight: 400, lineHeight: 1.5 }}>Master keybindings through play</p>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 4, marginBottom: 32, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 4, border: "1px solid rgba(255,255,255,0.05)" }}>
          <button onClick={() => setTab("practice")} style={tabStyle(tab === "practice")}>Practice</button>
          <button onClick={() => setTab("learn")} style={tabStyle(tab === "learn")}>Learn</button>
          <button onClick={() => onCheatSheet()} style={tabStyle(false)}>Cheat Sheet</button>
        </div>

        {/* Practice tab */}
        {tab === "practice" && (
          <>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
              {["practice", "blitz"].map(m => <button key={m} onClick={() => setGameMode(m)} style={btn(gameMode === m)}>{m === "practice" ? "🎯 Practice" : "⚡ Blitz (10s)"}</button>)}
            </div>
            <div style={{ fontSize: 11, color: t3, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 14 }}>Select Categories</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {ck.map(k => {
                const c = categories[k], a = cats.has(k), n = allQuestions.filter(q => q.cat === k).length;
                return (<button key={k} onClick={() => { const s = new Set(cats); a ? s.delete(k) : s.add(k); setCats(s); }}
                  style={{
                    padding: "16px 14px", borderRadius: 14,
                    border: a ? `2px solid ${c.color}` : "2px solid rgba(255,255,255,0.06)",
                    background: a ? `${c.color}12` : "rgba(255,255,255,0.02)",
                    color: a ? c.color : t2, cursor: "pointer", textAlign: "left",
                    transition: "all 0.25s ease",
                    boxShadow: a ? `0 0 20px ${c.color}15` : "none",
                  }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6, color: a ? c.color : t1 }}>{c.name}</div>
                  <div style={{ fontSize: 11, marginTop: 3, color: a ? `${c.color}aa` : t3 }}>{n} keys</div>
                </button>);
              })}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 8 }}>
              <button onClick={() => setCats(new Set(ck))} style={{ ...btn(false), fontSize: 12 }}>Select All</button>
              <button onClick={() => setCats(new Set())} style={{ ...btn(false), fontSize: 12 }}>Clear</button>
            </div>
            <button onClick={() => cats.size > 0 && onStart(cats)} disabled={cats.size === 0}
              style={{
                width: "100%", padding: 18, borderRadius: 14, border: "none",
                background: cats.size > 0 ? "linear-gradient(135deg, #22d3ee, #a78bfa)" : "#1e293b",
                color: cats.size > 0 ? "#0a0e1a" : t3,
                fontSize: 16, fontWeight: 800, cursor: cats.size > 0 ? "pointer" : "not-allowed",
                marginTop: 24, transition: "all 0.3s ease",
                boxShadow: cats.size > 0 ? "0 4px 24px rgba(34,211,238,0.25)" : "none",
                letterSpacing: 0.3,
              }}>
              {cats.size > 0 ? `Start  ·  ${allQuestions.filter(q => cats.has(q.cat)).length} questions` : "Pick at least one category"}
            </button>
          </>
        )}

        {/* Learn tab */}
        {tab === "learn" && (
          <>
            <div style={{ fontSize: 11, color: t3, textTransform: "uppercase", letterSpacing: 1.5, fontWeight: 700, marginBottom: 14 }}>Choose a Topic</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {ck.map(k => {
                const c = categories[k], n = allQuestions.filter(q => q.cat === k).length;
                return (<button key={k} onClick={() => onLearn(k)}
                  style={{
                    padding: "16px 14px", borderRadius: 14,
                    border: "2px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)",
                    color: t2, cursor: "pointer", textAlign: "left",
                    transition: "all 0.25s ease",
                  }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 6, color: t1 }}>{c.name}</div>
                  <div style={{ fontSize: 11, marginTop: 3, color: t3 }}>{n} keys</div>
                </button>);
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
