import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import type { NavigationTarget } from '../../types';

interface AppShellProps {
  currentNav: NavigationTarget;
  onNavigate: (target: NavigationTarget) => void;
  children: React.ReactNode;
}

export function AppShell({ currentNav, onNavigate, children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Desktop sidebar */}
      <div className="hidden lg:block flex-shrink-0">
        <Sidebar currentNav={currentNav} onNavigate={onNavigate} />
      </div>

      {/* Tablet collapsible sidebar */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <Sidebar currentNav={currentNav} onNavigate={(t) => { onNavigate(t); setSidebarOpen(false); }} />
          </div>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Tablet/mobile top bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-secondary)]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-sm font-medium text-[var(--text-primary)]">V8 Internals</span>
        </div>

        <main className="p-4 md:p-8 pb-20 md:pb-8 max-w-4xl mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileNav currentNav={currentNav} onNavigate={onNavigate} />
    </div>
  );
}
