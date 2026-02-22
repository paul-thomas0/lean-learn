import { cn } from '../../utils/cn';
import { modules } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import type { NavigationTarget } from '../../types';
import { useState } from 'react';

interface SidebarProps {
  currentNav: NavigationTarget;
  onNavigate: (target: NavigationTarget) => void;
}

export function Sidebar({ currentNav, onNavigate }: SidebarProps) {
  const { progress } = useProgress();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'v8-engine': true,
    'chrome-integration': true,
    'nodejs-integration': true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="w-72 bg-[var(--bg-secondary)] border-r border-[var(--border)] h-screen overflow-y-auto flex flex-col">
      <div
        className="p-4 border-b border-[var(--border)] cursor-pointer hover:bg-[var(--bg-tertiary)] transition-colors"
        onClick={() => onNavigate({ screen: 'home' })}
      >
        <h1 className="text-lg font-bold text-[var(--text-primary)]">⚡ V8 Internals</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">Interactive Learning Platform</p>
      </div>

      <nav className="flex-1 py-2">
        {modules.map((mod) => {
          const modProgress = progress.modules[mod.id];
          const totalSections = mod.sections.length;
          const completedCount = modProgress.completedSections.length;
          const pct = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;
          const isExpanded = expandedModules[mod.id];

          return (
            <div key={mod.id} className="mb-1">
              <button
                onClick={() => toggleModule(mod.id)}
                className={cn(
                  'w-full flex items-center gap-2 px-4 py-2 text-left text-sm font-medium',
                  'hover:bg-[var(--bg-tertiary)] transition-colors'
                )}
                style={{ color: mod.color }}
              >
                <span className="text-base">{mod.icon}</span>
                <span className="flex-1 truncate">{mod.title}</span>
                <span className="text-xs text-[var(--text-muted)]">{pct}%</span>
                <svg
                  className={cn('w-3 h-3 transition-transform', isExpanded && 'rotate-90')}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Progress bar */}
              <div className="mx-4 h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${pct}%`, backgroundColor: mod.color }}
                />
              </div>

              {isExpanded && (
                <div className="mt-1">
                  {mod.sections.map((section) => {
                    const isCompleted = modProgress.completedSections.includes(section.id);
                    const isCurrent =
                      currentNav.screen === 'section' &&
                      currentNav.moduleId === mod.id &&
                      currentNav.sectionId === section.id;

                    return (
                      <button
                        key={section.id}
                        onClick={() =>
                          onNavigate({ screen: 'section', moduleId: mod.id, sectionId: section.id })
                        }
                        className={cn(
                          'w-full flex items-center gap-2 pl-10 pr-4 py-1.5 text-left text-sm transition-colors',
                          isCurrent
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                        )}
                      >
                        {isCompleted ? (
                          <span className="text-[var(--accent-green)] text-xs">✓</span>
                        ) : (
                          <span className="w-3 h-3 rounded-full border border-[var(--border)] inline-block" />
                        )}
                        <span className="truncate">{section.title}</span>
                      </button>
                    );
                  })}

                  {/* Quiz link */}
                  <button
                    onClick={() => onNavigate({ screen: 'quiz', moduleId: mod.id })}
                    className={cn(
                      'w-full flex items-center gap-2 pl-10 pr-4 py-1.5 text-left text-sm transition-colors',
                      currentNav.screen === 'quiz' && currentNav.moduleId === mod.id
                        ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                    )}
                  >
                    <span className="text-xs">📝</span>
                    <span>Quiz</span>
                    {modProgress.quizScore !== null && (
                      <span className="ml-auto text-xs text-[var(--text-muted)]">
                        {modProgress.quizScore}/{modProgress.quizTotal}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
