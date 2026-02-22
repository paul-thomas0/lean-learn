import { lazy, Suspense } from 'react';

const diagrams: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  'v8-pipeline': lazy(() => import('../diagrams/PipelineDiagram')),
  'object-shapes': lazy(() => import('../diagrams/ObjectShapeDiagram')),
  'heap-memory': lazy(() => import('../diagrams/HeapDiagram')),
  'ssa-visualizer': lazy(() => import('../diagrams/SSAVisualizer')),
  'chrome-processes': lazy(() => import('../diagrams/ChromeProcessDiagram')),
  'renderer-internals': lazy(() => import('../diagrams/RendererInternalsDiagram')),
  'browser-event-loop': lazy(() => import('../diagrams/BrowserEventLoopDiagram')),
  'node-architecture': lazy(() => import('../diagrams/NodeArchDiagram')),
  'libuv-event-loop': lazy(() => import('../diagrams/LibuvEventLoopDiagram')),
  'event-loop-comparison': lazy(() => import('../diagrams/EventLoopComparisonDiagram')),
  'thread-pool': lazy(() => import('../diagrams/ThreadPoolDiagram')),
  'microtask-queue': lazy(() => import('../diagrams/MicrotaskQueueDiagram')),
};

interface DiagramBlockProps {
  diagramId: string;
  caption?: string;
}

export function DiagramBlock({ diagramId, caption }: DiagramBlockProps) {
  const DiagramComponent = diagrams[diagramId];

  if (!DiagramComponent) {
    return (
      <div className="mb-6 p-8 rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] text-center text-[var(--text-muted)]">
        Diagram: {diagramId}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-tertiary)] p-4 overflow-x-auto">
        <Suspense
          fallback={
            <div className="h-48 flex items-center justify-center text-[var(--text-muted)]">
              Loading diagram...
            </div>
          }
        >
          <DiagramComponent />
        </Suspense>
      </div>
      {caption && (
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center italic">{caption}</p>
      )}
    </div>
  );
}
