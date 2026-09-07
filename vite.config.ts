import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// GitHub Pages serves this project from https://adrianeyre.github.io/space-invaders/,
// so every asset URL has to carry that prefix. It is a repository fact rather than a
// build choice: the deploy in .github/workflows/release.yml publishes to the project
// page, not the user page, and a bare '/' base would ask the browser for
// /assets/... at the domain root and get the 404 page instead of the game.
const base = process.env.VITE_BASE ?? '/space-invaders/';

export default defineConfig({
	base,
	plugins: [react()],
	build: {
		outDir: 'dist',
		sourcemap: true,
	},
	server: {
		open: true,
	},
});
