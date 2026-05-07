# GitHub Copilot Agent Modes: Ask, Plan, Agent

VS Code Copilot exposes three distinct operating modes in the chat interface. Each mode has a different level of autonomy, tool access, and appropriate use case. Choosing the right mode is one of the most impactful decisions you make when working with Copilot.

---

## Overview

| Mode | Autonomy | File Access | Terminal | Best for |
|------|----------|-------------|----------|---------|
| **Ask** | Read-only | Read | No | Q&A, research, understanding code |
| **Plan** | Planning only | Read | No | Breaking down complex tasks, getting a checklist |
| **Agent** | Full execution | Read + Write | Yes | Implementing features, refactoring, multi-file changes |

---

## Ask Mode

**Ask** is a read-only research assistant. It has access to your workspace (files, symbols, search) but cannot write files or run commands. Use it to understand your codebase, get explanations, review options, or answer questions.

### When to use Ask

- "What does this function do?"
- "Where is the authentication logic handled?"
- "What's the difference between `getStaticPaths` and `getStaticProps` in Astro?"
- "Review this code and tell me what could go wrong."
- Researching a technology before committing to it

### What Ask can do

- Read any file in your workspace
- Search your codebase (`#codebase`)
- Reference symbols across files
- Explain concepts, patterns, and architecture
- Suggest approaches *without* implementing them

### What Ask cannot do

- Create, edit, or delete files
- Run terminal commands
- Call MCP tools that modify state

### Tips for Ask

- Include `#file:path/to/file.ts` to scope the question to a specific file
- Use `#codebase` to ask broad questions about the whole project
- Ask for a comparison or trade-off analysis before starting implementation

---

## Plan Mode

**Plan** produces a structured, step-by-step implementation plan without executing it. It reads your codebase, reasons about the task, and returns an explicit checklist of what needs to be done. You review and adjust the plan before any code is written.

### When to use Plan

- Before implementing a non-trivial feature
- Before a large refactoring (e.g., migrating HTML → Astro)
- When you want to understand the full scope of a task before committing
- When you're collaborating and need a plan to share or review

### What Plan produces

A structured response with:
- A summary of what will be done
- A numbered checklist of specific, actionable steps
- Identified risks or alternatives
- File paths that will be affected

### Recommended workflow: Plan → Review → Agent

This is the single most effective workflow improvement for using Copilot on complex tasks:

```
1. Switch to Plan mode
2. Describe the full task
3. Review the plan — check for missing steps, wrong assumptions, scope creep
4. Adjust the plan in the chat if needed ("also update the layout file", "skip step 3")
5. Switch to Agent mode
6. Paste or reference the plan ("implement the plan above")
7. Agent executes step by step
```

This prevents the agent from making incorrect assumptions or going in the wrong direction on large tasks.

### Example: Planning an Astro migration

**You (Plan mode):**
> Migrate the current `Web/public/index.html` portfolio site to an Astro project. Keep TailwindCSS v4, the existing design system (glass-card, green accent #22c55e), and all current sections.

**Copilot Plan output (example):**
```
## Migration Plan: index.html → Astro

Steps:
1. Scaffold Astro project at `AstroSite/` with blank template (`npm create astro@latest`)
2. Install TailwindCSS v4 via Astro integration (`npx astro add tailwind`)
3. Copy `Web/src/input.css` to `AstroSite/src/styles/global.css` — keep all custom utilities
4. Create `src/layouts/BaseLayout.astro` with <html>, <head>, nav, and footer extracted from index.html
5. Create `src/pages/index.astro` — import BaseLayout, migrate each section as Astro markup
6. Migrate Hero, Profile, Werdegang, Projekte, Kontakt as sub-components in `src/components/`
7. Migrate scroll-reveal JS to a client-side <script> block in BaseLayout.astro
8. Verify with `npm run dev` — check all anchor links, glass-card rendering, animations
9. Build with `npm run build` and verify output

Risks:
- Scroll-reveal `IntersectionObserver` script must run in the browser — use `is:inline` or a separate `.ts` file
- Font Awesome CDN link must be preserved in <head>
```

---

## Agent Mode

**Agent** is the fully autonomous execution mode. It can read and write files, run terminal commands, call MCP tools, and chain multiple tool calls to complete a task end-to-end. This is the mode to use when you're ready to implement.

### When to use Agent

- Implementing a feature from a plan
- Making coordinated changes across multiple files
- Running build, lint, or test commands as part of the workflow
- Setting up project scaffolding (creating folder structures, config files)
- Applying consistent refactors across the entire codebase

### What Agent can do

- Read and write any file in your workspace
- Execute terminal commands (`npm install`, `git status`, etc.)
- Call MCP server tools (browser, GitHub, search, filesystem)
- Chain tool calls — read a file, modify it, run tests, fix errors, commit
- Reference context from previous turns in the conversation

### What Agent cannot do (without your approval)

- Push to remote Git repositories
- Delete files without showing what it's deleting
- Make irreversible destructive changes without confirmation

### Tips for Agent mode

- **Always start with Plan.** For tasks with more than 3 steps, use Plan first. Agent works best with a clear mandate.
- **Keep the task focused.** "Implement step 1 of the plan" is better than "implement everything at once" for large tasks.
- **Iterate in the same chat.** The agent keeps context from previous turns. Say "that looks wrong, go back and fix the BaseLayout" — it understands the context.
- **Watch the tools panel.** VS Code shows every file it reads, writes, and every command it runs. Review these before accepting.
- **Use `#file:` references.** Anchor the agent to specific files to prevent it from wandering.

---

## Mode Comparison by Task Type

| Task | Best Mode |
|------|-----------|
| "How does the scroll animation work?" | Ask |
| "What's the best approach to migrate to Astro?" | Ask or Plan |
| "Create a detailed plan for the Astro migration" | **Plan** |
| "Implement the plan for the Astro migration" | **Agent** |
| "Refactor all HTML sections into Astro components" | **Agent** |
| "Add a new Projects section to index.html" | Agent |
| "Review the current index.html for accessibility issues" | Ask |
| "Which TailwindCSS v4 features should I use for dark mode?" | Ask |
| "Set up TailwindCSS v4 in the new Astro project" | **Agent** |
| "Write tests for the contact form" | Agent (after Plan) |

---

## Switching Between Modes

In VS Code Copilot Chat, the mode selector is in the chat input dropdown (bottom of the chat panel). You can switch modes mid-conversation — the conversation history is preserved.

**Recommended session pattern for a major feature:**

```
1. [Ask]   Research: "What does the current codebase look like?"
2. [Plan]  Plan:     "Create a plan for feature X"
3. [Ask]   Review:   "Are there any risks with step 3?"
4. [Agent] Implement: "Implement the plan"
5. [Ask]   Verify:   "Does the output match the original design?"
```

---

## Further Reading

- [VS Code Docs: Copilot Chat Modes](https://code.visualstudio.com/docs/copilot/chat/chat-modes)
- [VS Code Docs: Agent Mode](https://code.visualstudio.com/docs/copilot/chat/agent-mode)
