---
description: "Use when writing or modifying HTML pages, JavaScript files, Astro components, CSS files, or TailwindCSS styles. Covers HTML semantics, TailwindCSS v4 patterns, vanilla JS (ES2022+), Astro component syntax, CSS conventions, performance, accessibility, and migration from HTML/vanilla to Astro."
name: "Frontend Development"
applyTo: '"Web/**", "AstroSite/**", "**/*.html", "**/*.js", "**/*.ts", "**/*.astro", "**/*.css"'
---

# Frontend Development Standards

## Design System (Project-Specific)

This project uses a fixed design system. Preserve it in all new or modified code:

- **Color scheme**: dark background (`#0a0a0a` / `bg-black`), green accent `#22c55e`
- **Custom utilities** (defined in `input.css`):
  - `.text-accent`, `.bg-accent`, `.border-accent` → green `#22c55e`
  - `.glass-card` → frosted glass card with `backdrop-blur`, dark bg, green border on hover
  - `.reveal` → scroll-triggered reveal animation (opacity + translateY, driven by `IntersectionObserver`)
  - `.code-font` → Fira Code monospace
- **Fonts**: Inter (body), Fira Code (code/monospace)  -  loaded via Google Fonts
- **Icons**: Font Awesome (CDN link in `<head>`)
- **Spacing/sizing**: use Tailwind utilities, not arbitrary pixel values, unless unavoidable

---

## HTML Standards

- Use **semantic elements**: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<aside>`.
- Never use `<div>` or `<span>` where a semantic element applies.
- Heading hierarchy must be logical: one `<h1>` per page, then `<h2>`, `<h3>` in order.
- Every `<img>` must have a meaningful `alt` attribute. Use `alt=""` for decorative images.
- Interactive elements must be natively interactive (`<button>`, `<a href>`)  -  avoid `<div onclick>`.
- Use `lang` attribute on `<html>`: `lang="de"` for German-language content.
- Forms: always associate `<label>` with `<input>` via `for`/`id` or nesting.

---

## TailwindCSS v4

- Entry point: `@import "tailwindcss"` in `src/input.css`  -  no `@tailwind base/components/utilities` directives.
- Compose styles directly in markup using utility classes. Avoid custom CSS classes for one-off styles.
- Use `@layer components { }` in `input.css` only for design system patterns that repeat across many elements.
- Color tokens: prefer `.text-accent` / `.bg-accent` over `text-green-500` to stay consistent with the design system.
- Responsive: **mobile-first**  -  base styles are for small screens, `sm:`, `md:`, `lg:` apply upward.
- Dark mode: classes are applied against the dark background by default. Use `dark:` prefix only if implementing a theme toggle.
- Do not use `@apply` for dynamic or component-level styles  -  compose utilities in the template.
- Arbitrary values (`w-[42px]`) are acceptable for values not in the default scale but should be rare.

---

## Vanilla JavaScript (Current Stack)

- **ES2022+ only**. No `var`, no `function` declarations in blocks, no CommonJS (`require`).
- Use `const` by default, `let` only when reassignment is needed.
- DOM selection: `document.querySelector()` / `document.querySelectorAll()` + `forEach()`.
- Event handling: `addEventListener` only  -  no inline `onclick=""` attributes in HTML.
- Async: `async`/`await` for all async code. Wrap `fetch` calls in try/catch.
- Do not manipulate the DOM heavily before `DOMContentLoaded`  -  use `defer` on script tags or wrap in the event.
- The scroll-reveal animation uses `IntersectionObserver` on `.reveal` elements  -  do not break this pattern when adding new sections.

```javascript
// Good
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// Bad
var els = document.getElementsByClassName('reveal');
for (var i = 0; i < els.length; i++) { ... }
```

---

## Astro (Migration Target)

When creating new pages or migrating existing HTML to Astro:

### Project Structure

```
AstroSite/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      ← <html>, <head>, nav, footer
│   ├── pages/
│   │   └── index.astro           ← one file per route
│   ├── components/
│   │   └── GlassCard.astro       ← reusable UI components
│   └── styles/
│       └── global.css            ← @import "tailwindcss" + custom utilities
├── public/                       ← static assets (fonts, images)
└── astro.config.mjs
```

### Component Rules

- Frontmatter script block runs at **build time** (Node.js)  -  no `window`, `document`, or browser APIs here.
- Always type component props with a `Props` interface:

  ```astro
  ---
  interface Props {
    title: string;
    badge?: string;
  }
  const { title, badge } = Astro.props;
  ---
  <div class="glass-card">
    <h2>{title}</h2>
    {badge && <span class="text-accent">{badge}</span>}
  </div>
  ```

- Client-side JavaScript goes in a `<script>` tag at the bottom of the `.astro` file. For the `IntersectionObserver` scroll reveal, use `is:inline` to avoid Vite module scoping issues with `querySelectorAll`.
- Use `client:visible` or `client:idle` for interactive component hydration  -  default to no hydration.

### TailwindCSS Integration with Astro

```bash
npx astro add tailwind
```

Import global styles once in the base layout:

```astro
---
import '../styles/global.css';
---
```

Do NOT import `global.css` in individual pages  -  only in the root layout.

### Migrating from HTML to Astro

1. Identify repeating structure (nav, footer, `<head>`) → extract to `src/layouts/BaseLayout.astro`
2. Each `index.html`, `about.html` etc. → corresponding `src/pages/index.astro`
3. Repeated UI patterns (cards, badges, tech stack list) → `src/components/*.astro`
4. Keep all Tailwind class names unchanged  -  they work identically in Astro
5. Convert `<script>` blocks: if they query `.reveal` or other global selectors, move to BaseLayout and use `is:inline`
6. Images: move to `public/` and reference as `/image.jpg` (absolute from `public/`)

---

## CSS Conventions

- Mobile-first: write base styles for mobile, augment with breakpoints.
- CSS custom properties for theme values: `--color-accent: #22c55e`.
- No inline `style` attributes in HTML unless dynamically set via JavaScript.
- Prefer TailwindCSS utilities. Write raw CSS only for:
  - Design system tokens (`@theme` block or CSS custom properties)
  - Keyframe animations
  - Complex selectors that Tailwind can't express

---

## Performance

- **Images**: use `width` and `height` attributes to prevent layout shift. Use `loading="lazy"` for below-the-fold images.
- **Scripts**: always use `defer` or `type="module"` on `<script>` tags. Never block rendering.
- **Fonts**: preconnect to Google Fonts: `<link rel="preconnect" href="https://fonts.googleapis.com">`.
- **Tailwind**: TailwindCSS v4 purges unused styles automatically  -  do not manually remove classes you might need.
- **Astro**: SSG pages have zero runtime JS by default. Keep it that way unless client interactivity is needed.

---

## Accessibility

- Color contrast: green `#22c55e` on dark `#0a0a0a` must pass WCAG AA (4.5:1 for normal text).
- Icon-only buttons and links must have `aria-label`: `<button aria-label="Open menu"><i class="fas fa-bars"></i></button>`.
- `<a>` links must have meaningful text. Avoid "click here" or "read more" as link text.
- Keyboard navigation: all interactive elements must be reachable via `Tab`, activated via `Enter`/`Space`.
- `scroll-behavior: smooth` is already set on `<html>`  -  do not remove it.
- Use `prefers-reduced-motion` to disable animations for users who prefer it:

  ```css
  @media (prefers-reduced-motion: reduce) {
    .reveal { transition: none; transform: none; opacity: 1; }
  }
  ```
