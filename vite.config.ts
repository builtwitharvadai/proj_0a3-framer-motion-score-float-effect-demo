import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The `base` path must match the GitHub repository name for GitHub Pages
// deployment to resolve assets correctly (e.g. https://<user>.github.io/<repo>/).
// For local development and previews we use '/' so the app is served from root.
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/framer-motion-score-float-demo/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
