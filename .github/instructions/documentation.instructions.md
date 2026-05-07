---
description: "Use when writing, reviewing, or updating Markdown documentation, README files, Copilot instruction files, prompt files, skill files, or any documentation in the Docs/ folder. Covers structure, tone, formatting standards, and best practices for authoring Copilot customization files."
name: "Documentation Standards"
applyTo: '"Docs/**", "*.md", ".github/**/*.md", ".github/instructions/**", ".github/prompts/**", ".github/skills/**"'
---

# Documentation Standards

## General Principles

- Write in **English**, present tense, imperative or second-person tone ("use", "add", "run" / "you can").
- Be concise. Every sentence must add value. Omit filler phrases ("In this document, we will...").
- Write for the reader who skims first. Put the most important information first in each section.
- Do not duplicate content from authoritative external sources — link to them instead.

---

## Markdown Formatting

### Structure

- Use `#` for the document title (only one per file), `##` for top-level sections, `###` for subsections.
- Never skip heading levels (e.g., `##` directly to `####`).
- Use a blank line before and after each heading, code block, and table.

### Code Blocks

- Always specify the language tag on fenced code blocks:

  ````markdown
  ```typescript
  const x: string = "hello";
  ```
  ````

- Common tags: `typescript`, `javascript`, `astro`, `html`, `css`, `bash`, `powershell`, `json`, `yaml`, `markdown`, `sql`.
- Use inline code (single backticks) for file paths, commands, variable names, and property names.

### Tables

- Use tables for comparisons, option lists, and reference data.
- Always include a header row.
- Keep cell content short — link to details rather than embedding long text.

### Lists

- Use unordered lists (`-`) for non-sequential items.
- Use ordered lists (`1.`) for sequential steps.
- Keep list items parallel in grammatical structure.

---

## Copilot Instruction Files (`.instructions.md`)

When writing or reviewing instruction files:

- The `description` field is the **discovery surface** — the agent reads it to decide if the file is relevant. Use the "Use when: ..." pattern and include specific keyword-rich trigger phrases (framework names, task types, workflow names).
- Quote YAML values that contain colons: `description: "Use when: writing tests"` (not `description: Use when: writing tests`).
- One concern per file. Mixing unrelated concerns reduces relevance and pollutes the context window.
- Use `applyTo` for file-pattern-based auto-attachment. Use `description` only (no `applyTo`) for on-demand, task-based discovery.
- Include short code examples inside the instruction body. Show the preferred pattern, then the anti-pattern.
- Keep files focused. A well-scoped instruction file at 30 lines is better than a bloated one at 200 lines.

### Frontmatter template

```yaml
---
description: "Use when <specific trigger condition>. Covers <topic1>, <topic2>, and <topic3>."
name: "Descriptive Name"        # Optional: defaults to filename
applyTo: "path/pattern/**"      # Optional: omit for on-demand discovery
---
```

---

## Copilot Prompt Files (`.prompt.md`)

When writing prompt files:

- The `description` field drives slash-command discoverability — be specific.
- Include `agent: "agent"` in frontmatter for multi-step tasks that require file creation or terminal commands.
- List only the `tools` the prompt actually needs — avoid over-tooling.
- The prompt body should be explicit and structured. Use numbered lists for multi-step tasks.
- Parameterize with `$variable` placeholders where the prompt is meant to be reused.

### Frontmatter template

```yaml
---
name: "Prompt Display Name"
description: "Use when <specific task>"
agent: "agent"             # ask | agent | plan
tools: [workspace, createFile]
---
```

---

## Copilot Skill Files (`SKILL.md`)

When writing skill files:

- The folder name defines the slash command. Set `name:` in frontmatter to match exactly.
- Quote the `description` value (it usually contains colons).
- Structure the body with a numbered **Steps** section. The agent follows explicit steps reliably.
- Add a **Rules** section for guardrails (what NOT to do).
- Reference bundled assets with relative Markdown links — do not inline large templates.

### Frontmatter template

```yaml
---
name: "skill-folder-name"
description: "Use when: <specific workflow trigger>"
---
```

---

## Internal Links

- Use relative links to reference other files in the repository: `[see agents guide](./03-agents.md)`.
- For external resources: prefer the official documentation URL. Check the URL is still valid before adding it.
- Do not use absolute local file paths in documentation (`C:\git\...`).

---

## What NOT to Do

- Do not use `---` horizontal rules decoratively (they should be used sparingly for major section breaks in long docs).
- Do not indent code blocks with spaces — use fenced blocks (` ``` `) instead.
- Do not add "last updated" dates at the bottom of files (let Git history track that).
- Do not write `Note:`, `Important:`, or `Warning:` in plain text — use a blockquote (`>`) or a code comment for callouts.
- Do not mirror content from external docs (e.g., copying the entire TailwindCSS API reference) — link to it.
