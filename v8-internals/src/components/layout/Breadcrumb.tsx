import type { ModuleId } from '../../types';
import { moduleMap } from '../../data/modules';

interface BreadcrumbProps {
  moduleId?: ModuleId;
  sectionTitle?: string;
  onNavigateHome: () => void;
  onNavigateModule?: () => void;
}

export function Breadcrumb({ moduleId, sectionTitle, onNavigateHome, onNavigateModule }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-6">
      <button onClick={onNavigateHome} className="hover:text-[var(--text-primary)] transition-colors">
        Home
      </button>
      {moduleId && (
        <>
          <span>/</span>
          <button
            onClick={onNavigateModule}
            className="hover:text-[var(--text-primary)] transition-colors"
            style={{ color: moduleMap[moduleId]?.color }}
          >
            {moduleMap[moduleId]?.title}
          </button>
        </>
      )}
      {sectionTitle && (
        <>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">{sectionTitle}</span>
        </>
      )}
    </nav>
  );
}
