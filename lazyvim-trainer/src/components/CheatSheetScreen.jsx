import { useState } from "react";
import CATEGORIES from "../data/categories";
import ALL_QUESTIONS from "../data/questions/index";
import { sf, sf2, ac, t1, t2, t3, mono, page, container, kbd, backBtn } from "../constants/theme";

export default function CheatSheetScreen({ onBack }) {
  const [filter, setFilter] = useState("");
  const lower = filter.toLowerCase();

  const grouped = Object.keys(CATEGORIES).map(catKey => {
    const cat = CATEGORIES[catKey];
    const qs = ALL_QUESTIONS.filter(q => q.cat === catKey);
    const matched = lower
      ? qs.filter(q => q.a.toLowerCase().includes(lower) || q.q.toLowerCase().includes(lower))
      : qs;
    return { catKey, cat, matched };
  }).filter(g => g.matched.length > 0);

  const totalShown = grouped.reduce((s, g) => s + g.matched.length, 0);

  return (
    <div style={page}>
      <div style={container}>
        <button onClick={onBack} style={backBtn}>← Back to menu</button>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 6px", letterSpacing: -0.5 }}>
            <span style={{ marginRight: 10 }}>📋</span>Cheat Sheet
          </h1>
          <p style={{ color: t2, fontSize: 14, margin: 0, lineHeight: 1.5 }}>
            {filter ? `${totalShown} matching keybinding${totalShown !== 1 ? "s" : ""}` : `All ${ALL_QUESTIONS.length} keybindings at a glance`}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: t3, fontSize: 15, pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Search keybinding or description..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              width: "100%", padding: "13px 16px 13px 40px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)", color: t1, fontSize: 14,
              outline: "none", boxSizing: "border-box",
              transition: "border-color 0.2s",
              fontFamily: "inherit",
            }}
          />
        </div>

        {grouped.map(({ catKey, cat, matched }) => (
          <div key={catKey} style={{ marginBottom: 28 }}>
            {/* Category header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: `linear-gradient(135deg, ${cat.color}10, ${cat.color}06)`,
              border: `1px solid ${cat.color}20`,
              borderRadius: 12, marginBottom: 6,
            }}>
              <span style={{ fontSize: 18 }}>{cat.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: cat.color, letterSpacing: -0.2 }}>{cat.name}</span>
              <span style={{ fontSize: 11, color: t3, marginLeft: "auto", fontWeight: 600 }}>{matched.length}</span>
            </div>

            {/* Rows */}
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
              {matched.map((q, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "10px 14px",
                  background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                  borderBottom: i < matched.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}>
                  <code style={{
                    ...kbd, minWidth: 56, textAlign: "center", fontSize: 12,
                  }}>{q.a}</code>
                  <span style={{ fontSize: 13, color: t2, lineHeight: 1.4 }}>{q.q}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {grouped.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px", color: t3 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: t2, marginBottom: 4 }}>No matches</div>
            <div style={{ fontSize: 13 }}>Try a different search term</div>
          </div>
        )}
      </div>
    </div>
  );
}
