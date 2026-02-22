import { useState } from "react";
import CATEGORIES from "../data/categories";
import ALL_QUESTIONS from "../data/questions/index";
import { FUNDAMENTALS, CATEGORY_THEORY } from "../data/theory";
import CodeBlock from "./CodeBlock";
import { t1, t2, t3, page, container, kbd, backBtn, sectionLabel, divider } from "../constants/theme";

export default function LearnScreen({ catKey, onBack, onQuiz }) {
  const [showFundamentals, setShowFundamentals] = useState(false);
  const cat = CATEGORIES[catKey];
  const theory = CATEGORY_THEORY[catKey];
  const questions = ALL_QUESTIONS.filter(q => q.cat === catKey);
  const fundamentals = Object.values(FUNDAMENTALS);

  return (
    <div style={page}>
      <div style={container}>
        <button onClick={onBack} style={backBtn}>← Back to menu</button>

        {/* Category hero */}
        <div style={{
          background: `linear-gradient(135deg, ${cat.color}08, ${cat.color}15, ${cat.color}05)`,
          border: `1px solid ${cat.color}20`,
          borderRadius: 20, padding: "28px 24px", marginBottom: 28,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 40, filter: `drop-shadow(0 2px 12px ${cat.color}40)` }}>{cat.icon}</span>
            <div>
              <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, color: cat.color, letterSpacing: -0.3 }}>{cat.name}</h1>
              <p style={{ color: t2, fontSize: 13, margin: "4px 0 0" }}>{questions.length} types to learn</p>
            </div>
          </div>
          {theory && <p style={{ color: t2, fontSize: 14, lineHeight: 1.7, margin: "16px 0 0" }}>{theory.intro}</p>}
        </div>

        {/* Fundamentals accordion */}
        <button
          onClick={() => setShowFundamentals(!showFundamentals)}
          style={{
            width: "100%", padding: "14px 18px", borderRadius: showFundamentals ? "14px 14px 0 0" : 14,
            border: "1px solid rgba(167,139,250,0.2)",
            background: "linear-gradient(135deg, rgba(167,139,250,0.06), rgba(59,130,246,0.04))",
            color: t1, cursor: "pointer", textAlign: "left", fontSize: 14, fontWeight: 700,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: showFundamentals ? 0 : 32,
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>📖</span>
            TypeScript Fundamentals
            <span style={{ fontSize: 10, color: t3, fontWeight: 500 }}>for beginners</span>
          </span>
          <span style={{ color: t3, fontSize: 11, transition: "transform 0.2s", transform: showFundamentals ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        {showFundamentals && (
          <div style={{
            border: "1px solid rgba(167,139,250,0.2)", borderTop: "none",
            borderRadius: "0 0 14px 14px",
            background: "rgba(167,139,250,0.03)", padding: "20px 20px 16px",
            marginBottom: 32,
          }}>
            {fundamentals.map((f, i) => (
              <div key={i} style={{
                marginBottom: i < fundamentals.length - 1 ? 20 : 0,
                paddingBottom: i < fundamentals.length - 1 ? 20 : 0,
                borderBottom: i < fundamentals.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <h4 style={{ fontSize: 14, fontWeight: 800, color: "#a78bfa", margin: "0 0 8px", letterSpacing: -0.2 }}>{f.heading}</h4>
                <p style={{ fontSize: 13, color: t2, lineHeight: 1.7, margin: 0 }}>{f.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Theory concepts */}
        {theory && (
          <>
            <div style={sectionLabel}>Key Concepts</div>
            {theory.concepts.map((c, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16, padding: "20px 20px 20px 20px",
                marginBottom: 12, display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <div style={{
                  minWidth: 32, height: 32, borderRadius: 10,
                  background: `${cat.color}15`, color: cat.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800, flexShrink: 0, marginTop: 1,
                }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: t1, margin: "0 0 8px", letterSpacing: -0.2 }}>{c.heading}</h3>
                  <p style={{ fontSize: 13, color: t2, lineHeight: 1.7, margin: 0 }}>{c.content}</p>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Divider between theory and reference */}
        <hr style={divider} />

        {/* Type reference */}
        <div style={sectionLabel}>Type Reference</div>

        {questions.map((q, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 16, padding: 20, marginBottom: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: q.hint || q.ex ? 10 : 0 }}>
              <code style={kbd}>{q.a}</code>
              <span style={{ fontSize: 14, color: t1, fontWeight: 600, lineHeight: 1.4 }}>{q.q}</span>
            </div>

            {q.hint && (
              <p style={{ fontSize: 12, color: "#facc15", margin: "0 0 6px", paddingLeft: 2, opacity: 0.85 }}>
                💡 {q.hint}
              </p>
            )}

            <CodeBlock ex={q.ex} />
          </div>
        ))}

        {/* Test Yourself CTA */}
        <div style={{
          background: `linear-gradient(135deg, ${cat.color}10, ${cat.color}18)`,
          border: `1px solid ${cat.color}25`,
          borderRadius: 20, padding: "28px 24px", textAlign: "center",
          marginTop: 32, marginBottom: 40,
        }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🧪</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: t1, marginBottom: 6 }}>Ready to test yourself?</div>
          <div style={{ fontSize: 13, color: t2, marginBottom: 20 }}>Put your {cat.name.toLowerCase()} knowledge to the test</div>
          <button
            onClick={() => onQuiz(catKey)}
            style={{
              padding: "14px 40px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`,
              color: "#0a0e1a", fontSize: 15, fontWeight: 800, cursor: "pointer",
              boxShadow: `0 4px 20px ${cat.color}30`,
              letterSpacing: 0.3, transition: "all 0.2s ease",
            }}
          >
            Start Quiz — {questions.length} Questions
          </button>
        </div>
      </div>
    </div>
  );
}
