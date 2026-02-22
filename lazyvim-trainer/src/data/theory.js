export const FUNDAMENTALS = {
  modes: {
    heading: "The Four Modes",
    content: "Vim has four main modes. Normal mode is where you spend most of your time — navigating and manipulating text with keybindings. Insert mode is for typing text (enter with i, a, o, etc. and leave with Esc). Visual mode lets you select text for operations (v for character, V for line, Ctrl-v for block). Command-line mode (triggered by :) lets you run commands like :w to save or :q to quit.",
  },
  grammar: {
    heading: "The Grammar of Vim",
    content: "Vim commands follow a composable grammar: Operator + Motion/TextObject = Command. For example, d (delete) + w (word) = dw (delete a word). c (change) + i\" (inner quotes) = ci\" (change inside quotes). y (yank/copy) + $ (end of line) = y$ (copy to end of line). Once you learn operators (d, c, y, >, <, =) and motions/objects separately, you can combine them freely.",
  },
  leader: {
    heading: "The Leader Key in LazyVim",
    content: "LazyVim maps Space as the leader key. Pressing Space opens a which-key popup showing available commands organized by prefix. For example, Space-f opens file commands, Space-g opens git commands, Space-b opens buffer commands. This makes hundreds of commands discoverable without memorization.",
  },
};

export const CATEGORY_THEORY = {
  move: {
    intro: "Movement is the foundation of Vim. Efficient navigation means your hands never leave the home row.",
    concepts: [
      { heading: "hjkl — The Home Row Arrows", content: "Vim uses h (left), j (down), k (up), l (right) instead of arrow keys. This keeps your fingers on the home row. It feels strange at first, but becomes second nature. Tip: j looks like a down arrow." },
      { heading: "Word vs WORD", content: "w, e, b move by words (stopping at punctuation). W, E, B move by WORDs (whitespace-delimited only). For example, in 'foo.bar', w stops at the dot but W skips the whole thing. Use w for precise edits, W for fast travel." },
      { heading: "Line Navigation", content: "0 goes to the absolute start of the line. ^ goes to the first non-blank character (more useful in code). $ goes to the end of the line. These combine with operators: d$ deletes to end of line, c^ changes from cursor to first character." },
      { heading: "Paragraph and Bracket Motions", content: "{ and } jump between paragraph boundaries (blank lines). % bounces between matching brackets — parentheses, braces, and square brackets. Both are great for navigating code structure." },
    ],
  },
  jump: {
    intro: "Jump commands let you teleport around a file instead of scrolling line by line.",
    concepts: [
      { heading: "File Jumps", content: "gg goes to the first line of the file. G goes to the last line. These are the fastest way to reach the top or bottom. You can also prefix with a count: 42gg jumps to line 42." },
      { heading: "Half-Page Scrolling", content: "Ctrl-d scrolls down half a page. Ctrl-u scrolls up half a page. These keep your context while moving quickly through a file — much better than Page Up/Down." },
      { heading: "Screen Centering", content: "After jumping, use zz to center the current line on screen, zt to move it to the top, or zb to move it to the bottom. This keeps your target visible and in a comfortable position." },
      { heading: "The Jump List", content: "Vim remembers where you've jumped. Ctrl-o goes back to the previous position. Ctrl-i goes forward. Think of it like browser back/forward buttons for your cursor." },
    ],
  },
  seek: {
    intro: "Precision motions let you jump directly to a specific character on the current line or anywhere on screen.",
    concepts: [
      { heading: "f/F Character Search", content: "f{char} jumps forward to the next occurrence of {char} on the line. F{char} jumps backward. For example, fa jumps to the next 'a'. Use ; to repeat the search forward and , to repeat backward." },
      { heading: "t/T — Till Character", content: "t{char} jumps to just before the character (till). T{char} jumps backward to just after. This is powerful with operators: dt) deletes everything up to (but not including) the closing paren." },
      { heading: "Composing with Operators", content: "Seek motions shine when combined with operators. df, deletes through the next comma. ct\" changes text up to the next quote. yt: yanks text up to the colon. These are surgical edits." },
      { heading: "Flash Jump (LazyVim)", content: "LazyVim includes the flash.nvim plugin, triggered with s. It highlights possible jump targets across the visible screen, letting you leap anywhere in 2-3 keystrokes. S does the same in Treesitter node mode." },
    ],
  },
  edit: {
    intro: "Editing commands let you insert, delete, change, and copy text efficiently without reaching for the mouse.",
    concepts: [
      { heading: "Insert Entry Points", content: "i inserts before the cursor, a inserts after. I inserts at the start of the line, A appends at the end. o opens a new line below, O opens one above. Each entry point positions you exactly where you need to type." },
      { heading: "Operator Verbs", content: "d deletes (cut), c changes (delete + enter insert mode), y yanks (copies). These combine with motions: dw (delete word), cw (change word), yy (yank line), dd (delete line). p pastes after the cursor, P pastes before." },
      { heading: "Dot Repeat", content: "The . command repeats your last change. Make an edit once (like ciw to change a word), then move to another location and press . to apply the same edit. This is one of Vim's most powerful features." },
      { heading: "Undo and Redo", content: "u undoes the last change. Ctrl-r redoes it. Vim has unlimited undo history within a session. In LazyVim, undo even persists across restarts thanks to undofile." },
    ],
  },
  objects: {
    intro: "Text objects let you operate on structured chunks of text — words, sentences, paragraphs, or anything between delimiters.",
    concepts: [
      { heading: "Visual Modes", content: "v starts character-wise visual selection. V starts line-wise selection. Ctrl-v starts block (column) selection. Once selected, apply any operator: d to delete, c to change, y to yank, > to indent." },
      { heading: "Inner vs Around", content: "i means 'inner' (contents only), a means 'around' (contents + delimiters). ci\" changes the text inside quotes. ca\" changes the text and the quotes. diw deletes the word, daw deletes the word plus surrounding space." },
      { heading: "Common Text Objects", content: "w/W = word/WORD, s = sentence, p = paragraph, b or ( = parentheses, B or { = braces, [ = brackets, \" ' ` = quotes, t = XML/HTML tag. Example: dap deletes the entire paragraph, ci( changes everything inside parens." },
      { heading: "Composing Operator + Object", content: "The real power: any operator works with any object. yiw (yank inner word), da{ (delete around braces), ci' (change inside single quotes), >ip (indent inner paragraph). Learn a few operators and a few objects, and you get dozens of commands." },
    ],
  },
  files: {
    intro: "LazyVim provides modern file management with fuzzy finding, a file tree, and buffer/tab management.",
    concepts: [
      { heading: "Buffers, Windows, and Tabs", content: "A buffer is an open file in memory. A window is a viewport into a buffer. A tab is a collection of windows. You can have many buffers open but only see a few in windows. LazyVim shows buffers as a tab bar at the top." },
      { heading: "LazyVim File Commands", content: "Space-f opens file-related commands. Space-ff opens Telescope file finder. Space-fr shows recent files. Space-e toggles the neo-tree file explorer. Space-E opens neo-tree at the current file's location." },
      { heading: "Buffer Navigation", content: "H and L (Shift-h/l) switch between open buffers (previous/next). Space-bd closes the current buffer. Space-, opens a buffer picker. These let you move between files without using a file tree." },
      { heading: "Neo-tree File Explorer", content: "The file tree on the left is neo-tree. Toggle it with Space-e. Inside neo-tree, use standard navigation (j/k), Enter to open, a to create a file, d to delete, r to rename. It's there when you need it but stays out of the way." },
    ],
  },
  surround: {
    intro: "The surround plugin lets you add, delete, or replace surrounding characters like quotes, brackets, and tags.",
    concepts: [
      { heading: "What Surround Means", content: "Surround operations work on the delimiters around text — quotes, parentheses, braces, brackets, and HTML tags. Instead of manually navigating to each delimiter, surround commands handle both sides at once." },
      { heading: "Add Surround", content: "gsa{motion}{char} adds surrounding characters. For example, gsaiw\" surrounds the current word with double quotes. gsaiw( wraps the word in parentheses. The 'gsa' prefix stands for 'go surround add'." },
      { heading: "Delete Surround", content: "gsd{char} removes surrounding characters. gsd\" removes the quotes around the cursor's current quoted string. gsd( removes parentheses. You don't need to be on the delimiter — Vim finds the nearest matching pair." },
      { heading: "Replace Surround", content: "gsr{old}{new} replaces one surrounding with another. gsr\"' changes double quotes to single quotes. gsr({ changes parentheses to curly braces. This is a two-character sequence: what to find, then what to replace with." },
    ],
  },
  windows: {
    intro: "Windows let you view multiple files (or multiple views of the same file) side by side.",
    concepts: [
      { heading: "Splits", content: "Ctrl-w s creates a horizontal split (top/bottom). Ctrl-w v creates a vertical split (left/right). In LazyVim, you can also use Space-| for vertical and Space-- for horizontal splits." },
      { heading: "Navigation Between Splits", content: "Ctrl-h/j/k/l moves between splits (left/down/up/right). This mirrors the hjkl movement you already know. LazyVim makes these work seamlessly even with tmux." },
      { heading: "Resizing and Closing", content: "Ctrl-w = equalizes all window sizes. Ctrl-w _ maximizes height. Ctrl-w | maximizes width. Ctrl-w q or :q closes a window. Space-wd also closes the current window in LazyVim." },
      { heading: "Zooming", content: "When you need to focus on one window temporarily, you can maximize it and restore later. This is useful during debugging or when reading a large function." },
    ],
  },
  search: {
    intro: "Search commands help you find text in the current file, across the project, and navigate between matches.",
    concepts: [
      { heading: "/ and ? Search", content: "/ starts a forward search, ? starts a backward search. Type your pattern and press Enter. n goes to the next match, N goes to the previous. The search wraps around the file by default." },
      { heading: "Word Search", content: "* searches forward for the word under the cursor. # searches backward. This is the fastest way to find all occurrences of a variable or function name." },
      { heading: "Telescope Pickers", content: "LazyVim uses Telescope for fuzzy finding. Space-sg greps across the project (live grep). Space-ss searches symbols. Space-/ searches in the current buffer. These are more powerful than basic / search." },
      { heading: "Search and Replace", content: ":%s/old/new/g replaces all occurrences in the file. Add c for confirmation: :%s/old/new/gc. LazyVim also provides Space-sr for project-wide search and replace using Spectre." },
    ],
  },
  git: {
    intro: "LazyVim integrates Git deeply, letting you stage, commit, diff, and browse history without leaving the editor.",
    concepts: [
      { heading: "LazyGit TUI", content: "Space-gg opens LazyGit, a full terminal UI for Git. You can stage files, write commits, push/pull, manage branches, and resolve conflicts all from within Neovim. It's the fastest way to do complex Git operations." },
      { heading: "Hunks", content: "A hunk is a changed section of code. ]h jumps to the next hunk, [h to the previous. You can stage individual hunks (Space-ghs), reset them (Space-ghr), or preview the diff (Space-ghp) without opening a separate tool." },
      { heading: "Blame and History", content: "Space-gb shows git blame — who changed each line and when. This is invaluable for understanding why code exists. You can also browse file history to see how code evolved." },
      { heading: "Diff View", content: "LazyVim shows changed lines in the gutter (sign column) with colored markers: green for additions, red for deletions, blue for modifications. This gives you constant awareness of what you've changed." },
    ],
  },
  lsp: {
    intro: "LSP (Language Server Protocol) gives your editor IDE-like intelligence — completions, diagnostics, navigation, and refactoring.",
    concepts: [
      { heading: "What Is LSP?", content: "LSP connects your editor to a language server that understands your code. It provides auto-completion, error checking, go-to-definition, find references, and refactoring. LazyVim auto-configures LSP for most languages." },
      { heading: "Go-to-Definition and References", content: "gd goes to the definition of the symbol under the cursor. gr finds all references to it. gI goes to the implementation. These work across files, letting you navigate code like an IDE." },
      { heading: "Rename and Code Actions", content: "Space-cr renames a symbol everywhere it's used. Space-ca shows available code actions (quick fixes, refactors). K shows hover documentation for the symbol under the cursor." },
      { heading: "Diagnostics", content: "LSP shows errors and warnings inline. ]d jumps to the next diagnostic, [d to the previous. Space-cd shows the full diagnostic message. These help you find and fix issues without running a build." },
    ],
  },
  trouble: {
    intro: "Trouble provides a structured panel for browsing diagnostics, quickfix lists, and other collections of locations.",
    concepts: [
      { heading: "What Are Diagnostics?", content: "Diagnostics are errors, warnings, and hints from your language server, linter, or compiler. They appear as inline markers in your code. Trouble collects them into a browsable list so you can work through issues systematically." },
      { heading: "The Quickfix List", content: "The quickfix list is Vim's built-in way to hold a list of locations (file + line). Search results, build errors, and grep results all populate the quickfix list. Use :cnext/:cprev or ]q/[q to navigate." },
      { heading: "Trouble Panel", content: "Space-xx toggles the Trouble panel, showing all diagnostics for the workspace. Space-xd shows diagnostics for the current buffer only. Click or press Enter on any item to jump to that location." },
      { heading: "Navigating Issues", content: "Inside Trouble, use j/k to move between items and Enter to jump to the location. You can filter by severity (errors only, warnings only). This is much faster than scrolling through code looking for red squiggles." },
    ],
  },
  ui: {
    intro: "LazyVim provides toggle commands for common UI settings, all under the Space-u prefix.",
    concepts: [
      { heading: "Toggle Philosophy", content: "LazyVim groups UI toggles under Space-u. This gives you quick access to settings you'd normally dig through menus for. Each toggle shows a notification confirming the new state." },
      { heading: "Common Toggles", content: "Space-uw toggles word wrap. Space-ul toggles line numbers. Space-ur toggles relative line numbers. Space-us toggles spell checking. Space-ud toggles diagnostics display. These adapt your editor to different tasks." },
      { heading: "Theme and Appearance", content: "Space-uC opens the colorscheme picker. Other visual toggles control the indent guides, scroll bar, and other visual elements. You can quickly strip down the UI for focused writing or add guides for complex code." },
    ],
  },
  fold: {
    intro: "Code folding lets you collapse sections of code to see the big picture without scrolling past implementation details.",
    concepts: [
      { heading: "What Is Code Folding?", content: "Folding hides lines of code under a single line, showing just a summary. You can fold functions, classes, if-blocks, or any nested structure. The folded code isn't deleted — it's just hidden from view." },
      { heading: "Open and Close Folds", content: "zo opens a fold under the cursor. zc closes (creates) a fold. za toggles a fold. These are the most common fold commands. The fold is determined by the code's indentation or syntax structure." },
      { heading: "Fold All and Unfold All", content: "zM closes all folds in the file — great for getting an overview of a file's structure. zR opens all folds, restoring the full view. These are useful when exploring unfamiliar code." },
    ],
  },
  marks: {
    intro: "Marks let you bookmark positions in your code, and macros let you record and replay sequences of commands.",
    concepts: [
      { heading: "What Are Marks?", content: "A mark saves a cursor position that you can jump back to. Set a mark with m{letter} and jump to it with '{letter} or `{letter}. Lowercase marks (a-z) are local to a file. Uppercase marks (A-Z) work across files." },
      { heading: "Local Marks", content: "ma sets mark 'a' at the current position. 'a jumps to the line of mark 'a'. `a jumps to the exact position (line and column). You have 26 local marks per file. Use them to bookmark spots you're working on." },
      { heading: "Recording Macros", content: "q{letter} starts recording a macro into register {letter}. Perform your edits, then press q again to stop. @{letter} replays the macro. @@ repeats the last macro. Macros are perfect for repetitive edits." },
      { heading: "Macro Tips", content: "Record macros on a single instance, then replay on others. Use 0 or ^ at the start to position consistently. End with j to move to the next line. Then use a count: 10@a replays macro 'a' ten times." },
    ],
  },
  todo: {
    intro: "LazyVim highlights TODO/FIXME/HACK comments in your code and provides commands to search and navigate them.",
    concepts: [
      { heading: "Todo-Comments Plugin", content: "The todo-comments plugin highlights keywords like TODO, FIXME, HACK, WARN, NOTE, and PERF in comments. Each gets a distinct color. This makes important notes visually pop out of your code." },
      { heading: "Navigating Todos", content: "]t jumps to the next todo comment. [t jumps to the previous. This lets you quickly hop between all the places that need attention without searching manually." },
      { heading: "Searching All Todos", content: "Space-st opens a Telescope picker showing all TODO comments across your project. You can filter by keyword (only FIXMEs, only TODOs) and jump directly to any item. Space-sT filters to TODO/FIX/FIXME only." },
      { heading: "Commenting Code", content: "gc{motion} toggles comments. gcc toggles the current line. gco opens a comment below, gcO above. In visual mode, gc comments the selection. LazyVim auto-detects the correct comment syntax for each language." },
    ],
  },
};
