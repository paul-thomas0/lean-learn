import { sf, ac, t1, t2, t3, page, container, backBtn } from "../constants/theme";

const REFERENCES = [
  {
    category: "Official Documentation",
    icon: "📖",
    color: "#22d3ee",
    links: [
      { title: "LazyVim Documentation", url: "https://www.lazyvim.org/", desc: "Official LazyVim documentation — configuration, plugins, keymaps, and extras" },
      { title: "Neovim Documentation", url: "https://neovim.io/doc/", desc: "Official Neovim reference manual and user guide" },
      { title: "Vim Help Pages", url: "https://vimhelp.org/", desc: "Comprehensive Vim help documentation — motions, operators, text objects" },
      { title: "lazy.nvim Plugin Manager", url: "https://lazy.folke.io/", desc: "Documentation for lazy.nvim, the plugin manager powering LazyVim" },
    ],
  },
  {
    category: "Movement & Navigation",
    icon: "🧭",
    color: "#4ade80",
    links: [
      { title: "Vim Motions — Practical Vim by Drew Neil", url: "https://pragprog.com/titles/dnvim2/practical-vim-second-edition/", desc: "The definitive book on Vim editing — motions, text objects, and the Vim way of thinking" },
      { title: "ThePrimeagen's Vim Motions Guide", url: "https://www.youtube.com/watch?v=X6AR2RMB5tE", desc: "Popular video walkthrough of Vim motions and efficient navigation by ThePrimeagen" },
      { title: "Vim Adventures", url: "https://vim-adventures.com/", desc: "Learn Vim navigation through an interactive game" },
    ],
  },
  {
    category: "Git Integration",
    icon: "🌿",
    color: "#fb923c",
    links: [
      { title: "LazyVim Git Extras", url: "https://www.lazyvim.org/extras/editor/git", desc: "LazyVim's built-in Git integration keymaps and configuration" },
      { title: "Gitsigns.nvim", url: "https://github.com/lewis6991/gitsigns.nvim", desc: "Git decorations and hunk operations in the sign column" },
      { title: "Fugitive.vim by Tim Pope", url: "https://github.com/tpope/vim-fugitive", desc: "The premier Vim plugin for Git — blame, diff, merge, and more" },
    ],
  },
  {
    category: "LSP & Diagnostics",
    icon: "🧠",
    color: "#a78bfa",
    links: [
      { title: "nvim-lspconfig", url: "https://github.com/neovim/nvim-lspconfig", desc: "Quickstart configs for Neovim's built-in LSP client" },
      { title: "Trouble.nvim", url: "https://github.com/folke/trouble.nvim", desc: "Pretty diagnostics list by folke — LazyVim's default diagnostics viewer" },
      { title: "Mason.nvim", url: "https://github.com/williamboman/mason.nvim", desc: "Portable package manager for LSP servers, DAP, linters, and formatters" },
    ],
  },
  {
    category: "Editing & Text Objects",
    icon: "✏️",
    color: "#f472b6",
    links: [
      { title: "Vim Text Objects: The Definitive Guide — Jared Carroll", url: "https://blog.carbonfive.com/vim-text-objects-the-definitive-guide/", desc: "Classic guide to mastering Vim's text objects for efficient editing" },
      { title: "mini.surround", url: "https://github.com/echasnovski/mini.surround", desc: "LazyVim's default surround plugin — add, delete, replace surroundings" },
      { title: "mini.ai", url: "https://github.com/echasnovski/mini.ai", desc: "Extended text objects for arguments, brackets, and more" },
    ],
  },
  {
    category: "Search & Telescope",
    icon: "🔍",
    color: "#38bdf8",
    links: [
      { title: "Telescope.nvim", url: "https://github.com/nvim-telescope/telescope.nvim", desc: "Highly extensible fuzzy finder — LazyVim's default picker" },
      { title: "Flash.nvim", url: "https://github.com/folke/flash.nvim", desc: "Navigate code with search labels — LazyVim's enhanced search/jump plugin" },
      { title: "Which-Key.nvim", url: "https://github.com/folke/which-key.nvim", desc: "Displays available keybindings in a popup as you type" },
    ],
  },
  {
    category: "Community & Learning",
    icon: "🎓",
    color: "#fbbf24",
    links: [
      { title: "LazyVim GitHub Discussions", url: "https://github.com/LazyVim/LazyVim/discussions", desc: "Community Q&A, tips, and configuration sharing" },
      { title: "r/neovim", url: "https://www.reddit.com/r/neovim/", desc: "Active Reddit community for Neovim users — tips, plugins, and configs" },
      { title: "Vim Tips Wiki", url: "https://vim.fandom.com/wiki/Vim_Tips_Wiki", desc: "Community-maintained collection of Vim tips and tricks" },
      { title: "Vimcasts by Drew Neil", url: "http://vimcasts.org/", desc: "Free screencasts teaching Vim techniques — from basics to advanced" },
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
            Official docs, essential articles, and community resources to deepen your LazyVim knowledge
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
