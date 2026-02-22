# LazyVim Trainer

An interactive web app to learn and master LazyVim keybindings. Built with React + Vite, zero external UI dependencies.

## Features

- **Practice Mode** — Quiz yourself on 199 keybindings across 16 categories with multiple-choice questions, scoring, streaks, and before/after code examples
- **Blitz Mode** — 10-second timer per question for speed training
- **Learn Mode** — Per-category theory pages covering Vim fundamentals (modes, grammar, leader key) and category-specific concepts, plus a full keybinding reference with interactive code examples
- **Cheat Sheet** — Searchable quick-reference of all 199 keybindings grouped by category

## Categories

Movement, Big Jumps, Precision, Files & Buffers, Edit Text, Text Objects, Surround, Windows, Search & Code, Git, LSP & Code, Trouble & Quickfix, UI Toggles, Folding, Marks & Macros, Todo & Comments

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── App.jsx                      # Root — routes between screens via mode state
├── hooks/useQuiz.js             # State machine (menu/quiz/results/learn/cheatsheet)
├── constants/theme.js           # Shared design tokens and style helpers
├── data/
│   ├── categories.js            # 16 category definitions (name, icon, color)
│   ├── theory.js                # Vim fundamentals + per-category theory content
│   └── questions/               # 199 quiz questions with examples
│       ├── index.js
│       ├── movement.js
│       └── ...
├── components/
│   ├── MenuScreen.jsx           # Home screen with Practice/Learn/Cheat Sheet tabs
│   ├── QuizScreen.jsx           # Quiz gameplay
│   ├── ResultsScreen.jsx        # Score breakdown and missed question review
│   ├── LearnScreen.jsx          # Theory + keybinding reference per category
│   ├── CheatSheetScreen.jsx     # Searchable keybinding quick-reference
│   └── CodeBlock.jsx            # Before/after code example component
└── utils/quiz.js                # Shuffle + option generation helpers
```

## Tech Stack

- React 19
- Vite
- Inline styles (no CSS framework)
