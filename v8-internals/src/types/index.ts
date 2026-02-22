export type ModuleId = 'v8-engine' | 'chrome-integration' | 'nodejs-integration';

export interface Module {
  id: ModuleId;
  title: string;
  subtitle: string;
  color: string;
  icon: string;
  badgeName: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock[];
}

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'text'; content: string }
  | { type: 'code'; language: string; code: string; caption?: string }
  | { type: 'diagram'; diagramId: string; caption?: string }
  | { type: 'info'; variant: 'note' | 'tip' | 'warning'; title: string; content: string }
  | { type: 'key-concept'; title: string; content: string }
  | { type: 'comparison'; leftTitle: string; rightTitle: string; leftContent: string; rightContent: string };

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  sectionRef: string;
}

export interface ModuleProgress {
  completedSections: string[];
  quizScore: number | null;
  quizTotal: number | null;
  badgeEarned: boolean;
}

export interface AppProgress {
  modules: Record<ModuleId, ModuleProgress>;
  lastVisited: NavigationTarget | null;
}

export interface Badge {
  name: string;
  description: string;
  moduleId: ModuleId;
  threshold: number;
}

export type NavigationTarget =
  | { screen: 'home' }
  | { screen: 'section'; moduleId: ModuleId; sectionId: string }
  | { screen: 'quiz'; moduleId: ModuleId }
  | { screen: 'results'; moduleId: ModuleId };
