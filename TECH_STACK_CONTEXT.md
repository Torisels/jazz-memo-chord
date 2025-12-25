# Project Tech Stack Context: jazz-memo-chord

This document serves as a reference for Gemini to understand the technical architecture and tools used in the `jazz-memo-chord` project.

## 1. Core Architecture: Astro
**Role:** The "Meta-framework" and Orchestrator.
- **What it is:** A modern web framework designed for speed. It uses an **Islands Architecture**.
- **Python/C# Analogy:** I was using python previosuly but only fastapi and data science. I know c# typing as well. 
- **Key Feature (The "Island"):** Unlike traditional SPAs (Single Page Applications) that send a massive JavaScript bundle, Astro sends zero JS by default. You "hydrate" specific components (islands) only where interactivity is needed.
- **Configuration:** `astro.config.mjs` (output is set to `server`, meaning it runs on a Node.js server rather than being a static site).

## 2. UI Library: React 19
**Role:** Component-based UI development.
- **What it is:** A library for building user interfaces using a declarative, state-driven approach.
- **Python/C# Analogy:** Comparable to Windows Forms or WPF/XAML in C#, but web-native and functional. Instead of manipulating the DOM (UI) directly, you define how the UI should look based on the current "State".
- **Integration:** Used within Astro pages for interactive elements (e.g., buttons, forms, chord charts).

## 3. Language: TypeScript
**Role:** Type safety and developer experience.
- **What it is:** A typed superset of JavaScript.
- **Python/C# Analogy:** It brings the static typing of **C#** (interfaces, types, generics) to the flexible world of JavaScript. If you're used to Python's "type hints" (via `mypy`), TypeScript is a much more robust and enforced version of that.
- **Benefit:** Catches errors at compile-time rather than runtime.

## 4. Styling: Tailwind CSS 4
**Role:** Utility-first CSS framework.
- **What it is:** Instead of writing custom CSS files (like `style.css`), you apply pre-defined utility classes directly in your HTML/JSX (e.g., `flex pt-4 text-blue-500`).
- **Python/C# Analogy:** It’s like having a very comprehensive, standardized set of layout constants and styling properties available directly in your UI code.

## 5. UI Components: Shadcn/UI & Radix UI
**Role:** High-quality, accessible UI primitives.
- **What it is:** **Radix UI** provides the "headless" logic (how a dropdown works, its accessibility), and **Shadcn/UI** is a collection of reusable components built on top of Radix and Tailwind that you "own" (the code is copied into your `src/components/ui` folder).
- **Python/C# Analogy:** Similar to DevExpress or Telerik UI controls in C#, but open-source and highly customizable because you have the source code.

## 6. Backend & Database: Supabase (Implicit)
**Role:** Backend-as-a-Service (BaaS).
- **What it is:** Provides a PostgreSQL database, Authentication, and Edge Functions.
- **Python/C# Analogy:** Think of it as **Entity Framework + Identity Server + AWS Lambda** all rolled into one managed service.
- **Usage:** Referenced in `.cursor/rules` for migrations and API initialization.

## 7. Project Structure Highlights
- `/src/pages/*.astro`: These are your routes. An `index.astro` file maps to the `/` URL.
- `/src/components/*.tsx`: These are your React components.
- `/src/components/ui/*.tsx`: These are your Shadcn UI components.
- `/src/layouts/*.astro`: Shared page wrappers (header, footer, HTML boilerplate).
- `/src/lib/utils.ts`: Helper functions (often contains the `cn` utility for merging Tailwind classes).

## 8. Modern Frontend Concepts for the "Backend" Mindset
- **Declarative vs. Imperative:** You don't say "find the button and change its text". You say "if `isLoading` is true, show a spinner, otherwise show 'Submit'".
- **Hydration:** The process where a static HTML page sent from the server becomes interactive by "attaching" React's event listeners in the browser.
- **JSX/TSX:** A syntax extension that allows you to write HTML-like code inside JavaScript/TypeScript. It's essentially "Templates" (like Jinja2 or Razor) but with the full power of the programming language.
- **Server vs. Client Components:** In Astro, everything is a Server Component by default. You add a `client:load` or `client:visible` directive to a React component to make it interactive on the client.
