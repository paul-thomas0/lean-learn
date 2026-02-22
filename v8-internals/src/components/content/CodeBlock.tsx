interface CodeBlockProps {
  language: string;
  code: string;
  caption?: string;
}

export function CodeBlock({ language, code, caption }: CodeBlockProps) {
  return (
    <div className="mb-6">
      <div className="bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border)] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
          <span className="text-xs text-[var(--text-muted)] font-mono">{language}</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-[var(--text-primary)] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
      {caption && (
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center italic">{caption}</p>
      )}
    </div>
  );
}
