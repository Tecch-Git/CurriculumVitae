# GitHub Copilot Skills

Skills are on-demand, structured workflow instructions bundled as a named package. When a skill is loaded, it gives the agent a complete, step-by-step methodology for a complex, repeatable task — together with any supporting assets like scripts, templates, or reference files.

Skills appear as slash commands in the Copilot Chat input (type `/` to browse them) and are loaded only when explicitly invoked or when the agent determines them to be relevant based on their description.

---

## Skills vs. Prompts vs. Instruction Files

| | Skills | Prompts | Instruction Files |
|---|---|---|---|
| **Entry point** | `SKILL.md` in a named folder | `*.prompt.md` | `*.instructions.md` |
| **Trigger** | `/` slash command or agent detection | `/` slash command, play button, `Chat: Run Prompt` | Auto (applyTo), on-demand (description), or manual |
| **Purpose** | Multi-step workflow with bundled assets | Single focused task with parameterized inputs | Always-on or contextual guidelines |
| **Assets** | Scripts, templates, reference files alongside `SKILL.md` | None (self-contained) | None (self-contained) |
| **Use for** | Complex repeatable workflows | One-off generation tasks | Coding standards, conventions |

**Rule of thumb:**
- Does it apply to most day-to-day work? → **Instruction file**
- Is it a single, focused generation task? → **Prompt**
- Is it a complex multi-step workflow with supporting files? → **Skill**

---

## Locations

| Path | Scope |
|------|-------|
| `.github/skills/<name>/SKILL.md` | Workspace |
| `.agents/skills/<name>/SKILL.md` | Workspace (alternative) |
| `<profile>/skills/<name>/SKILL.md` | User profile |

The folder name becomes the skill name (used in the slash command). The `SKILL.md` file is the entry point.

---

## `SKILL.md` Frontmatter

```yaml
---
name: "my-skill"                    # Must match the folder name
description: "Use when: ..."        # Keyword-rich, enables on-demand discovery — quote if it contains a colon
---
```

> **Important:** The `description` field is how the agent decides whether to load the skill. Use the `"Use when: ..."` pattern with specific keywords, just like instruction files. If the name does not match the folder name, the skill may silently fail to register.

---

## How to Invoke a Skill

### Via slash command in chat
1. Open Copilot Chat (sidebar or inline)
2. Type `/` — a dropdown appears listing all skills and prompts
3. Select the skill or type its name to filter
4. Optionally add arguments after the slash command

### Via agent detection
If the `description` is sufficiently keyword-rich, the agent may automatically load and follow the skill's workflow when it determines it to be relevant to the current task — even without an explicit `/` invocation.

### Via `Chat: Run Prompt...` command
Open the Command Palette (`Ctrl+Shift+P`) → `Chat: Run Prompt...` → select the skill.

---

## Anatomy of a Skill

A skill folder can contain:

```
.github/skills/astro-migration/
├── SKILL.md              ← Entry point (required)
├── migration-checklist.md ← Bundled reference asset
└── templates/
    └── base-layout.astro  ← Template the skill can reference
```

The `SKILL.md` can reference bundled assets using relative Markdown links:

```markdown
Use the migration checklist at [migration-checklist.md](./migration-checklist.md).
Apply the layout template from [templates/base-layout.astro](./templates/base-layout.astro).
```

---

## Creating a Custom Skill

### Step 1: Create the folder

```
.github/skills/<skill-name>/
```

The folder name defines the slash command: `/skill-name`.

### Step 2: Create `SKILL.md`

```markdown
---
name: "skill-name"
description: "Use when: <specific trigger conditions and keywords>"
---

# Skill Title

## Steps

1. First, do X
2. Then, do Y
3. Finally, verify Z

## Rules

- Always do A before B
- Never skip step 2
- Reference [template.astro](./template.astro) for the component structure
```

### Step 3: Add supporting assets (optional)

Place templates, checklists, or reference files in the same folder. Reference them from `SKILL.md` using relative links.

### Step 4: Validate

- Open Copilot Chat and type `/` — your skill should appear in the list
- The `name` field must exactly match the folder name
- YAML values containing colons must be quoted

---

## Built-in Copilot Skills (VS Code)

VS Code Copilot ships with several built-in skills that are available out of the box. Some notable ones:

| Skill | Description |
|-------|-------------|
| `agent-customization` | Create, update, and debug VS Code Copilot customization files (instructions, prompts, agents, skills). Includes templates and best practices. |
| Stack-trace debugging | Diagnose runtime errors from stack traces, identify root cause, suggest fixes |
| PR review | Structured pull request review workflow |
| Test generation | Generate comprehensive test suites with edge cases |

Invoke built-in skills with `/` in chat. Their `SKILL.md` files are located in the VS Code Copilot extension assets.

---

## Practical Examples for This Project

### Example: Astro Migration Skill

```markdown
---
name: "to-astro"
description: "Use when migrating HTML pages to Astro, converting vanilla JS to Astro components, or setting up the Astro project structure. Covers .astro syntax, layouts, routing, and TailwindCSS integration."
---

# Migrate HTML to Astro

## Steps

1. **Analyze the HTML file** — identify repeating elements (nav, footer) that should become layouts
2. **Create the Astro project** — run `npm create astro@latest` and select the blank template
3. **Install TailwindCSS** — `npx astro add tailwind`
4. **Create a base layout** — extract `<html>`, `<head>`, nav, and footer into `src/layouts/BaseLayout.astro`
5. **Convert each page** — create one `.astro` file per HTML page in `src/pages/`
6. **Migrate styles** — keep TailwindCSS utilities as-is; move custom CSS to `src/styles/global.css`
7. **Convert scripts** — move `<script>` blocks to the component's frontmatter or a `<script>` tag in `.astro`
8. **Verify** — run `npm run dev`, check all routes, check scroll animations and glass-card components

## Rules

- Preserve all existing Tailwind class names unchanged
- Keep the green accent `#22c55e` as a CSS custom property
- Do not introduce a UI framework (React, Vue) unless explicitly requested
```

---

### Example: Component Documentation Skill

```markdown
---
name: "document-component"
description: "Use when documenting a frontend component, Astro component, or Vue component. Generates JSDoc, prop tables, and usage examples."
---

# Document a Component

## Steps

1. Read the component file and identify all props, emits/events, and slots
2. Write a one-sentence summary at the top
3. Generate a props table: name | type | default | description
4. Write a usage example with realistic data
5. Note any accessibility considerations

## Output Format

\`\`\`markdown
## ComponentName

One-sentence description.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | — | Page heading |

### Usage

\`\`\`astro
<ComponentName title="Hello" />
\`\`\`
```

---

## Tips for Writing Effective Skills

- **Numbered steps beat prose.** An agent follows explicit ordered steps reliably. Avoid long paragraphs.
- **Include "Rules" or "Do not" sections.** Guardrails prevent the agent from taking unwanted shortcuts.
- **Reference assets, don't embed them.** Large templates belong in separate files linked from `SKILL.md`.
- **Test by invoking.** Open chat, type `/your-skill`, and verify the agent follows the workflow.
- **Keep descriptions short but precise.** The description must fit in limited token space and still be keyword-rich enough for discovery.

---

## Further Reading

- [VS Code Docs: Copilot Customization Overview](https://code.visualstudio.com/docs/copilot/customization/copilot-customization)
- [Model Context Protocol](https://modelcontextprotocol.io/)
