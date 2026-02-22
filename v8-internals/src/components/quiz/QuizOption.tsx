import { cn } from '../../utils/cn';

interface QuizOptionProps {
  index: number;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  onClick: () => void;
}

const letters = ['A', 'B', 'C', 'D'];

export function QuizOption({ index, text, isSelected, isCorrect, isRevealed, onClick }: QuizOptionProps) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={cn(
        'w-full text-left p-4 rounded-lg border transition-all flex items-start gap-3',
        !isRevealed && 'hover:border-[var(--accent-blue)]/50 hover:bg-[var(--bg-tertiary)] cursor-pointer',
        isRevealed && isCorrect && 'border-[var(--accent-green)] bg-green-500/10',
        isRevealed && isSelected && !isCorrect && 'border-[var(--accent-red)] bg-red-500/10',
        isRevealed && !isSelected && !isCorrect && 'border-[var(--border)] opacity-50',
        !isRevealed && isSelected && 'border-[var(--accent-blue)] bg-blue-500/10',
        !isRevealed && !isSelected && 'border-[var(--border)]'
      )}
    >
      <span
        className={cn(
          'flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-sm font-medium',
          isRevealed && isCorrect && 'bg-[var(--accent-green)] text-white',
          isRevealed && isSelected && !isCorrect && 'bg-[var(--accent-red)] text-white',
          !isRevealed && 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
        )}
      >
        {letters[index]}
      </span>
      <span className="text-sm text-[var(--text-primary)] leading-relaxed">{text}</span>
    </button>
  );
}
