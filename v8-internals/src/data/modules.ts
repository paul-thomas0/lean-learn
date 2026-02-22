import type { Module, ModuleId } from '../types';
import { compilationPipelineSections } from './content/v8-engine/compilation-pipeline';
import { ssaOptimizationSections } from './content/v8-engine/ssa-optimization';
import { hiddenClassesSections } from './content/v8-engine/hidden-classes';
import { garbageCollectionSections } from './content/v8-engine/garbage-collection';
import { multiProcessSections } from './content/chrome-integration/multi-process';
import { rendererInternalsSections } from './content/chrome-integration/renderer-internals';
import { chromeEventLoopSections } from './content/chrome-integration/event-loop';
import { siteIsolationSections } from './content/chrome-integration/site-isolation';
import { resourceManagementSections } from './content/chrome-integration/resource-management';
import { nodeArchitectureSections } from './content/nodejs-integration/architecture';
import { nodeEventLoopSections } from './content/nodejs-integration/event-loop';
import { eventLoopComparisonSections } from './content/nodejs-integration/comparison';
import { threadPoolSections } from './content/nodejs-integration/thread-pool';
import { v8BindingsSections } from './content/nodejs-integration/v8-bindings';
import { queueSystemSections } from './content/nodejs-integration/queue-system';
import { denoComparisonSections } from './content/nodejs-integration/deno-comparison';

export const modules: Module[] = [
  {
    id: 'v8-engine',
    title: 'V8 Engine Internals',
    subtitle: 'Compilation pipeline, hidden classes, and garbage collection',
    color: '#3b82f6',
    icon: '⚡',
    badgeName: 'V8 Master',
    sections: [
      ...compilationPipelineSections,
      ...ssaOptimizationSections,
      ...hiddenClassesSections,
      ...garbageCollectionSections,
    ],
  },
  {
    id: 'chrome-integration',
    title: "Chrome's Integration with V8",
    subtitle: 'Multi-process architecture, rendering, and site isolation',
    color: '#8b5cf6',
    icon: '🌐',
    badgeName: 'Chrome Expert',
    sections: [
      ...multiProcessSections,
      ...rendererInternalsSections,
      ...chromeEventLoopSections,
      ...siteIsolationSections,
      ...resourceManagementSections,
    ],
  },
  {
    id: 'nodejs-integration',
    title: 'Node.js Integration with V8',
    subtitle: 'Event loop, libuv, thread pool, and V8 bindings',
    color: '#10b981',
    icon: '🟢',
    badgeName: 'Node.js Specialist',
    sections: [
      ...nodeArchitectureSections,
      ...nodeEventLoopSections,
      ...queueSystemSections,
      ...eventLoopComparisonSections,
      ...threadPoolSections,
      ...v8BindingsSections,
      ...denoComparisonSections,
    ],
  },
];

export const moduleMap: Record<ModuleId, Module> = Object.fromEntries(
  modules.map((m) => [m.id, m])
) as Record<ModuleId, Module>;

export { v8EngineQuiz } from './content/v8-engine/quiz';
export { chromeIntegrationQuiz } from './content/chrome-integration/quiz';
export { nodejsIntegrationQuiz } from './content/nodejs-integration/quiz';
