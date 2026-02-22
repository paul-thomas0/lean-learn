import { useState } from "react";
import CATEGORIES from "../data/categories";
import ALL_QUESTIONS from "../data/questions/index";
import { CATEGORY_THEORY } from "../data/theory";
import { t1, t2, t3, mono, page, container, kbd, backBtn } from "../constants/theme";

export default function CheatSheetScreen({ onBack }) {
  const [filter, setFilter] = useState("");
  const [collapsed, setCollapsed] = useState(new Set());
  const lower = filter.toLowerCase();

  const toggle = (k) => {
    const s = new Set(collapsed);
    s.has(k) ? s.delete(k) : s.add(k);
    setCollapsed(s);
  };

  const grouped = Object.keys(CATEGORIES).map(catKey => {
    const cat = CATEGORIES[catKey];
    const qs = ALL_QUESTIONS.filter(q => q.cat === catKey);
    const matched = lower
      ? qs.filter(q =>
          q.a.toLowerCase().includes(lower) ||
          q.q.toLowerCase().includes(lower) ||
          (q.hint && q.hint.toLowerCase().includes(lower))
        )
      : qs;
    const theory = CATEGORY_THEORY[catKey];
    return { catKey, cat, matched, theory };
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
            {filter ? `${totalShown} matching type${totalShown !== 1 ? "s" : ""}` : `All ${ALL_QUESTIONS.length} types — with examples`}
          </p>
        </div>

        {/* Search */}
        <div style={{ position: "relative", marginBottom: 28 }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: t3, fontSize: 15, pointerEvents: "none" }}>🔍</span>
          <input
            type="text"
            placeholder="Search type, description, or hint..."
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

        {grouped.map(({ catKey, cat, matched, theory }) => {
          const isCollapsed = collapsed.has(catKey);
          return (
            <div key={catKey} style={{ marginBottom: 32 }}>
              {/* Category header — clickable to collapse */}
              <button
                onClick={() => toggle(catKey)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 14px", cursor: "pointer",
                  background: `linear-gradient(135deg, ${cat.color}10, ${cat.color}06)`,
                  border: `1px solid ${cat.color}20`,
                  borderRadius: isCollapsed ? 12 : "12px 12px 0 0",
                  transition: "all 0.2s ease",
                }}
              >
                <span style={{ fontSize: 20 }}>{cat.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 800, color: cat.color, letterSpacing: -0.2 }}>{cat.name}</span>
                <span style={{ fontSize: 11, color: t3, marginLeft: "auto", fontWeight: 600 }}>{matched.length}</span>
                <span style={{
                  color: t3, fontSize: 11, transition: "transform 0.2s",
                  transform: isCollapsed ? "rotate(-90deg)" : "rotate(0deg)",
                }}>▼</span>
              </button>

              {!isCollapsed && (
                <div style={{
                  border: "1px solid rgba(255,255,255,0.05)", borderTop: "none",
                  borderRadius: "0 0 12px 12px", overflow: "hidden",
                }}>
                  {/* Category intro */}
                  {theory && !filter && (
                    <div style={{
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.015)",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <p style={{ fontSize: 12, color: t2, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>{theory.intro}</p>
                    </div>
                  )}

                  {/* Type cards */}
                  {matched.map((q, i) => (
                    <div key={i} style={{
                      padding: "16px 16px",
                      background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                      borderBottom: i < matched.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}>
                      {/* Type name + description row */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: (q.hint || q.ex) ? 8 : 0 }}>
                        <code style={{
                          ...kbd, minWidth: 80, textAlign: "center", fontSize: 12, flexShrink: 0, marginTop: 1,
                        }}>{q.a}</code>
                        <span style={{ fontSize: 13, color: t1, lineHeight: 1.5, fontWeight: 600 }}>{q.q}</span>
                      </div>

                      {/* Hint */}
                      {q.hint && (
                        <div style={{ paddingLeft: 92, marginBottom: q.ex ? 4 : 0 }}>
                          <span style={{ fontSize: 11, color: "#facc15", opacity: 0.85 }}>💡 {q.hint}</span>
                        </div>
                      )}

                      {/* Code example inline */}
                      {q.ex && (
                        <div style={{ paddingLeft: 0, marginTop: 8 }}>
                          <div style={{
                            borderRadius: 10, overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.06)",
                            fontSize: 11, fontFamily: mono,
                          }}>
                            <div style={{ display: "flex" }}>
                              {q.ex.before && (
                                <div style={{
                                  flex: 1, padding: "10px 12px", background: "#0c1222",
                                  borderRight: q.ex.after ? "1px solid rgba(255,255,255,0.04)" : "none",
                                }}>
                                  <div style={{ fontSize: 8, color: t3, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>Before</div>
                                  {q.ex.before.split("\n").map((l, j) => (
                                    <div key={j} style={{ color: t1, whiteSpace: "pre", lineHeight: 1.6 }}>{l}</div>
                                  ))}
                                </div>
                              )}
                              {q.ex.after && (
                                <div style={{ flex: 1, padding: "10px 12px", background: "#0c1222" }}>
                                  <div style={{ fontSize: 8, color: "#4ade80", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, fontWeight: 600 }}>After</div>
                                  {q.ex.after.split("\n").map((l, j) => (
                                    <div key={j} style={{ color: t1, whiteSpace: "pre", lineHeight: 1.6 }}>{l}</div>
                                  ))}
                                </div>
                              )}
                            </div>
                            {q.ex.desc && (
                              <div style={{
                                padding: "6px 12px", background: "#0c1222",
                                borderTop: "1px solid rgba(255,255,255,0.04)",
                                fontSize: 11, color: t2, lineHeight: 1.4,
                              }}>{q.ex.desc}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

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
