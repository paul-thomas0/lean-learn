import type { Section } from '../../../types';

export const siteIsolationSections: Section[] = [
  {
    id: 'chrome-site-isolation',
    title: 'Site Isolation & Security',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Site Isolation: Chrome\'s Security Foundation',
      },
      {
        type: 'text',
        content:
          'Site Isolation is a major Chrome architecture change that ensures pages from different sites always run in different renderer processes. This provides a critical security boundary — a compromised renderer process can only access data from the site it is rendering. Site Isolation was shipped in Chrome 67 (2018) and is now the default on all desktop platforms and on Android for sites where users enter passwords.',
      },
      {
        type: 'key-concept',
        title: 'What is a "Site"?',
        content:
          'In Site Isolation, a "site" is defined as the scheme plus the registrable domain (eTLD+1). For example, `https://mail.google.com` and `https://docs.google.com` are the same site (`https://google.com`), while `https://example.com` is a different site. This means subdomains share a process, but different registered domains never do.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Before Site Isolation',
      },
      {
        type: 'text',
        content:
          'Before Site Isolation, cross-origin iframes could share a renderer process with the embedding page. If an attacker found a vulnerability in V8 or Blink, they could read memory from any frame in the same process — including frames from other origins that might contain sensitive data like email content, banking details, or authentication tokens. The same-origin policy was enforced only in software within the renderer, not at the process boundary.',
      },
      {
        type: 'comparison',
        leftTitle: 'Before Site Isolation',
        rightTitle: 'After Site Isolation',
        leftContent:
          'A page with cross-origin iframes shares one renderer process. Same-origin policy is enforced by Blink in the same address space. A renderer exploit can read all memory in the process, including cross-origin iframe data.',
        rightContent:
          'Each site gets its own renderer process. Cross-origin iframes run in separate processes with their own address space. A renderer exploit can only access data from its own site. IPC enforces security boundaries.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'The Spectre Motivation',
      },
      {
        type: 'text',
        content:
          'The Spectre CPU vulnerability (January 2018) made Site Isolation urgently necessary. Spectre allows any code running in a process (including JavaScript) to potentially read all memory in that process using speculative execution side channels. This means even without a browser vulnerability, malicious JavaScript could read cross-origin data if it shared a process. Site Isolation ensures cross-site data is never in the same process, making Spectre attacks across sites impossible.',
      },
      {
        type: 'info',
        variant: 'warning',
        title: 'Spectre Is Not Fully Mitigated Without Site Isolation',
        content:
          'CPU-level Spectre mitigations (microcode updates, retpoline) reduce risk but do not eliminate it. Site Isolation is the only complete defense for browsers because it ensures that sensitive cross-site data is never in the same address space as attacker-controlled JavaScript.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Cross-Origin Read Blocking (CORB)',
      },
      {
        type: 'text',
        content:
          'Site Isolation is complemented by Cross-Origin Read Blocking (CORB), which prevents the browser process from delivering certain cross-origin HTTP responses to a renderer that should not have access to them. CORB applies to responses with MIME types like HTML, XML, and JSON — if a cross-origin `<img>` or `<script>` tag requests an HTML page, the network service strips the response body before it reaches the renderer. This prevents an attacker from loading cross-origin data into a renderer process via resource tags.',
      },
      {
        type: 'code',
        language: 'text',
        code: `Cross-Origin Read Blocking (CORB) in action:

1. Attacker page at evil.com includes:
   <img src="https://bank.com/account/data">

2. Network Service fetches the response:
   Content-Type: text/html (sensitive data)

3. CORB detects: response is HTML, requester
   is cross-origin, request is for an image

4. CORB strips the response body before it
   reaches the evil.com renderer process

5. Renderer receives an empty response — the
   sensitive data never enters attacker's process`,
        caption: 'How CORB prevents cross-origin data from reaching unauthorized renderer processes',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Out-of-Process Iframes (OOPIFs)',
      },
      {
        type: 'text',
        content:
          'Site Isolation requires cross-origin iframes to run in a different process from the parent page. These are called Out-of-Process Iframes (OOPIFs). This is architecturally complex — the page\'s frame tree spans multiple processes, and operations like hit testing, scrolling, and focus management must coordinate across process boundaries. Blink uses proxy frames in the parent process to represent the OOPIF\'s position and size, while the actual content runs in the iframe\'s site process.',
      },
      {
        type: 'heading',
        level: 3,
        text: 'Performance and Memory Implications',
      },
      {
        type: 'text',
        content:
          'Site Isolation increases memory usage because more renderer processes are needed. Chrome reports a 10-13% increase in total memory usage for users with many open tabs. Each additional process carries overhead: its own V8 heap, Blink data structures, and system-level process metadata. Chrome mitigates this by consolidating same-site frames into one process and by limiting the total number of renderer processes on memory-constrained devices.',
      },
      {
        type: 'info',
        variant: 'tip',
        title: 'Checking Site Isolation Status',
        content:
          'Visit `chrome://process-internals` to see the full site-to-process mapping. Each row shows which site instance is assigned to which process. You can also use `chrome://flags/#site-isolation-trial-opt-out` to see isolation configuration.',
      },
    ],
  },
];
