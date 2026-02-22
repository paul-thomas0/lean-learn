# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a monorepo containing interactive learning apps for developer tools/concepts. Each app is an independent React SPA built with Vite.

- **`lazyvim-trainer/`** — Quiz app for learning LazyVim keybindings (16 categories: movement, git, LSP, etc.) — plain JSX/JS
- **`typescript-trainer/`** — Quiz app for learning TypeScript type system concepts (14 categories: generics, utility types, narrowing, etc.) — plain JSX/JS
- **`v8-internals/`** — Interactive learning platform for V8 engine internals, Chrome architecture, and Node.js integration — TypeScript, Tailwind CSS, Framer Motion

## Commands

All apps use identical npm scripts. Run from within each app directory:

```bash
npm run dev      # Start dev server (Vite)
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

No test runner is configured.

## Shared Architecture

Both apps follow the same architecture — they are essentially the same app with different question data.

### Navigation

Single-page app with screen-based navigation managed by a numeric `mode` state in `useQuiz` hook — no router. Modes: 0=menu, 1=quiz, 2=results, 3=learn, 4=cheatsheet.

### Key Files (same structure in each app)

- **`src/hooks/useQuiz.js`** — Central state machine. All quiz logic (scoring, streaks, timers, navigation) lives here. Components receive state/callbacks as props.
- **`src/data/categories.js`** — Category definitions keyed by short string IDs (e.g., `move`, `generics`).
- **`src/data/questions/`** — One file per category. Each question has: `q` (question text), `a` (correct answer), `cat` (category key), optional `hint`, and optional `ex` (before/after example with `│` cursor marker).
- **`src/data/theory.js`** — Educational content: `FUNDAMENTALS` and `CATEGORY_THEORY` (per-category explanations).
- **`src/utils/quiz.js`** — `shuffle()` and `genOpts()` for generating multiple-choice options from the answer pool.
- **`src/components/`** — Screen components (`MenuScreen`, `QuizScreen`, `ResultsScreen`, `LearnScreen`, `CheatSheetScreen`) plus `CodeBlock` for rendering examples.

### Adding New Questions

Add a new file in `src/data/questions/`, export an array of question objects, then import and spread it into `src/data/questions/index.js`. Add a matching category entry in `src/data/categories.js` if it's a new category.

### Game Modes

- **Practice**: 20 questions, no timer, 10 pts per correct answer
- **Blitz**: 15 questions, 10-second timer per question, 15 pts per correct answer

## v8-internals — Architecture

The `v8-internals/` app is a module-based learning platform (not a simple quiz app). It uses a different tech stack:

- **TypeScript** (`.tsx`/`.ts` files throughout)
- **Tailwind CSS** via `@tailwindcss/vite` plugin
- **Framer Motion** for animations and page transitions
- **React.lazy()** for code-split SVG diagram components

### Navigation

Screen-based navigation via `useState<NavigationTarget>` in `App.tsx`. Screens: home, section, quiz, results. No router.

### Key Files

- **`src/types/index.ts`** — All TypeScript types (Module, Section, ContentBlock discriminated union, QuizQuestion, AppProgress, NavigationTarget)
- **`src/data/modules.ts`** — Module registry (3 modules: v8-engine, chrome-integration, nodejs-integration)
- **`src/data/content/<module>/`** — Content files per section, each exporting `Section[]`
- **`src/data/content/<module>/quiz.ts`** — 10 quiz questions per module
- **`src/context/ProgressContext.tsx`** — React Context + useReducer for progress tracking (localStorage-persisted)
- **`src/hooks/useQuiz.ts`** — Quiz state machine (adapted from lazyvim-trainer pattern, simplified: untimed, immediate feedback)
- **`src/hooks/useProgress.ts`** — Convenience hook for progress context
- **`src/components/content/`** — Content rendering: SectionRenderer, TextBlock, CodeBlock, InfoCard, KeyConceptCard, ComparisonBlock, DiagramBlock
- **`src/components/diagrams/`** — 11 interactive SVG diagram components (lazy-loaded)
- **`src/components/layout/`** — AppShell, Sidebar, Breadcrumb, SectionNav, MobileNav
- **`src/components/screens/`** — HomeScreen, SectionScreen, QuizScreen, ResultsScreen

### Adding Content

Add a new `.ts` file in the appropriate `src/data/content/<module>/` directory, export a `Section[]`, then import and spread into `src/data/modules.ts`. Content uses `ContentBlock` discriminated union types (text, heading, code, diagram, info, key-concept, comparison).

### Adding Diagrams

Create a new default-export React component in `src/components/diagrams/`, then register it in `src/components/content/DiagramBlock.tsx`'s lazy import map. Reference it from content via `{ type: 'diagram', diagramId: 'your-id' }`.
