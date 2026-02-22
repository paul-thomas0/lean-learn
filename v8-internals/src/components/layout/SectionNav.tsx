import type { ModuleId, NavigationTarget } from '../../types';
import { moduleMap } from '../../data/modules';

interface SectionNavProps {
  moduleId: ModuleId;
  currentSectionId: string;
  onNavigate: (target: NavigationTarget) => void;
}

export function SectionNav({ moduleId, currentSectionId, onNavigate }: SectionNavProps) {
  const mod = moduleMap[moduleId];
  if (!mod) return null;

  const idx = mod.sections.findIndex((s) => s.id === currentSectionId);
  const prev = idx > 0 ? mod.sections[idx - 1] : null;
  const next = idx < mod.sections.length - 1 ? mod.sections[idx + 1] : null;

  return (
    <div className="flex items-center justify-between mt-12 pt-6 border-t border-[var(--border)]">
      {prev ? (
        <button
          onClick={() => onNavigate({ screen: 'section', moduleId, sectionId: prev.id })}
          className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span>←</span>
          <span>{prev.title}</span>
        </button>
      ) : (
        <div />
      )}
      {next ? (
        <button
          onClick={() => onNavigate({ screen: 'section', moduleId, sectionId: next.id })}
          className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span>{next.title}</span>
          <span>→</span>
        </button>
      ) : (
        <button
          onClick={() => onNavigate({ screen: 'quiz', moduleId })}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: mod.color }}
        >
          <span>Take the Quiz</span>
          <span>→</span>
        </button>
      )}
    </div>
  );
}
