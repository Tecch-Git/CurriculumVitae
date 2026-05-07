---
name: "Setup Copilot Docs & Instructions"
description: "Use when setting up or regenerating GitHub Copilot documentation and instruction files for this project. Generates structured docs on instruction files, skills, agents, and MCP servers, plus ready-to-use .instructions.md files for this project."
agent: "agent"
tools: [workspace, createFile]
---

# Setup Copilot Documentation & Instruction Files

You are setting up the GitHub Copilot documentation and instruction files for this project from scratch. Generate all files listed below with complete, production-quality content.

## Project Context

**Owner:** Mathias Puchberger, Software Engineer (.NET & Web)
**Project:** Personal CV & Portfolio website
**Repository:** `c:\git\Curriculum Vitae`

**Current Stack:**
- HTML5, Vanilla JavaScript (ES2022+)
- TailwindCSS v4 (`@tailwindcss/cli`, no bundler yet)
- Custom CSS utilities: `.glass-card`, `.text-accent` (#22c55e green), `.reveal` (scroll animation), `.code-font`
- Dark theme, green accent color `#22c55e`

**Migration Target:** Astro + TailwindCSS v4 + Vite

**Broader Tech Experience:**
- .NET C#, MS SQL, SPS/PLC interfaces
- Vue.js, Blazor
- AI, machine learning, AI-driven software development workflows
- GitHub Copilot advanced usage (instructions, skills, agents, MCP)

**Interests:**
- Using AI to accelerate software development
- Beautiful, accessible, performant frontends
- Modern framework evaluation (Astro, SvelteKit, Qwik, etc.)

---

## Documentation Files to Create (`Docs/Copilot/`)

These files build on the existing `Docs/Copilot/Kontextbereitstellung.md`. Do NOT overwrite that file.

### `Docs/Copilot/01-instruction-files.md`
Complete guide to GitHub Copilot instruction files. Cover:
- What instruction files are and when to use them
- File locations: `.github/instructions/*.instructions.md` (workspace) vs user profile
- Full frontmatter reference: `description`, `applyTo`, `name`
- Discovery modes: on-demand (description-based), explicit (applyTo glob), manual (Add Context)
- Core principles: keyword-rich descriptions, one concern per file, concise and actionable
- Common anti-patterns to avoid
- Multiple concrete examples with frontmatter and body content
- How they differ from workspace instructions (`copilot-instructions.md`) and prompts

### `Docs/Copilot/02-skills.md`
Complete guide to Copilot skills. Cover:
- What skills are: on-demand structured multi-step workflows with bundled assets
- Entry point: `SKILL.md` with YAML frontmatter
- Locations: `.github/skills/<name>/`, `.agents/skills/<name>/`
- How to invoke: `/` in Copilot chat
- Difference from prompts (single task) and instruction files (always-on guidelines)
- How to create a custom skill for this project
- Built-in skills available in VS Code Copilot
- Practical examples relevant to frontend development and Astro migration

### `Docs/Copilot/03-agents.md`
Complete guide to the three built-in Copilot agent modes. Cover:
- **Ask mode**: Read-only research, Q&A, codebase questions. No file changes.
- **Plan mode**: Structured planning for complex tasks. Returns a checklist/plan. Use before implementing.
- **Agent mode**: Fully autonomous execution — reads/writes files, runs terminal commands, chains tool calls.
- The recommended workflow: always start with **Plan** to break down the task, review the plan, then switch to **Agent** to implement.
- When NOT to use Agent mode directly
- Practical examples: using Plan for Astro migration planning, Agent for implementation
- Tips for steering the agent with follow-up messages

### `Docs/Copilot/04-mcp-servers.md`
Complete guide to MCP (Model Context Protocol) servers in VS Code Copilot. Cover:
- What MCP is and how it extends Copilot with external tools and data sources
- Built-in / out-of-the-box MCP servers available in VS Code Copilot
- How to configure MCP servers in VS Code `settings.json` (mcp.servers)
- Recommended MCP servers for this user's needs:
  - `@playwright/mcp` — browser automation, UI testing, screenshot capture
  - GitHub MCP (`@modelcontextprotocol/server-github`) — issues, PRs, repos, commits
  - `mcp-server-fetch` / `@modelcontextprotocol/server-fetch` — fetch web content, read docs
  - `@modelcontextprotocol/server-brave-search` — web search during development
  - `@modelcontextprotocol/server-filesystem` — advanced file operations
- Security considerations when using MCP servers
- Example `settings.json` configuration snippet

---

## Instruction Files to Create (`.github/instructions/`)

### `.github/instructions/general-copilot.instructions.md`
**No `applyTo`** (on-demand, triggered by description keywords).

A general-purpose instruction file that makes Copilot a professional, highly capable assistant across all areas relevant to this developer. Cover:
- Tone & precision: concise, technically accurate, no filler
- AI & AI development: LLMs, prompt engineering, AI-assisted coding workflows, GitHub Copilot advanced usage
- .NET / C#: modern C# patterns, async/await, LINQ, minimal APIs, best practices
- Vue.js: Composition API, TypeScript, Pinia, performant components
- Blazor: component model, SSR vs WASM trade-offs
- Web development: performance, accessibility, Core Web Vitals
- Frontend tooling: Vite, Astro, TailwindCSS v4
- Code generation: prefer modern syntax (ES2022+), explicit types, no magic strings
- Always suggest the simplest solution first; avoid over-engineering

### `.github/instructions/documentation.instructions.md`
**`applyTo`:** `["Docs/**", "*.md", ".github/**/*.md"]`

Standards for writing and maintaining documentation in this project. Cover:
- Write clear, concise technical documentation in English
- Markdown standards: proper heading hierarchy, fenced code blocks with language tags, tables for comparisons
- Always include practical examples
- When documenting Copilot primitives (instructions, prompts, skills): follow the "Use when..." description pattern, always show frontmatter examples
- Keep docs DRY — link to authoritative sources rather than duplicating them
- YAML frontmatter in instruction/prompt files must be valid: quote strings containing colons

### `.github/instructions/frontend.instructions.md`
**`applyTo`:** `["Web/**", "**/*.html", "**/*.js", "**/*.astro", "**/*.css"]`

Frontend development standards for this specific project. Cover:
- **HTML**: semantic elements, accessibility (ARIA, keyboard nav), no `div`-soup
- **TailwindCSS v4**: utility-first, `@import "tailwindcss"` entry point, use existing custom utilities (`.glass-card`, `.text-accent`, `.bg-accent`, `.border-accent`, `.reveal`, `.code-font`)
- **Vanilla JS**: ES2022+ only (no jQuery, no CommonJS require), prefer `const`/`let`, use `querySelectorAll` + `forEach`, async/await for fetches
- **Astro** (migration target): `.astro` component syntax, frontmatter script block, Astro layouts, file-based routing, prefer SSG, integrate TailwindCSS via Vite plugin
- **CSS**: mobile-first, CSS custom properties for theming, no inline styles
- **Performance**: lazy-load images, minimal runtime JS, avoid layout thrash
- **Design system**: dark background, green accent `#22c55e`, Inter font, Fira Code for code snippets, frosted glass cards
- **Migration guidance**: when converting HTML pages to Astro, extract repeating headers/footers into layouts, convert sections into components
