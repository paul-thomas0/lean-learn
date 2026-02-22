import { motion } from 'framer-motion';
import { modules } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import type { NavigationTarget } from '../../types';

interface HomeScreenProps {
  onNavigate: (target: NavigationTarget) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { progress } = useProgress();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">V8 Engine Internals</h1>
        <p className="text-[var(--text-secondary)]">
          Master the internals of V8, Chrome's architecture, and Node.js integration
        </p>
      </div>

      <div className="grid gap-6">
        {modules.map((mod, idx) => {
          const modProgress = progress.modules[mod.id];
          const totalSections = mod.sections.length;
          const completedCount = modProgress.completedSections.length;
          const pct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;
          const hasStarted = completedCount > 0 || modProgress.quizScore !== null;

          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6 hover:border-opacity-50 transition-colors"
              style={{ borderColor: `${mod.color}20` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{mod.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">{mod.title}</h2>
                    <p className="text-sm text-[var(--text-muted)]">{mod.subtitle}</p>
                  </div>
                </div>
                {modProgress.badgeEarned && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    🏆 {mod.badgeName}
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1">
                  <span>{completedCount} / {totalSections} sections</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: mod.color }}
                  />
                </div>
              </div>

              {modProgress.quizScore !== null && (
                <div className="mb-4 text-sm text-[var(--text-muted)]">
                  Quiz: {modProgress.quizScore}/{modProgress.quizTotal}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    const firstIncomplete = mod.sections.find(
                      (s) => !modProgress.completedSections.includes(s.id)
                    );
                    const target = firstIncomplete || mod.sections[0];
                    if (target) {
                      onNavigate({ screen: 'section', moduleId: mod.id, sectionId: target.id });
                    }
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: mod.color }}
                >
                  {hasStarted ? 'Continue' : 'Start Learning'}
                </button>
                {hasStarted && (
                  <button
                    onClick={() => onNavigate({ screen: 'quiz', moduleId: mod.id })}
                    className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    Take Quiz
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
