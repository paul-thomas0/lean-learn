import { renderMarkdown } from '../../utils/renderMarkdown';

interface TextBlockProps {
  content: string;
}

export function TextBlock({ content }: TextBlockProps) {
  return (
    <div className="text-[var(--text-secondary)] leading-relaxed mb-4">
      {renderMarkdown(content)}
    </div>
  );
}
