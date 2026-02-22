import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { moduleMap } from '../../data/modules';
import { useProgress } from '../../hooks/useProgress';
import { SectionRenderer } from '../content/SectionRenderer';
import { Breadcrumb } from '../layout/Breadcrumb';
import { SectionNav } from '../layout/SectionNav';
import type { ModuleId, NavigationTarget } from '../../types';

interface SectionScreenProps {
  moduleId: ModuleId;
  sectionId: string;
  onNavigate: (target: NavigationTarget) => void;
}

export function SectionScreen({ moduleId, sectionId, onNavigate }: SectionScreenProps) {
  const { dispatch } = useProgress();
  const mod = moduleMap[moduleId];
  const section = mod?.sections.find((s) => s.id === sectionId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [sectionId]);

  useEffect(() => {
    if (section) {
      dispatch({ type: 'COMPLETE_SECTION', moduleId, sectionId });
      dispatch({ type: 'SET_LAST_VISITED', target: { screen: 'section', moduleId, sectionId } });
    }
  }, [moduleId, sectionId, section, dispatch]);

  if (!mod || !section) {
    return <div className="text-[var(--text-muted)]">Section not found.</div>;
  }

  return (
    <motion.div
      key={sectionId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Breadcrumb
        moduleId={moduleId}
        sectionTitle={section.title}
        onNavigateHome={() => onNavigate({ screen: 'home' })}
        onNavigateModule={() =>
          onNavigate({ screen: 'section', moduleId, sectionId: mod.sections[0].id })
        }
      />

      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-8">{section.title}</h1>

      <SectionRenderer section={section} />

      <SectionNav moduleId={moduleId} currentSectionId={sectionId} onNavigate={onNavigate} />
    </motion.div>
  );
}
