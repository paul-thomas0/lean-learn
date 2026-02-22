import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { AppProgress, ModuleId, NavigationTarget } from '../types';

const STORAGE_KEY = 'v8-internals-progress';

function defaultModuleProgress() {
  return { completedSections: [], quizScore: null, quizTotal: null, badgeEarned: false };
}

function defaultProgress(): AppProgress {
  return {
    modules: {
      'v8-engine': defaultModuleProgress(),
      'chrome-integration': defaultModuleProgress(),
      'nodejs-integration': defaultModuleProgress(),
    },
    lastVisited: null,
  };
}

type Action =
  | { type: 'COMPLETE_SECTION'; moduleId: ModuleId; sectionId: string }
  | { type: 'SAVE_QUIZ_RESULT'; moduleId: ModuleId; score: number; total: number }
  | { type: 'EARN_BADGE'; moduleId: ModuleId }
  | { type: 'SET_LAST_VISITED'; target: NavigationTarget }
  | { type: 'RESET_MODULE'; moduleId: ModuleId }
  | { type: 'HYDRATE'; state: AppProgress };

function reducer(state: AppProgress, action: Action): AppProgress {
  switch (action.type) {
    case 'COMPLETE_SECTION': {
      const mod = state.modules[action.moduleId];
      if (mod.completedSections.includes(action.sectionId)) return state;
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: {
            ...mod,
            completedSections: [...mod.completedSections, action.sectionId],
          },
        },
      };
    }
    case 'SAVE_QUIZ_RESULT':
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: {
            ...state.modules[action.moduleId],
            quizScore: action.score,
            quizTotal: action.total,
          },
        },
      };
    case 'EARN_BADGE':
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: {
            ...state.modules[action.moduleId],
            badgeEarned: true,
          },
        },
      };
    case 'SET_LAST_VISITED':
      return { ...state, lastVisited: action.target };
    case 'RESET_MODULE':
      return {
        ...state,
        modules: {
          ...state.modules,
          [action.moduleId]: defaultModuleProgress(),
        },
      };
    case 'HYDRATE':
      return action.state;
    default:
      return state;
  }
}

interface ProgressContextValue {
  progress: AppProgress;
  dispatch: React.Dispatch<Action>;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, defaultProgress());

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'HYDRATE', state: { ...defaultProgress(), ...parsed } });
      }
    } catch {
      // ignore invalid storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  return (
    <ProgressContext.Provider value={{ progress, dispatch }}>
      {children}
    </ProgressContext.Provider>
  );
}

// useProgress hook is exported from hooks/useProgress.ts
// to satisfy react-refresh/only-export-components
export { ProgressContext };
