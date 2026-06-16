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

## Component API

The `FloatingScore` component is the centerpiece of this demo. It accepts the following
props, defined by the `FloatingScoreProps` interface in `src/types/animation.ts`.

| Prop         | Type         | Required | Default | Description                                                                                  |
| ------------ | ------------ | -------- | ------- | -------------------------------------------------------------------------------------------- |
| `value`      | `number`     | Yes      | —       | Numeric score value to display. Positive values are prefixed with `+`; negatives keep `-`.   |
| `duration`   | `number`     | No       | `1.8`   | Total animation duration in seconds (covers fade-in, hold, and fade-out).                    |
| `distance`   | `number`     | No       | `100`   | Vertical travel distance in pixels — the element floats upward by this amount.               |
| `initialX`   | `number`     | Yes      | —       | Initial horizontal position in pixels (absolute positioning origin).                         |
| `initialY`   | `number`     | Yes      | —       | Initial vertical position in pixels (absolute positioning origin).                           |
| `onComplete` | `() => void` | No       | —       | Callback invoked after `duration` seconds, typically used to remove the element from state. |

## Customization Examples

### Basic Usage

```tsx
import { FloatingScore } from './components';

<FloatingScore value={50} initialX={120} initialY={240} />;
```

### Custom Duration and Distance

```tsx
<FloatingScore
  value={100}
  duration={2.4}
  distance={160}
  initialX={200}
  initialY={300}
/>
```

### Handling Multiple Animations

```tsx
import { useState } from 'react';
import { FloatingScore } from './components';

type ScoreItem = {
  id: number;
  value: number;
  x: number;
  y: number;
};

const ScoreBoard = () => {
  const [scores, setScores] = useState<ScoreItem[]>([]);

  const spawnScore = (event: React.MouseEvent) => {
    const id = Date.now();
    setScores((prev) => [
      ...prev,
      { id, value: 25, x: event.clientX, y: event.clientY },
    ]);
  };

  const removeScore = (id: number) => {
    setScores((prev) => prev.filter((score) => score.id !== id));
  };

  return (
    <div onClick={spawnScore}>
      {scores.map((score) => (
        <FloatingScore
          key={score.id}
          value={score.value}
          initialX={score.x}
          initialY={score.y}
          onComplete={() => removeScore(score.id)}
        />
      ))}
    </div>
  );
};
```

### Custom Styling

The component composes class names from `FloatingScore.module.css`, which exposes
`.floatingScore`, `.positive`, and `.negative` classes. Override these via your own CSS
module or wrap the component in a styled container to adjust typography, colors, and
shadows without touching the animation logic.

```tsx
<div className="my-custom-wrapper">
  <FloatingScore value={-10} initialX={50} initialY={50} />
</div>
```

## Architecture

### Component Structure

```
src/
├── App.tsx                          # Demo page that spawns animations
├── App.module.css                   # App-level layout styles
├── main.tsx                         # React entry point
├── index.css                        # Global resets and base styles
├── components/
│   ├── FloatingScore.tsx            # Core animated component
│   ├── FloatingScore.module.css     # Scoped component styles
│   └── index.ts                     # Barrel export
└── types/
    └── animation.ts                 # Shared TypeScript interfaces
```

### Framer Motion Variants System

`FloatingScore` uses Framer Motion's declarative `initial`, `animate`, and `transition`
props. The keyframe arrays passed to `animate` (e.g. `opacity: [0, 1, 1, 0]`, `y: [0, -distance]`)
combined with the `times: [0, 0.11, 0.83, 1]` array map each keyframe to a normalized point
in the animation timeline. This produces a fade-in, hold, fade-out sequence in a single
declarative block instead of chained tweens.

### Animation Lifecycle

1. The component mounts at `(initialX, initialY)` with `opacity: 0`.
2. Framer Motion drives the timeline: rapid fade-in (0–11%), hold while floating upward
   (11–83%), fade-out (83–100%).
3. A `useEffect` schedules an `onComplete` callback after `duration` seconds so the parent
   can remove the element from state.
4. React unmounts the element, releasing all DOM and animation resources.

### State Management in `App.tsx`

`App.tsx` keeps an array of active animations in local component state (`useState`). Each
click/tap pushes a new entry with a unique `id`, `value`, and screen coordinates. When the
child reports completion via `onComplete`, the parent filters the entry out, triggering an
unmount. Keeping state local keeps the demo self-contained and free of external stores.

## Performance

- **Animate transform and opacity only.** These are GPU-composited properties that do not
  trigger layout or paint, which is critical for jank-free 60fps animation.
- **Limit concurrent animations.** Aim for **≤ 10 simultaneous floating scores**. Beyond
  that, throttle spawns or pool elements.
- **Avoid layout properties.** Do not animate `width`, `height`, `top`, `left`, `margin`,
  or `padding`. Use `transform: translate3d(...)` (which Framer Motion does internally for
  `x` and `y`).
- **Use `will-change` sparingly.** Apply it only to elements that are actively animating,
  and remove it afterward — permanent `will-change` reserves memory unnecessarily.

## Browser Compatibility

| Browser  | Minimum Version |
| -------- | --------------- |
| Chrome   | 90+             |
| Firefox  | 88+             |
| Safari   | 14+             |
| Edge     | 90+             |

> The demo requires a browser with CSS transform support and modern JavaScript (ES2020+).
> Server-side rendering frameworks should defer animation mounting until after hydration.

## Troubleshooting

- **Animations are not smooth / janky.** Look for layout thrashing. Ensure only `transform`
  and `opacity` are animated, and check the browser DevTools Performance panel for long
  paint or layout tasks during the animation window.
- **Animations not appearing on screen.** Verify the parent container is not clipping the
  element and that the `z-index` (default `999` on the floating element) sits above any
  overlaying UI. Confirm `initialX` / `initialY` resolve to coordinates inside the
  viewport.
- **Multiple animations overlap visually.** Increase the random horizontal/vertical offset
  range when spawning new animations so adjacent floats do not collide. The demo applies
  a small random jitter to `initialX` for this reason.

## Advanced Usage

For more sophisticated animation work, consult the official Framer Motion documentation:

- [Custom easing curves and `cubicBezier`](https://www.framer.com/motion/transition/)
- [Stagger animations with `staggerChildren`](https://www.framer.com/motion/animation/#orchestration)
- [Gesture-triggered animations (`whileHover`, `whileTap`, `drag`)](https://www.framer.com/motion/gestures/)

These primitives compose cleanly with the patterns shown above and can be layered on top
of `FloatingScore` for richer effects.

## Demo

See live demo at **[GitHub Pages URL]** (replace with the deployed URL once published).

![Floating score animation example](https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800)

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
