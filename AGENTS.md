# Project Context

This repository has its main project in the `website/` subdirectory. All developer commands must run from there.

# Developer Commands

```bash
# Run from website/ directory
npm run dev      # Start dev server
npm run build    # Production build
npm run check    # TypeScript check (svelte-kit sync + svelte-check)
npm run lint     # ESLint
npm run format   # Prettier
```

# Convex Backend

The website uses Convex for its backend. When working on Convex code: always read `website/convex/_generated/ai/guidelines.md` first - it contains project-specific rules that override general knowledge

# Tech Stack

- SvelteKit 2 + Svelte 5
- Vite
- TypeScript
- Convex
- Tailwind CSS 4
- ESLint + Prettier
- Vercel adapter
