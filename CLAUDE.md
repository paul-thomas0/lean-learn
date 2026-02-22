# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing **lazyvim-trainer**, an interactive quiz app for learning LazyVim keybindings. It's a React SPA built with Vite (no TypeScript, plain JSX/JS).

## Commands

All commands run from `lazyvim-trainer/`:

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

## Architecture

The app is a single-page React app with screen-based navigation managed by a numeric `mode` state (0=menu, 1=quiz, 2=results, 3=learn, 4=cheatsheet) in `useQuiz` hook — no router.

### Key Files

- **`src/hooks/useQuiz.js`** — Central state machine. All quiz logic (scoring, streaks, timers, navigation) lives here. Components receive state/callbacks as props.
- **`src/data/categories.js`** — Category definitions (16 categories like movement, git, LSP, etc.) keyed by short string IDs (e.g., `move`, `jump`, `seek`).
- **`src/data/questions/`** — One file per category. Each question has: `q` (question text), `a` (correct answer/keybinding), `cat` (category key), optional `hint`, and optional `ex` (before/after example with `│` cursor marker).
- **`src/data/theory.js`** — Educational content: `FUNDAMENTALS` (vim concepts) and `CATEGORY_THEORY` (per-category explanations).
- **`src/utils/quiz.js`** — `shuffle()` and `genOpts()` for generating multiple-choice options from the answer pool.
- **`src/components/`** — Screen components (`MenuScreen`, `QuizScreen`, `ResultsScreen`, `LearnScreen`, `CheatSheetScreen`) plus `CodeBlock` for rendering before/after examples.

### Adding New Questions

Add a new file in `src/data/questions/`, export an array of question objects, then import and spread it into `src/data/questions/index.js`. Add a matching category entry in `src/data/categories.js` if it's a new category.

### Game Modes

- **Practice**: 20 questions, no timer, 10 pts per correct answer
- **Blitz**: 15 questions, 10-second timer per question, 15 pts per correct answer
