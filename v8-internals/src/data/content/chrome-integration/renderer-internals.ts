import type { Section } from '../../../types';

export const rendererInternalsSections: Section[] = [
  {
    id: 'chrome-renderer-internals',
    title: 'Renderer Process Internals',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Inside the Renderer Process',
      },
      {
        type: 'text',
        content:
          'The renderer process is where web pages come to life. It contains two major engines: Blink (the rendering engine, forked from WebKit) and V8 (the JavaScript engine). Together they parse HTML, compute styles, execute JavaScript, lay out elements, paint layers, and hand compositing instructions to the GPU process. Understanding the internal threading model and rendering pipeline is essential to writing performant web applications.',
      },
      {
        type: 'key-concept',
        title: 'Blink + V8 Relationship',
        content:
          'Blink owns the DOM, CSS engine, and layout system. V8 provides JavaScript execution. Blink creates V8 Isolates and Contexts, and exposes DOM APIs to JavaScript through V8\'s binding system. When JavaScript calls `document.getElementById()`, V8 invokes a Blink-implemented callback through the V8 binding layer. Blink and V8 share the same main thread within the renderer.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'V8 Isolate and Context in the Renderer',
      },
      {
        type: 'text',
        content:
          'Each renderer process creates one V8 Isolate — an isolated instance of the V8 engine with its own heap. Within that Isolate, Blink creates V8 Contexts for each JavaScript execution environment. A page\'s main frame gets one Context, and each cross-origin iframe gets a separate Context (though they share the same Isolate if in the same renderer process). The `window` global object, DOM bindings, and Web API prototypes are all set up per Context.',
      },
      {
        type: 'code',
        language: 'cpp',
        code: `// Simplified: How Blink sets up V8 for a frame
void LocalFrame::Initialize() {
  // One Isolate per renderer process
  v8::Isolate* isolate = V8PerIsolateData::MainThreadIsolate();

  // Create a new Context for this frame
  v8::Local<v8::Context> context =
      v8::Context::New(isolate);

  // Install DOM bindings (window, document, etc.)
  WindowProxy* window_proxy =
      WindowProxy::Create(isolate, context, this);

  // Set up security origin checks
  context->SetSecurityToken(
      SecurityOriginToV8Token(GetSecurityOrigin()));
}`,
        caption: 'Blink creating a V8 Context for a frame with DOM bindings',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Main Thread vs Compositor Thread',
      },
      {
        type: 'text',
        content:
          'The renderer has two critical threads. The main thread runs JavaScript, DOM operations, style calculations, and layout. The compositor thread handles scrolling, CSS animations/transitions, and assembles painted layers into frames to send to the GPU process. This separation is why CSS `transform` and `opacity` animations can run at 60fps even when the main thread is busy — the compositor handles them independently.',
      },
      {
        type: 'comparison',
        leftTitle: 'Main Thread Work',
        rightTitle: 'Compositor Thread Work',
        leftContent:
          'JavaScript execution, DOM manipulation, style recalculation, layout computation, painting display lists, running requestAnimationFrame callbacks, event handler dispatch.',
        rightContent:
          'Layer compositing, scrolling (when possible), CSS transform/opacity animations, tiling and rasterization scheduling, frame submission to GPU process, input event fast-path (scroll, pinch).',
      },
      {
        type: 'diagram',
        diagramId: 'renderer-internals',
        caption: 'Renderer process architecture showing the main thread (Blink + V8) and compositor thread working together',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Rendering Pipeline',
      },
      {
        type: 'text',
        content:
          'Every frame the renderer produces goes through a well-defined pipeline: DOM construction, style calculation, layout, layer tree construction, paint, and composite. Each stage builds on the output of the previous one. Understanding which stages your code triggers helps you avoid unnecessary work and keep frame times under 16ms for 60fps.',
      },
      {
        type: 'code',
        language: 'text',
        code: `Rendering Pipeline Stages:

1. DOM          Parse HTML → build DOM tree
2. Style        Match CSS selectors → compute styles per element
3. Layout       Calculate geometry (position, size) for each box
4. Layer Tree   Determine compositing layers (will-change, transforms)
5. Paint        Generate display lists (draw commands) per layer
6. Composite    Compositor thread tiles, rasterizes, and submits to GPU`,
        caption: 'The six stages of the rendering pipeline in Blink',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Layout Thrashing and Forced Synchronous Layouts',
      },
      {
        type: 'text',
        content:
          'Normally layout runs once per frame. But if JavaScript reads a layout property (like `offsetHeight`) after writing to the DOM, the browser must run layout synchronously to return the correct value. Doing this repeatedly in a loop is called "layout thrashing" and is one of the most common performance pitfalls. The browser loses its ability to batch layout calculations.',
      },
      {
        type: 'code',
        language: 'javascript',
        code: `// BAD: Layout thrashing — forces layout on every iteration
for (const el of elements) {
  el.style.width = container.offsetWidth + 'px';  // read forces layout
  // style write invalidates layout, next read forces it again
}

// GOOD: Batch reads, then batch writes
const width = container.offsetWidth;  // single read
for (const el of elements) {
  el.style.width = width + 'px';     // writes only
}`,
        caption: 'Layout thrashing vs batched DOM reads and writes',
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'Properties That Trigger Layout',
        content:
          'Reading offsetTop/Left/Width/Height, clientTop/Left/Width/Height, scrollTop/Left/Width/Height, getComputedStyle(), and getBoundingClientRect() all force a synchronous layout if the DOM has been modified. Use DevTools Performance panel to spot "Forced reflow" warnings.',
      },
    ],
  },
];
