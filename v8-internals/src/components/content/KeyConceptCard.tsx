import { renderMarkdown } from '../../utils/renderMarkdown';

interface KeyConceptCardProps {
  title: string;
  content: string;
}

export function KeyConceptCard({ title, content }: KeyConceptCardProps) {
  return (
    <div className="mb-6 rounded-lg border border-[var(--accent-purple)]/30 bg-purple-500/5 p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
        <h4 className="font-semibold text-[var(--accent-purple)]">{title}</h4>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{renderMarkdown(content)}</div>
    </div>
  );
}
