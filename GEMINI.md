# GEMINI.md - Jazz Memo Chord Project Guidelines

This document serves as the primary reference for AI agents (like Gemini) working on the `jazz-memo-chord` project. It consolidates architectural decisions, coding standards, and best practices derived from the project's configuration and Cursor rules.

## 1. Project Overview & Tech Stack

**Project Name:** jazz-memo-chord
**Description:** A modern web application for musicians to learn jazz chords through interactive memos.
It provides a visual and auditory learning experience, leveraging cutting-edge web technologies.
User can excersice jazz chords using dictation and spaced repetition techniques.
User can see the notes and has to name the chord.
User can hear the chord and has to name it.
User shall be able to choose different chord voicings.


### Tech Stack

- **Meta-framework:** [Astro 5](https://astro.build/) (Hybrid SSR mode)
- **UI Library:** [React 19](https://react.dev/) (Used for interactive islands)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (New York style, Neutral base)
- **Backend/DB:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Validation:** [Zod](https://zod.dev/)

---

## 2. Project Structure

Always adhere to this directory structure when introducing changes:

- `./src` - Source code
- `./src/layouts` - Astro layouts
- `./src/pages` - Astro pages (routes)
- `./src/pages/api` - API endpoints
- `./src/middleware/index.ts` - Astro middleware
- `./src/db` - Supabase clients and types
- `./src/types.ts` - Shared types (Entities, DTOs)
- `./src/components` - Client-side components (Astro static / React dynamic)
- `./src/components/ui` - Shadcn/ui components
- `./src/lib` - Services and helpers
- `./src/assets` - Static internal assets
- `./public` - Public assets
- `./supabase/migrations` - Database migration files

---

## 3. Backend & Supabase

### Supabase Initialization

- **Client:** Use the singleton from `src/db/supabase.client.ts`.
- **Typing:** Use the `Database` type generated in `src/db/database.types.ts`.
- **Middleware:** The Supabase client is injected into `context.locals.supabase` via middleware. Always prefer using `context.locals.supabase` in Astro routes over importing the client directly.

### Database Migrations

- **Location:** `supabase/migrations/`
- **Naming:** `YYYYMMDDHHmmss_short_description.sql` (UTC time).
- **SQL Standards:**
    - Use lowercase SQL.
    - **RLS is MANDATORY** for every table.
    - Policies must be granular (one for `select`, `insert`, etc., per role).
    - Provide thorough comments for destructive actions or complex security rationale.

---

## 4. Astro Guidelines

- **Rendering:** Use hybrid rendering. Use `export const prerender = false` for API routes.
- **Interactivity:** Leverage the **View Transitions API** (ClientRouter).
- **Islands:** Only use React (`.tsx`) for interactive components. Add `client:load` or `client:visible` only where needed.
- **Endpoints:** Use uppercase `POST`, `GET` for handlers. Use Zod for input validation.
- **Services:** Extract logic into `src/lib/services`.
- **Data Fetching:** Prefer server-side fetching in `.astro` files to minimize client-side JS.

---

## 5. Frontend & UI Guidelines

### React (v19)

- **Directives:** NEVER use `"use client"` (Astro handles hydration directives).
- **Hooks:** Use functional components. Extract logic into custom hooks in `src/components/hooks`.
- **Optimization:** Use `React.memo()`, `useCallback()`, and `useMemo()` for performance-critical areas.
- **New Features:** Utilize `useOptimistic` and `useTransition` for responsive UI updates.

### Styling & Shadcn UI

- **Tailwind 4:** Use `@layer` for organization and `theme()` in CSS.
- **Shadcn:** Components reside in `src/components/ui`. Use `bunx shadcn@latest add [name]` to install new ones.
- **Accessibility:** Strictly follow ARIA best practices (landmarks, labels, roles).

---

## 6. Coding Practices & Clean Code

- **Error Handling:**
    - Handle errors/edge cases at the start of functions (Guard Clauses).
    - Use early returns; avoid deeply nested `if/else`.
    - Place the "happy path" at the end of the function.
- **Consistency:**
    - Follow Prettier and ESLint configurations.
    - Mimic existing naming conventions and architectural patterns.
- **Logging:** Implement proper error logging and user-friendly messages.
