# GitHub Copilot Instruction Files

Instruction files are Markdown files that provide targeted guidelines to GitHub Copilot. They are loaded either automatically (when files matching a pattern are in context) or on-demand (when the agent determines them to be relevant). Unlike workspace-level instructions that always apply, instruction files are scoped — they activate only when relevant.

---

## Locations

| Scope | Path | When to use |
|-------|------|-------------|
| **Workspace** | `.github/instructions/*.instructions.md` | Project-specific, shared with the team via version control |
| **User profile** | `<AppData>/Roaming/Code/User/prompts/*.instructions.md` | Personal preferences, apply across all workspaces |

File names must end in `.instructions.md`.

---

## Frontmatter Reference

Instruction files use YAML frontmatter between `---` markers at the top of the file.

```yaml
---
description: "Use when writing or reviewing database migrations. Covers safety checks, rollback patterns, and naming conventions."
name: "Database Migrations"        # Optional: defaults to filename
applyTo: "migrations/**/*.sql"     # Optional: auto-attach for matching files
---
```

### `description` (recommended)
The primary discovery surface. The agent reads this field to decide whether to load the instruction file. Write it as a "Use when..." statement with specific, keyword-rich trigger phrases. If the description does not contain relevant keywords, the agent will not find it.

```yaml
# Good — specific, keyword-rich
description: "Use when writing Astro components, pages, or layouts. Covers .astro file syntax, frontmatter scripts, SSG/SSR, and TailwindCSS integration."

# Bad — vague, not discoverable
description: "Frontend tips"
```

### `applyTo` (optional)
A glob pattern (or array of patterns) that causes the instruction to be **automatically attached** whenever a matching file is in the active context. Applied on file creation or modification, not on read-only operations.

```yaml
# Single pattern
applyTo: "**/*.ts"

# Multiple patterns (OR)
applyTo: ["src/**", "lib/**"]

# Always included (use sparingly)
applyTo: "**"
```

### `name` (optional)
Overrides the display name. Defaults to the filename without the `.instructions.md` suffix.

---

## Discovery Modes

| Mode | How it triggers | Best for |
|------|----------------|----------|
| **On-demand** | Agent reads `description` and decides relevance | Task-based: migrations, API design, code reviews |
| **Explicit** (`applyTo`) | File matching the glob is in context | File-based: language standards, framework rules per folder |
| **Manual** | User clicks "Add Context" → "Instructions" | Ad-hoc, one-off attachment |

You can combine both modes in one file — include both `description` and `applyTo`:

```yaml
---
description: "Use when working with Astro components or migrating HTML to Astro."
applyTo: ["**/*.astro", "src/components/**"]
---
```

---

## Workspace Instructions vs. Instruction Files

| | Workspace Instructions | Instruction Files |
|---|---|---|
| **File** | `.github/copilot-instructions.md` | `.github/instructions/*.instructions.md` |
| **Always active** | Yes | No (on-demand or pattern-matched) |
| **Scope** | Entire repository | Specific tasks or file types |
| **Use for** | Global coding standards | Contextual, specialized guidelines |

Put high-level, always-relevant rules in `.github/copilot-instructions.md`. Put specialized, contextual rules in instruction files.

---

## Core Principles

1. **Keyword-rich descriptions.** The `description` field is how the agent discovers your file. Include the frameworks, task types, and workflow names that a developer would use when asking Copilot for help.

2. **One concern per file.** Separate files for testing, API design, CSS conventions, documentation standards, etc. Mixing concerns dilutes relevance.

3. **Concise and actionable.** Every sentence should help the agent produce better output. Avoid repeating documentation; link to it instead.

4. **Show, don't tell.** A short code example is worth more than two paragraphs of prose.

5. **Share the context window.** Instruction files compete for context space with your code, conversation history, and other context. Keep them focused.

---

## Anti-Patterns

| Anti-pattern | Problem | Fix |
|---|---|---|
| `description: "Helpful tips"` | Not discoverable | Use "Use when..." with specific keywords |
| `applyTo: "**"` with specialized content | Wastes context on unrelated tasks | Narrow the glob to relevant paths |
| Duplicating README or docs | Stale, bloated | Link with `[see README](../../README.md)` |
| Testing + styling + API in one file | Hard to discover, large context | Split into separate files |
| Unquoted colons in YAML values | Silent parse failure | Quote values: `description: "Use when: ..."` |

---

## Examples

### Example 1 — On-demand, general (no `applyTo`)

```markdown
---
description: "Use when designing REST APIs, writing controllers, or working with HTTP endpoints. Covers naming conventions, status codes, error response shapes, and versioning."
name: "REST API Design"
---

## REST API Guidelines

- Use plural nouns for resource paths: `/users`, `/projects`
- Return `201 Created` with a `Location` header on successful POST
- Error responses always include `{ "error": { "code": string, "message": string } }`
- Version APIs via URL prefix: `/api/v1/`
- Never expose internal IDs — use UUIDs or slugs in URLs

\`\`\`typescript
// Good
GET /api/v1/users/:id

// Bad
GET /api/getUserById?userId=42
\`\`\`
```

---

### Example 2 — File-pattern based (`applyTo`)

```markdown
---
description: "Use when writing or reviewing TypeScript files. Strict mode rules, naming conventions, and import standards."
applyTo: "**/*.ts"
---

## TypeScript Standards

- Always enable `strict: true` in `tsconfig.json`
- Prefer `interface` over `type` for object shapes
- No `any` — use `unknown` and narrow with type guards
- Named exports preferred over default exports
- Import order: built-ins → external packages → internal modules
```

---

### Example 3 — Multi-pattern, mixed mode

```markdown
---
description: "Use when writing Astro pages, components, or layouts. Covers .astro syntax, frontmatter, SSG/SSR, and Vite integration."
applyTo: ["**/*.astro", "src/pages/**", "src/layouts/**", "src/components/**"]
---

## Astro Development Rules

- Frontmatter script block runs at build time (Node.js context) — no browser APIs
- Use `Astro.props` to type component props with TypeScript interfaces
- Prefer `getStaticPaths()` + `params` for dynamic routes in SSG mode
- Import TailwindCSS in the root layout only: `import '../styles/global.css'`
- Co-locate component styles using `<style>` blocks or Tailwind utilities — no separate CSS files per component

\`\`\`astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = '' } = Astro.props;
---
<h1>{title}</h1>
```

---

### Example 4 — Documentation standards

```markdown
---
description: "Use when writing or reviewing Markdown documentation, README files, or in-code comments. Covers structure, tone, and formatting standards."
applyTo: ["Docs/**", "*.md"]
---

## Documentation Standards

- Headings: use `#` for title, `##` for sections, `###` for subsections — never skip levels
- Code blocks: always specify the language tag (\`\`\`typescript, \`\`\`bash, etc.)
- Tables: use for comparisons; always include a header row
- Tone: technical, concise, second-person ("you") or imperative ("use", "add", "run")
- Do NOT duplicate content from authoritative sources — link to them
```

---

## File-Level Instructions vs. User-Level Instructions

Instructions in `.github/instructions/` are committed to the repository and shared with all collaborators. Instructions in your user profile (`AppData/Roaming/Code/User/prompts/`) are personal and roam across machines via Settings Sync, but are not shared.

Use repository instructions for project conventions. Use profile instructions for personal workflow preferences (e.g., "always explain your reasoning", "prefer shorter variable names").

---

## Further Reading

- [VS Code Docs: Custom Instructions](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [VS Code Docs: Copilot Customization Overview](https://code.visualstudio.com/docs/copilot/customization/copilot-customization)
