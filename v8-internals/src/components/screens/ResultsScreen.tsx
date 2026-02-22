import { motion } from 'framer-motion';
import { moduleMap } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import type { ModuleId, NavigationTarget } from '../../types';

interface ResultsScreenProps {
  moduleId: ModuleId;
  onNavigate: (target: NavigationTarget) => void;
}

export function ResultsScreen({ moduleId, onNavigate }: ResultsScreenProps) {
  const mod = moduleMap[moduleId];
  const { progress } = useProgress();
  const modProgress = progress.modules[moduleId];
  const score = modProgress.quizScore ?? 0;
  const total = modProgress.quizTotal ?? 10;
  const pct = Math.round((score / total) * 100);
  const passed = pct >= 70;

  const grade = pct >= 90 ? 'A' : pct >= 80 ? 'B' : pct >= 70 ? 'C' : pct >= 60 ? 'D' : 'F';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <div className="mb-8">
        <div
          className="inline-flex items-center justify-center w-24 h-24 rounded-full text-4xl font-bold mb-4"
          style={{
            backgroundColor: `${mod.color}20`,
            color: mod.color,
          }}
        >
          {grade}
        </div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Quiz Complete!</h1>
        <p className="text-[var(--text-secondary)]">
          {mod.title}
        </p>
      </div>

      <div className="inline-block rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-8 mb-8">
        <div className="text-5xl font-bold text-[var(--text-primary)] mb-2">
          {score} / {total}
        </div>
        <div className="text-[var(--text-muted)]">{pct}% correct</div>
      </div>

      {passed && modProgress.badgeEarned && (
        <div className="mb-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 inline-block">
          <span className="text-2xl">🏆</span>
          <p className="text-yellow-400 font-medium mt-1">{mod.badgeName} Earned!</p>
          <p className="text-xs text-[var(--text-muted)]">Score 70% or higher to earn this badge</p>
        </div>
      )}

      {!passed && (
        <div className="mb-8">
          <p className="text-[var(--text-muted)]">
            Score 70% or higher to earn the <strong>{mod.badgeName}</strong> badge.
          </p>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onNavigate({ screen: 'quiz', moduleId })}
          className="px-6 py-3 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: mod.color }}
        >
          Try Again
        </button>
        <button
          onClick={() => onNavigate({ screen: 'section', moduleId, sectionId: mod.sections[0].id })}
          className="px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          Review Sections
        </button>
        <button
          onClick={() => onNavigate({ screen: 'home' })}
          className="px-6 py-3 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
}
