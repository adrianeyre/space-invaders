import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Enzyme has no React 19 adapter and is no longer maintained, so the component
// tests moved to Testing Library. Testing Library does not unmount between
// tests on its own outside of a globals-aware runner setup, and a left-mounted
// SpaceInvaders keeps its window listeners and interval timers alive into the
// next test.
afterEach(() => {
	cleanup();
});

// jsdom implements no media queries at all, and the game asks for one on mount.
window.matchMedia =
	window.matchMedia ||
	((query: string) =>
		({
			matches: false,
			media: query,
			onchange: null,
			addListener: () => {},
			removeListener: () => {},
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		}) as MediaQueryList);
