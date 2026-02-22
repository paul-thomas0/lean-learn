import { ac, ok, t1, t2, mono } from "../constants/theme";

export default function CodeBlock({ ex }) {
  if (!ex) return null;
  const ln = (s) => s ? s.split('\n') : null;
  return (
    <div style={{ marginTop: 14, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
      <div style={{ padding: "6px 14px", background: "linear-gradient(135deg, #0f172a, #131c2e)", fontSize: 10, color: t2, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", letterSpacing: 1.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: ac, opacity: 0.6 }} />
        Example
      </div>
      <div style={{ display: "flex", gap: 0, fontSize: 12, fontFamily: mono }}>
        {ex.before && (
          <div style={{ flex: 1, padding: "14px 16px", background: "#0c1222", borderRight: ex.after ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <div style={{ fontSize: 9, color: t2, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, fontWeight: 600, opacity: 0.7 }}>Before</div>
            {ln(ex.before).map((l, i) => (
              <div key={i} style={{ color: t1, whiteSpace: "pre", lineHeight: 1.7 }}>{l}</div>
            ))}
          </div>
        )}
        {ex.after && (
          <div style={{ flex: 1, padding: "14px 16px", background: "#0c1222" }}>
            <div style={{ fontSize: 9, color: ok, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, fontWeight: 600, opacity: 0.7 }}>After</div>
            {ln(ex.after).map((l, i) => (
              <div key={i} style={{ color: t1, whiteSpace: "pre", lineHeight: 1.7 }}>{l}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ padding: "10px 14px", background: "#0c1222", borderTop: "1px solid rgba(255,255,255,0.04)", fontSize: 12, color: t2, lineHeight: 1.5 }}>
        {ex.desc}
      </div>
    </div>
  );
}
