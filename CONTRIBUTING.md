# Contributing to Framer Motion Score Float Demo

Thanks for your interest in contributing! This document describes how to set up the
project locally, the coding standards we follow, and the workflow for submitting changes.

## Development Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-org>/framer-motion-score-float-demo.git
   cd framer-motion-score-float-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` with hot module replacement.

4. **Build for production**

   ```bash
   npm run build
   ```

   The optimized output is written to `dist/`. Run `npm run preview` to serve the build
   locally for verification.

## Code Style

This project uses **ESLint** and **Prettier** to enforce a consistent style across the
codebase.

1. Run the linter before committing:

   ```bash
   npm run lint
   ```

2. Auto-format files with Prettier:

   ```bash
   npm run format
   ```

3. Follow **TypeScript strict mode** — `strict: true` is set in `tsconfig.json`. Avoid
   `any` and prefer explicit types at module boundaries.
4. Use **functional components with hooks**. Class components are not used in this
   codebase.
5. Keep components small and focused; co-locate styles via CSS Modules
   (`Component.module.css`).

## Commit Conventions

We use the [Conventional Commits](https://www.conventionalcommits.org/) format. Every
commit message must start with one of the following type prefixes:

| Type        | Purpose                                                 |
| ----------- | ------------------------------------------------------- |
| `feat:`     | A new user-facing feature                               |
| `fix:`      | A bug fix                                               |
| `docs:`     | Documentation-only changes                              |
| `style:`    | Formatting changes (whitespace, semicolons, etc.)       |
| `refactor:` | Code restructuring that does not alter behavior         |
| `test:`     | Adding or updating tests                                |
| `chore:`    | Tooling, build, or dependency updates                   |

Examples:

```text
feat: add stagger delay prop to FloatingScore
fix: clear timeout when component unmounts mid-animation
docs: document the duration prop default in README
style: run prettier across components
refactor: extract animation timings into constants
test: cover negative score variant rendering
chore: bump framer-motion to 11.3.0
```

## Pull Request Process

1. **Fork** the repository and clone your fork locally.
2. **Create a feature branch** from `main`:

   ```bash
   git checkout -b feat/short-description
   ```

3. **Make your changes** and accompany them with tests where applicable.
4. **Run lint and build** to confirm a clean tree:

   ```bash
   npm run lint
   npm run build
   ```

5. **Submit a pull request** against `main` with a clear description of:
   - What changed and why
   - Screenshots or recordings for visual changes
   - Steps to reproduce / verify
6. **Wait for review.** Address feedback by pushing follow-up commits to the same branch.

## Project Structure

```
src/
├── components/      # Reusable React components (e.g. FloatingScore)
├── types/           # Shared TypeScript interfaces and types
├── App.tsx          # Demo page that wires everything together
└── main.tsx         # React entry point that mounts <App /> to the DOM
```

- **`components/`** — Each component lives in its own file with a co-located
  `.module.css` and is re-exported from `components/index.ts`.
- **`types/`** — Centralized type definitions, primarily `animation.ts` for the
  animation system contract.
- **`App.tsx`** — Orchestrates the demo UI and animation state.
- **`main.tsx`** — Bootstraps React and renders `<App />` into `#root`.

## Adding New Features

1. **Maintain TypeScript strict mode.** Do not weaken `tsconfig.json` to bypass type
   errors; fix the underlying types.
2. **Add prop types to interfaces.** New component props belong in
   `src/types/animation.ts` (or a sibling types file), with JSDoc comments describing
   each field.
3. **Document new props in the README.** Update the Component API table and add a
   customization example where appropriate.
4. **Test on multiple browsers.** Verify behavior in Chrome, Firefox, Safari, and Edge
   at the supported minimum versions before requesting review.

## Code of Conduct

To keep this a welcoming project for contributors of all backgrounds and experience
levels, please follow these principles:

- **Be respectful.** Treat others the way you want to be treated.
- **Give constructive feedback.** Critique code and ideas, not the people behind them,
  and suggest concrete improvements when raising concerns.
- **Use inclusive language.** Avoid assumptions about identity, experience, or
  background, and prefer terminology that welcomes everyone.

Violations may result in a contributor being asked to change behavior or, in serious
cases, being removed from the project. Thank you for helping keep this community healthy.
