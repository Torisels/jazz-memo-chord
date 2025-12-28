# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**jazz-memo-chord** is a web application for musicians to learn and practice jazz chord theory through interactive exercises. Users can practice chord recognition using visual (sheet notation) and auditory (listening) methods, exploring various voicings, dictation exercises, chord scales, and substitutions.

**Tech Stack:**
- Astro 5 (Server rendering)
- React 19 (Interactive islands)
- TypeScript 5
- Tailwind CSS 4
- Shadcn/ui (New York style)
- Supabase (PostgreSQL + Auth)
- Zod (Validation)

## Common Commands

```bash
# Development
bun run dev          # Start dev server (port 3000)
bun run build        # Build for production
bun run preview      # Preview production build

# Code quality
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues
bun run format       # Format code with Prettier
bun run check        # Run Astro type checking
```

## Project Structure

The codebase follows a strict directory organization:

- `./src/` - Source code root
  - `pages/` - Astro routes (`.astro` files)
  - `pages/api/` - Server endpoints
  - `layouts/` - Astro layouts
  - `middleware/index.ts` - Request/response middleware
  - `components/` - UI components (Astro static / React interactive)
  - `components/ui/` - Shadcn/ui components
  - `lib/` - Services and utilities
  - `lib/services/` - Business logic and external integrations
  - `lib/utils.ts` - Helper functions
  - `db/` - Supabase client and generated types
  - `types.ts` - Shared types and entities
  - `assets/` - Internal static assets
- `./public/` - Public static assets
- `./supabase/migrations/` - Database migrations (UTC timestamp naming: `YYYYMMDDHHmmss_description.sql`)

## Architecture & Key Patterns

### Astro Integration
- **Server-first rendering:** Prefer server-side data fetching in `.astro` files
- **Hybrid rendering:** Use `export const prerender = false` for dynamic API routes
- **Interactivity:** Only use React (`.tsx`) for interactive components; use `client:load` or `client:visible` directives sparingly
- **View Transitions:** Leverage the View Transitions API via ClientRouter for smooth page navigation
- **Endpoints:** Use uppercase `POST`, `GET` for handler names; validate inputs with Zod

### Backend & Database
- **Supabase client:** Access via `context.locals.supabase` in Astro routes (injected via middleware); avoid direct imports when possible
- **Database types:** Use the `Database` type from `src/db/database.types.ts`
- **Row-Level Security (RLS):** Mandatory for every table; create granular policies per role and action
- **API routes:** Use Zod schemas for input validation and error handling with proper status codes

### React Components
- **No Next.js directives:** Never use `"use client"` (Astro handles hydration)
- **Functional components:** Use hooks; extract complex logic into `src/components/hooks/`
- **Performance:** Apply `React.memo()`, `useCallback()`, `useMemo()` for expensive renders; use new hooks like `useOptimistic` and `useTransition`
- **Type safety:** Ensure all props are typed; avoid `any`

### Styling
- **Tailwind 4:** Use `@layer` for organization, `theme()` function for design tokens, responsive variants (`sm:`, `md:`, etc.), and state variants (`hover:`, `focus-visible:`, etc.)
- **Shadcn UI:** Components live in `src/components/ui/`; install with `bunx shadcn@latest add [name]`
- **Dark mode:** Implement using Tailwind's `dark:` variant
- **Accessibility:** Strictly follow ARIA best practices—use landmarks, semantic roles, proper labels, and aria attributes

## Clean Code Practices

- **Error handling:** Handle errors and edge cases at function start with guard clauses and early returns
- **Happy path:** Place the main logic at the end; avoid deeply nested conditionals
- **Logging:** Implement proper error logging and user-friendly messages
- **Consistency:** Follow Prettier and ESLint configurations; mimic existing naming and patterns

## Development Notes

- **Import paths:** Use the `@/*` alias (maps to `./src/*`) for cleaner imports
- **Node version:** Requires Node.js v22.14.0 (specified in `.nvmrc`)
- **Pre-commit hooks:** Husky and lint-staged are configured; eslint runs on `*.{ts,tsx,astro}` files and prettier on `*.{json,css,md}`
- **Linting rules:** Astro, React, JSX a11y, React Hooks, and React Compiler plugins are enforced; disable console warnings only when necessary
