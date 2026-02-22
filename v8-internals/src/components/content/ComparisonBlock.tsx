import { renderMarkdown } from '../../utils/renderMarkdown';

interface ComparisonBlockProps {
  leftTitle: string;
  rightTitle: string;
  leftContent: string;
  rightContent: string;
}

export function ComparisonBlock({ leftTitle, rightTitle, leftContent, rightContent }: ComparisonBlockProps) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
        <h4 className="text-sm font-semibold text-[var(--accent-blue)] mb-3">{leftTitle}</h4>
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{renderMarkdown(leftContent)}</div>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
        <h4 className="text-sm font-semibold text-[var(--accent-green)] mb-3">{rightTitle}</h4>
        <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{renderMarkdown(rightContent)}</div>
      </div>
    </div>
  );
}
