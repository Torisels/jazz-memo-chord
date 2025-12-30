# Jazz Memo Chord

A modern web application designed to help musicians master jazz chords through active recall and reflex training. Unlike passive multiple-choice apps, Jazz Memo Chord focuses on building the immediate association between chord symbols, music notation, and keyboard visualization.

## 📖 Project Description

Many musicians understand chord theory "on paper" but lack the real-time fluency required for sight-reading or improvisation. **Jazz Memo Chord** addresses this gap by forcing active construction and identification of chords.

**Core Problem Solved:**

- **Reflex Training:** Reduces the time needed to decode symbols (e.g., `Cmaj9#11`) to muscle memory.
- **Active Learning:** Users must construct chords on a virtual keyboard or parse them from a staff, rather than selecting from a list.
- **Visualization:** Bridges the gap between sheet music and physical keyboard geography.

## 🛠️ Tech Stack

### Frontend & UI

- **Meta-framework:** [Astro 5](https://astro.build/) (Hybrid Rendering)
- **Interactivity:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Music Notation:** [Vexflow](https://github.com/0xfe/vexflow)

### Backend & Infrastructure

- **Backend-as-a-Service:** [Supabase](https://supabase.com/) (PostgreSQL + Auth)
- **Containerization:** Docker & Docker Compose
- **CI/CD:** GitHub Actions

## 🚀 Getting Started Locally

This project uses **Bun** as the package manager (inferred from `bun.lock`).

### Prerequisites

- Bun 1.3.5 or higher (install from [bun.sh](https://bun.sh/))
- Git

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/torisels/jazz-memo-chord.git
    cd jazz-memo-chord
    ```

    Or use gh cli:

    ```bash
    gh repo clone torisels/jazz-memo-chord
    cd jazz-memo-chord
    ```

2.  **Install dependencies:**

    ```bash
    bun i
    ```

3.  **Environment Setup:**
    Duplicate the `.env.example` file to create your local environment configuration.

    ```bash
    cp .env.example .env
    ```

    _Note: Fulfill necessary Supabase credentials in the `.env` file._

4.  **Run the development server:**
    ```bash
    bun run dev
    ```
    The app should now be running at `http://localhost:4321`.

## 📜 Available Scripts

| Command           | Description                                   |
| :---------------- | :-------------------------------------------- |
| `bun run dev`     | Starts the Astro development server.          |
| `bun run build`   | Builds the project for production.            |
| `bun run preview` | Previews the production build locally.        |
| `bun run check`   | Runs Astro's diagnostic check.                |
| `bun run lint`    | Runs ESLint to check for code quality issues. |
| `bun run format`  | Formats code using Prettier.                  |

## 🎯 Project Scope

The current MVP (Minimum Viable Product) focuses on **desktop web** usage optimized for keyboard input.

### Key Features

- **Mode 1: Symbol to Keyboard:**
    - Display random chord symbols (e.g., `Cm7`, `G7b9`).
    - Input via QWERTY keyboard (mapped to musical notes) or mouse clicks or entering sounds with text description like 'C#, E#, Gflat'.
    - Immediate validation with visual overlays for corrections.
- **Mode 2: Notes to Symbol:**
    - Display chords on a musical staff (Treble/Bass clef).
    - Structured input form to identify Root, Quality, and Extensions.
    - Advanced parser supporting enharmonic equivalents.
- **Session Configuration:** Custom setup for Keys, Chord Types, and Clefs.
- **Progress Tracking:** History of results and tracking of "Hard" chords via Supabase.

### Musical Scope

- **Chords:** Triads, Septim chords (Major, Minor, Dominant, Half-dim).
- **Extensions:** 9, 11, 13.
- **Keys:** All tonalities.

## 🚧 Project Status

**Current Status:** 🏗️ **In Development (MVP)**

This project is currently under active development. Features listed in the scope are being implemented according to the Product Requirements Document.

## 📄 License

This project is proprietary software. Please check the repository root for specific license files or contact the author for usage rights.
