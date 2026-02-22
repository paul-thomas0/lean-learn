import type { ReactNode } from 'react';

/**
 * Renders a string with inline markdown formatting:
 * - **bold** → <strong>
 * - *italic* → <em>
 * - `code` → <code>
 * - \n\n- list items → <ul><li>
 */
export function renderMarkdown(text: string): ReactNode {
  // Split on fenced code blocks first (```...```)
  const segments = text.split(/(```[\s\S]*?```)/g);

  const result: ReactNode[] = [];
  let keyCounter = 0;

  for (const segment of segments) {
    if (segment.startsWith('```') && segment.endsWith('```')) {
      // Fenced code block — strip the ``` delimiters and optional language tag
      const inner = segment.slice(3, -3).replace(/^\w*\n/, '');
      result.push(
        <pre
          key={keyCounter++}
          className="mb-4 rounded-lg bg-[var(--bg-tertiary)] p-4 text-sm font-mono text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed overflow-x-auto"
        >
          {inner}
        </pre>
      );
      continue;
    }

    // Regular text — split on double-newline for paragraphs/lists
    const blocks = segment.split(/\n\n/);

    for (const block of blocks) {
      if (!block.trim()) continue;

      if (/^- /.test(block.trim())) {
        const items = block.trim().split(/\n- /).map((item, idx) => {
          const cleaned = idx === 0 ? item.replace(/^- /, '') : item;
          return <li key={idx}>{renderInline(cleaned)}</li>;
        });
        result.push(
          <ul key={keyCounter++} className="list-disc list-inside mb-4 space-y-1">
            {items}
          </ul>
        );
      } else {
        result.push(
          <p key={keyCounter++} className="mb-4 last:mb-0">
            {renderInline(block)}
          </p>
        );
      }
    }
  }

  return result;
}

function renderInline(text: string): ReactNode {
  // Match **bold**, *italic*, and `code` — order matters (bold before italic)
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[var(--text-primary)]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] text-[var(--accent-blue)] rounded text-sm font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
