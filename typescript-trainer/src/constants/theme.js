export const bg = "#0a0e1a";
export const sf = "#111827";
export const sf2 = "#1e293b";
export const ac = "#3b82f6";
export const ok = "#4ade80";
export const no = "#f87171";
export const t1 = "#e2e8f0";
export const t2 = "#94a3b8";
export const t3 = "#64748b";

export const mono = "'JetBrains Mono','Fira Code','Cascadia Code',monospace";
export const sans = "'Inter','SF Pro Display',system-ui,-apple-system,sans-serif";

export const btn = (a) => ({
  padding: "10px 20px",
  borderRadius: 10,
  border: a ? `2px solid ${ac}` : "2px solid #334155",
  background: a ? "rgba(59,130,246,0.15)" : sf2,
  color: a ? ac : t1,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 600,
  transition: "all 0.2s",
});

export const card = {
  background: sf,
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 20,
};

export const page = {
  background: bg,
  minHeight: "100vh",
  color: t1,
  fontFamily: sans,
  padding: "32px 20px",
};

export const container = {
  maxWidth: 620,
  margin: "0 auto",
};

export const kbd = {
  background: "rgba(59,130,246,0.1)",
  border: "1px solid rgba(59,130,246,0.25)",
  padding: "3px 10px",
  borderRadius: 6,
  fontSize: 13,
  fontFamily: mono,
  fontWeight: 700,
  color: ac,
  whiteSpace: "nowrap",
  display: "inline-block",
};

export const backBtn = {
  background: "none",
  border: "none",
  color: t2,
  cursor: "pointer",
  fontSize: 14,
  padding: "4px 0",
  marginBottom: 24,
  transition: "color 0.2s",
};

export const sectionLabel = {
  color: t3,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: 1.5,
  fontWeight: 700,
  marginBottom: 16,
};

export const divider = {
  height: 1,
  background: "linear-gradient(90deg, transparent, #1e293b, transparent)",
  border: "none",
  margin: "32px 0",
};
