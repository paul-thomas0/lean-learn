import { cn } from '../../utils/cn';
import { modules } from '../../data/modules';
import type { NavigationTarget, ModuleId } from '../../types';

interface MobileNavProps {
  currentNav: NavigationTarget;
  onNavigate: (target: NavigationTarget) => void;
}

export function MobileNav({ currentNav, onNavigate }: MobileNavProps) {
  const isHome = currentNav.screen === 'home';
  const currentModuleId = currentNav.screen !== 'home' ? (currentNav as { moduleId: ModuleId }).moduleId : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)] border-t border-[var(--border)] flex md:hidden z-50">
      <button
        onClick={() => onNavigate({ screen: 'home' })}
        className={cn(
          'flex-1 flex flex-col items-center py-2 text-xs transition-colors',
          isHome ? 'text-[var(--accent-blue)]' : 'text-[var(--text-muted)]'
        )}
      >
        <span className="text-lg">🏠</span>
        <span>Home</span>
      </button>
      {modules.map((mod) => (
        <button
          key={mod.id}
          onClick={() => onNavigate({ screen: 'section', moduleId: mod.id, sectionId: mod.sections[0]?.id })}
          className={cn(
            'flex-1 flex flex-col items-center py-2 text-xs transition-colors',
            currentModuleId === mod.id ? 'opacity-100' : 'opacity-60'
          )}
          style={{ color: currentModuleId === mod.id ? mod.color : undefined }}
        >
          <span className="text-lg">{mod.icon}</span>
          <span className="truncate max-w-[60px]">{mod.title.split(' ')[0]}</span>
        </button>
      ))}
    </nav>
  );
}
