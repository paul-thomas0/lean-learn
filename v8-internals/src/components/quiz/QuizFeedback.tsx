interface QuizFeedbackProps {
  isCorrect: boolean;
  explanation: string;
  onNext: () => void;
  isLast: boolean;
}

export function QuizFeedback({ isCorrect, explanation, onNext, isLast }: QuizFeedbackProps) {
  return (
    <div className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={isCorrect ? 'text-[var(--accent-green)]' : 'text-[var(--accent-red)]'}>
          {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
        </span>
      </div>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{explanation}</p>
      <button
        onClick={onNext}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--accent-blue)] text-white hover:opacity-90 transition-opacity"
      >
        {isLast ? 'See Results' : 'Next Question'}
      </button>
    </div>
  );
}
