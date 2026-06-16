# Framer Motion Score Float Effect Demo

## Overview

A demonstration project showcasing a floating score / points animation effect built with
[Framer Motion](https://www.framer.com/motion/). The demo renders animated score indicators
that float upward with smooth easing, fade out, and cleanly unmount — the kind of feedback
typically used to acknowledge points earned or rewards in interactive applications.

The project focuses on the core animation mechanics and visual effects so they can be
copied and adapted into other React applications.

## Technology Stack

- **React 18** — component-based UI library
- **TypeScript 5** — static type checking
- **Vite 5** — fast development server and production bundler
- **Framer Motion 11** — declarative animations and gestures

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) `>=18.0.0`
- npm (bundled with Node.js)

### Installation

```bash
npm install
```

### Development

Start the local development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building

Create an optimized production build:

```bash
npm run build
```

The compiled output is written to the `dist/` directory.

### Preview

Serve the production build locally to verify it before deployment:

```bash
npm run preview
```

### Linting

Check the codebase for lint errors:

```bash
npm run lint
```

## Project Structure

```
.
├── public/      # Static assets copied verbatim to the build output (favicon, etc.)
├── src/         # Application source code (components, types, styles, entry point)
└── dist/        # Production build output (generated, not committed)
```

## Available Scripts

| Script            | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Start the Vite development server with HMR.                              |
| `npm run build`   | Type-check with `tsc` and produce an optimized production build.         |
| `npm run preview` | Serve the production build locally to validate the deployable artifact. |
| `npm run lint`    | Run ESLint with zero warnings tolerated.                                 |
| `npm run format`  | Format `src/` files with Prettier.                                       |

## Deployment

This project is configured to deploy to **GitHub Pages**. The Vite `base` path in
`vite.config.ts` is set to `/framer-motion-score-float-demo/` for production builds,
which must match the GitHub repository name for assets to resolve correctly.

Typical deployment workflow:

1. Build the project:
   ```bash
   npm run build
   ```
2. Publish the contents of `dist/` to the `gh-pages` branch (for example via the
   [`gh-pages`](https://www.npmjs.com/package/gh-pages) package or a GitHub Actions
   workflow that uploads `dist/` as a Pages artifact).
3. In the repository settings, enable GitHub Pages and point it at the `gh-pages`
   branch (or the Actions deployment).

If you are deploying to a custom domain or a different repository name, update the
`base` value in `vite.config.ts` and `VITE_BASE_URL` in your environment file
accordingly.

## License

MIT
