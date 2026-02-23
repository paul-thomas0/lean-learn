import { ac, t1, t2, t3, page, container, backBtn } from "../constants/theme";

const REFERENCES = [
  {
    category: "Official Documentation",
    icon: "📖",
    color: "#3b82f6",
    links: [
      { title: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/", desc: "The official TypeScript handbook — the primary resource for learning TypeScript's type system" },
      { title: "TypeScript Playground", url: "https://www.typescriptlang.org/play", desc: "Official interactive playground — experiment with types and see compiled output in real-time" },
      { title: "TypeScript Release Notes", url: "https://devblogs.microsoft.com/typescript/", desc: "Microsoft DevBlogs — announcements for every TypeScript release with detailed examples" },
      { title: "TypeScript GitHub Repository", url: "https://github.com/microsoft/TypeScript", desc: "Source code, issue tracker, and design meeting notes for the TypeScript compiler" },
    ],
  },
  {
    category: "Generics & Utility Types",
    icon: "🧬",
    color: "#a78bfa",
    links: [
      { title: "TypeScript Deep Dive — Basarat Ali Syed", url: "https://basarat.gitbook.io/typescript/", desc: "Comprehensive free online book covering advanced generics, type inference, and patterns" },
      { title: "Utility Types Reference", url: "https://www.typescriptlang.org/docs/handbook/utility-types.html", desc: "Official reference for all built-in utility types — Partial, Required, Pick, Omit, Record, and more" },
      { title: "Understanding Generics — Matt Pocock", url: "https://www.totaltypescript.com/tutorials/beginners-typescript", desc: "Matt Pocock's Total TypeScript — widely regarded as the best modern TypeScript tutorial series" },
    ],
  },
  {
    category: "Type Narrowing & Guards",
    icon: "🔍",
    color: "#4ade80",
    links: [
      { title: "Narrowing — TypeScript Handbook", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html", desc: "Official guide to type narrowing — typeof guards, truthiness, equality, discriminated unions" },
      { title: "Type Predicates and Assertion Functions", url: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates", desc: "How to write custom type guard functions with 'is' and 'asserts' keywords" },
      { title: "Discriminated Unions — Matt Pocock", url: "https://www.totaltypescript.com/discriminated-unions-are-a-devs-best-friend", desc: "Practical guide to discriminated unions — one of TypeScript's most powerful patterns" },
    ],
  },
  {
    category: "Conditional & Mapped Types",
    icon: "🗺️",
    color: "#fb923c",
    links: [
      { title: "Conditional Types", url: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html", desc: "Official docs on conditional types — infer keyword, distribution over unions, and advanced patterns" },
      { title: "Mapped Types", url: "https://www.typescriptlang.org/docs/handbook/2/mapped-types.html", desc: "Transform existing types with mapped types — key remapping, filtering, and modifiers" },
      { title: "Template Literal Types", url: "https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html", desc: "String manipulation at the type level — Uppercase, Lowercase, and pattern matching" },
    ],
  },
  {
    category: "Advanced Patterns",
    icon: "⚡",
    color: "#f472b6",
    links: [
      { title: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", desc: "Collection of TypeScript type challenges — from easy to extreme — by Anthony Fu" },
      { title: "TypeScript Error Translator — Matt Pocock", url: "https://ts-error-translator.vercel.app/", desc: "Translates cryptic TypeScript errors into plain English" },
      { title: "Effective TypeScript — Dan Vanderkam", url: "https://effectivetypescript.com/", desc: "62 specific ways to improve your TypeScript — widely considered a must-read for intermediate developers" },
      { title: "Programming TypeScript — Boris Cherny", url: "https://www.oreilly.com/library/view/programming-typescript/9781492037644/", desc: "O'Reilly book covering the type system in depth — from basics to compiler API" },
    ],
  },
  {
    category: "Tooling & Configuration",
    icon: "🔧",
    color: "#38bdf8",
    links: [
      { title: "TSConfig Reference", url: "https://www.typescriptlang.org/tsconfig", desc: "Official interactive reference for every tsconfig.json compiler option" },
      { title: "TypeScript ESLint", url: "https://typescript-eslint.io/", desc: "Tooling for running ESLint on TypeScript code — rules, configs, and custom rule authoring" },
      { title: "ts-reset by Matt Pocock", url: "https://github.com/total-typescript/ts-reset", desc: "A CSS-reset for TypeScript — fixes common built-in type issues like .filter(Boolean)" },
    ],
  },
  {
    category: "Community & Learning",
    icon: "🎓",
    color: "#fbbf24",
    links: [
      { title: "Total TypeScript by Matt Pocock", url: "https://www.totaltypescript.com/", desc: "Premium and free TypeScript tutorials — Matt Pocock is widely regarded as the top TypeScript educator" },
      { title: "TypeScript Weekly Newsletter", url: "https://typescript-weekly.com/", desc: "Weekly curated TypeScript news, articles, and tips" },
      { title: "r/typescript", url: "https://www.reddit.com/r/typescript/", desc: "Active Reddit community for TypeScript discussion and help" },
      { title: "Stefan Baumgartner's TypeScript Blog", url: "https://fettblog.eu/", desc: "In-depth TypeScript articles by Stefan Baumgartner — author of TypeScript in 50 Lessons" },
    ],
  },
];

export default function ReferencesScreen({ onBack }) {
  return (
    <div style={page}>
      <div style={container}>
        <button onClick={onBack} style={backBtn}>← Back to menu</button>

        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 6px", letterSpacing: -0.5 }}>
            <span style={{ marginRight: 10 }}>📚</span>References
          </h1>
          <p style={{ color: t2, fontSize: 14, margin: 0, lineHeight: 1.5 }}>
            Official docs, essential books, and community resources to deepen your TypeScript knowledge
          </p>
        </div>

        {REFERENCES.map((section) => (
          <div key={section.category} style={{ marginBottom: 28 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
              background: `linear-gradient(135deg, ${section.color}10, ${section.color}06)`,
              border: `1px solid ${section.color}20`,
              borderRadius: 12, marginBottom: 6,
            }}>
              <span style={{ fontSize: 18 }}>{section.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 800, color: section.color, letterSpacing: -0.2 }}>{section.category}</span>
              <span style={{ fontSize: 11, color: t3, marginLeft: "auto", fontWeight: 600 }}>{section.links.length}</span>
            </div>

            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
              {section.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", padding: "12px 14px",
                    background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                    borderBottom: i < section.links.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    textDecoration: "none", transition: "background 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: ac, marginBottom: 3 }}>
                    {link.title}
                    <span style={{ fontSize: 11, marginLeft: 6, opacity: 0.6 }}>↗</span>
                  </div>
                  <div style={{ fontSize: 12, color: t3, lineHeight: 1.4 }}>{link.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
