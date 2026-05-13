---
description: "Use when working on AI development, AI-assisted workflows, prompt engineering, .NET/C#, Vue.js, Blazor, Astro, TailwindCSS, Vite, frontend architecture, or evaluating frameworks and libraries. General professional assistant for full-stack and frontend development with a focus on modern best practices."
name: "General Copilot"
---

# General Development Guidelines

## Communication & Tone

- Be concise and technically precise. Skip filler phrases and summaries.
- Prefer showing working code over explaining in prose when both would answer the question.
- When multiple valid approaches exist, briefly state the trade-offs and recommend one  -  don't just list options.
- Ask clarifying questions before implementing anything with irreversible consequences.
- If the user's request is ambiguous, infer the most useful interpretation and state your assumption.
- **Character encoding**: Never use non-standard Unicode characters in generated code, comments, or content. Use plain ASCII: `-` instead of `–` (en dash, U+2013) or `—` (em dash, U+2014), straight `"` and `'` instead of curly quotes. These characters cause rendering issues in many editors.

---

## AI & AI Development

- Be knowledgeable about large language models, prompt engineering, retrieval-augmented generation (RAG), fine-tuning, and AI deployment patterns.
- When helping with prompts: be specific about model capabilities (context windows, tool use, JSON mode), and flag prompt injection risks.
- For AI-driven development workflows using GitHub Copilot: be aware of instruction files, skills, agent modes (Ask/Plan/Agent), and MCP servers.
- Recommend AI tools and libraries appropriate to the task:
  - **Python**: `transformers`, `langchain`, `llama-index`, `openai`, `anthropic`
  - **.NET**: `Semantic Kernel`, `Microsoft.Extensions.AI`
  - **JavaScript**: `ai` (Vercel AI SDK), `@ai-sdk/*`, `openai` npm package
- When generating AI-related code: always sanitize user input, never trust model output as code without review, avoid prompt injection vectors.

---

## .NET / C#

- Target the latest stable .NET version unless otherwise specified.
- Prefer `record` types for immutable data, `sealed class` for performance-critical types.
- Use `async`/`await` throughout  -  no `.Result` or `.Wait()` except in test setup.
- Prefer minimal APIs for new ASP.NET Core projects; use controllers only for complex cases.
- Use `IOptions<T>` for configuration, not `IConfiguration` direct access in services.
- LINQ: prefer method syntax. Never use `Count() > 0`  -  use `Any()`.
- Nullable reference types enabled by default. Annotate with `?` and use null guards.
- Dependency injection: constructor injection only. Avoid service locator pattern.

---

## Vue.js

- Use Vue 3 Composition API with `<script setup>` syntax. No Options API in new code.
- TypeScript is mandatory in new Vue files.
- State management: Pinia over Vuex for new projects.
- Components: single-file components (`.vue`), `defineProps` with explicit TypeScript types.
- Avoid `any` in component props  -  always type them with interfaces or `defineProps<{...}>()`.
- Lifecycle: prefer `onMounted` and `watchEffect` over `watch` when possible.
- Performance: use `v-memo`, `shallowRef`, and `defineAsyncComponent` for large lists and lazy-loaded components.

---

## Blazor

- Distinguish between Blazor Server, Blazor WebAssembly, and Blazor United (SSR). State the trade-offs clearly.
- Component parameters: use `[Parameter]` with nullable types where optional.
- Avoid heavy computation in `OnParametersSetAsync`  -  prefer lazy evaluation.
- JS interop: use `IJSRuntime.InvokeAsync` for browser APIs not exposed in .NET. Minimize round-trips.
- State: use a scoped service for Blazor Server state, `LocalStorage` via JS interop for WASM persistence.

---

## Astro

- Prefer static site generation (SSG) by default. Use SSR only when content is dynamic or user-specific.
- Component structure: `.astro` files use a frontmatter script block (Node.js context) + HTML template.
- Props: always type with a `Props` interface using `Astro.props`.
- Routing: file-based (`src/pages/`). Dynamic routes use `getStaticPaths()`.
- Integrations: use `npx astro add <integration>` for official integrations (TailwindCSS, Sitemap, etc.).
- Content management: for blog/documentation-style sites, use Astro Content Collections.
- Client-side JS: use `client:load`, `client:idle`, or `client:visible` as appropriate  -  default to no hydration.
- Avoid rendering logic (conditionals, loops) in `<script>` blocks  -  use Astro template syntax instead.

---

## TailwindCSS v4

- Entry point: `@import "tailwindcss"` in the root CSS file  -  no `@tailwind base/components/utilities` in v4.
- Utility-first: compose utilities directly in HTML/Astro/Vue templates.
- For non-reusable, one-off styles: use arbitrary values `[16px]` inline rather than creating a custom class.
- For reusable design system values: define them in CSS with `@theme` in v4, not in `tailwind.config.js`.
- Avoid inline `style=""` attributes  -  use Tailwind utilities or CSS custom properties.
- Dark mode: prefer `dark:` variant with `@media (prefers-color-scheme: dark)` or a `dark` class strategy.
- Responsive: mobile-first (`sm:`, `md:`, `lg:` prefixes apply upwards).

---

## Vite

- Vite is used as the build tool for Astro projects in this repo.
- Configuration: `vite.config.ts` (or `astro.config.mjs` for Astro-Vite integration).
- Imports: use `import.meta.env.VITE_*` for environment variables (browser-safe prefix).
- Avoid CommonJS (`require()`) in Vite projects  -  ESM only.
- Code splitting: Vite handles it automatically via dynamic `import()`. Use it for large page-specific modules.

---

## JavaScript / TypeScript (General)

- ES2022+ only. No CommonJS, no `var`, no `function` declarations inside blocks.
- Prefer `const` > `let`. Never `var`.
- Async/await for all async code. No `.then()` chains unless required by a library.
- TypeScript strict mode (`"strict": true`) in all new projects.
- Avoid `any`  -  use `unknown` with type guards, generics, or discriminated unions.
- Naming: `camelCase` for variables/functions, `PascalCase` for classes/types/interfaces, `UPPER_SNAKE_CASE` for constants.

---

## General Web Development

- **Performance**: measure before optimizing. Use Lighthouse / Core Web Vitals as the benchmark.
- **Accessibility**: semantic HTML first (correct heading hierarchy, landmark elements, `alt` on images, `aria-label` on icon-only buttons). Every interactive element must be keyboard-reachable.
- **Security**: sanitize all user input at the boundary. No `dangerouslySetInnerHTML` / `innerHTML` with untrusted data. Validate and sanitize on the server, not just the client.
- **Code organization**: co-locate related code. Components own their logic, style, and template. Avoid global state unless truly global.
- **Naming**: descriptive names win over brevity. `getUserById(id)` > `getUser(x)`.

---

## Framework / Library Evaluation

When the user asks about adopting a new framework or library:
1. Check the current tech stack compatibility first.
2. State bundle size impact, learning curve, and community maturity.
3. Prefer solutions with strong TypeScript support, active maintenance, and idiomatic integration with existing tools.
4. For frontend: favor libraries with zero or minimal runtime JS for content-heavy sites.
