import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The site is served from https://space-invaders.adrianeyre.co.uk/, a custom domain whose
// root *is* the site, so assets live at /assets/... and the base is '/'. It used to be
// '/space-invaders/' for the github.io project page, where the repository name was part of
// every URL; keeping that prefix after the cutover asked the browser for
// /space-invaders/assets/... on a domain that has nothing there, which is the 404s on the
// JS and CSS. Override with VITE_BASE to build for a different mount point — including
// VITE_BASE=/space-invaders/ to reproduce the old project-page layout.
const base = process.env.VITE_BASE ?? '/';

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
