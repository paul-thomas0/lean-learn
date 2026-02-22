import type { Section } from '../../../types';

export const multiProcessSections: Section[] = [
  {
    id: 'chrome-multi-process',
    title: 'Multi-Process Architecture',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Why Chrome Uses Multiple Processes',
      },
      {
        type: 'text',
        content:
          'Chrome pioneered the multi-process browser architecture. Before Chrome, most browsers ran everything in a single process — one bad tab could crash the entire browser. Chrome separates work across multiple OS processes so that a crash in one renderer cannot take down the browser or other tabs. Each process also runs in a security sandbox, limiting the damage a compromised renderer can do.',
      },
      {
        type: 'key-concept',
        title: 'Process Isolation',
        content:
          'Each renderer process is sandboxed and has no direct access to the file system, network, or display. It must communicate with the browser process via IPC to perform privileged operations. This is a defense-in-depth strategy: even if an attacker exploits a vulnerability in V8 or Blink, the sandbox limits what they can do.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Browser Process',
      },
      {
        type: 'text',
        content:
          'The browser process is the main coordinator. It manages the UI chrome (address bar, tabs, bookmarks), handles network requests, manages file system access, and orchestrates all other processes. There is exactly one browser process per Chrome instance. It runs the UI thread, the I/O thread, and several other specialized threads. The browser process is the most privileged process and is the only one that can perform operations like writing to disk or opening network connections.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Renderer Processes',
      },
      {
        type: 'text',
        content:
          'Renderer processes are responsible for turning HTML, CSS, and JavaScript into pixels. Each renderer runs its own instance of Blink (the rendering engine) and V8 (the JavaScript engine). Under the default process-per-site-instance model, Chrome creates a new renderer process for each instance of a site. This means that `https://example.com/page1` and `https://example.com/page2` opened from the same tab share a renderer, but `https://other.com` gets its own.',
      },
      {
        type: 'diagram',
        diagramId: 'chrome-processes',
        caption: 'Chrome multi-process architecture showing how the browser process coordinates renderer, GPU, and utility processes',
      },
      {
        type: 'heading',
        level: 3,
        text: 'GPU Process',
      },
      {
        type: 'text',
        content:
          'The GPU process handles all GPU tasks across every tab. It composites the final output from multiple renderer processes and draws it to the screen. Isolating GPU work in a single process avoids instability from buggy graphics drivers — if the GPU process crashes, Chrome can restart it without losing tab state. The GPU process receives compositing commands (draw quads, textures) from renderer processes and executes them via OpenGL, Vulkan, or Direct3D.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Utility and Service Processes',
      },
      {
        type: 'text',
        content:
          'Chrome also spins up utility processes for tasks like network service, storage service, audio, and data decoding. Previously many of these ran as threads in the browser process, but Chrome has been migrating them to separate processes (the "Services" architecture) for better isolation and stability. For example, the network service process handles all network I/O, so a bug in protocol handling cannot corrupt the browser process.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Inter-Process Communication (Mojo)',
      },
      {
        type: 'text',
        content:
          'Processes communicate using Mojo, Chrome\'s IPC framework. Mojo provides typed message pipes that allow processes to call methods on remote interfaces as if they were local. This replaces the older Chrome IPC system. Mojo interfaces are defined in `.mojom` files and compiled into C++ bindings, ensuring type safety across process boundaries.',
      },
      {
        type: 'code',
        language: 'cpp',
        code: `// Simplified Mojo interface definition (.mojom)
interface PageHandler {
  // Browser process calls this on the renderer
  SetBackgroundColor(uint32 color);

  // Renderer calls this on the browser process
  RequestNavigate(url.mojom.Url target) => (bool allowed);
};

// In C++ renderer code:
remote_page_handler_->RequestNavigate(
    target_url,
    base::BindOnce(&MyClass::OnNavigateResult,
                   weak_factory_.GetWeakPtr()));`,
        caption: 'Mojo interface definition and usage for cross-process communication',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Process-Per-Site-Instance Model',
      },
      {
        type: 'comparison',
        leftTitle: 'Process-Per-Tab (old default)',
        rightTitle: 'Process-Per-Site-Instance (current)',
        leftContent:
          'Each tab gets its own process regardless of origin. Simple but wastes memory when multiple tabs show the same site. Does not isolate cross-origin iframes.',
        rightContent:
          'Each instance of a site (same origin, connected browsing context) gets its own process. Cross-origin iframes get separate processes. Better security and memory efficiency.',
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Checking Chrome Processes',
        content:
          'Open chrome://process-internals to see the current process model, site isolation state, and which sites share processes. The Chrome Task Manager (Shift+Esc) shows memory and CPU per process.',
      },
    ],
  },
];
