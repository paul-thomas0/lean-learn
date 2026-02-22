import { cn } from '../../utils/cn';
import { renderMarkdown } from '../../utils/renderMarkdown';

interface InfoCardProps {
  variant: 'note' | 'tip' | 'warning';
  title: string;
  content: string;
}

const variantStyles = {
  note: { border: 'border-[var(--accent-blue)]', bg: 'bg-blue-500/5', icon: 'ℹ️', color: 'text-[var(--accent-blue)]' },
  tip: { border: 'border-[var(--accent-green)]', bg: 'bg-green-500/5', icon: '💡', color: 'text-[var(--accent-green)]' },
  warning: { border: 'border-[var(--accent-orange)]', bg: 'bg-orange-500/5', icon: '⚠️', color: 'text-[var(--accent-orange)]' },
};

export function InfoCard({ variant, title, content }: InfoCardProps) {
  const style = variantStyles[variant];
  return (
    <div className={cn('mb-6 rounded-lg border-l-4 p-4', style.border, style.bg)}>
      <div className={cn('flex items-center gap-2 font-medium mb-2', style.color)}>
        <span>{style.icon}</span>
        <span>{title}</span>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">{renderMarkdown(content)}</div>
    </div>
  );
}
