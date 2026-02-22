import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import { AppShell } from './components/layout/AppShell';
import { HomeScreen } from './components/screens/HomeScreen';
import { SectionScreen } from './components/screens/SectionScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { ResultsScreen } from './components/screens/ResultsScreen';
import type { NavigationTarget } from './types';

function AppContent() {
  const [nav, setNav] = useState<NavigationTarget>({ screen: 'home' });
  const [quizKey, setQuizKey] = useState(0);

  const onNavigate = useCallback((target: NavigationTarget) => {
    if (target.screen === 'quiz') setQuizKey((k) => k + 1);
    setNav(target);
  }, []);

  return (
    <AppShell currentNav={nav} onNavigate={onNavigate}>
      <AnimatePresence mode="wait">
        {nav.screen === 'home' && <HomeScreen onNavigate={onNavigate} />}
        {nav.screen === 'section' && (
          <SectionScreen
            key={`${nav.moduleId}-${nav.sectionId}`}
            moduleId={nav.moduleId}
            sectionId={nav.sectionId}
            onNavigate={onNavigate}
          />
        )}
        {nav.screen === 'quiz' && (
          <QuizScreen key={`quiz-${nav.moduleId}-${quizKey}`} moduleId={nav.moduleId} onNavigate={onNavigate} />
        )}
        {nav.screen === 'results' && (
          <ResultsScreen moduleId={nav.moduleId} onNavigate={onNavigate} />
        )}
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return (
    <ProgressProvider>
      <AppContent />
    </ProgressProvider>
  );
}
