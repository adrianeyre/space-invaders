import React from 'react';
import { createRoot } from 'react-dom/client';

import SpaceInvaders from './components/space-invaders/space-invaders';
import reportWebVitals from './report-web-vitals';

import './index.scss';

// React 19 removed ReactDOM.render, and with it the tolerance for a missing
// container: createRoot throws on null rather than silently doing nothing, so
// the mount point is checked here instead of failing somewhere inside React.
const container = document.getElementById('root');

if (!container) {
	throw new Error('Cannot start Space Invaders: no #root element in the page');
}

createRoot(container).render(
	<React.StrictMode>
		<SpaceInvaders />
	</React.StrictMode>
);

reportWebVitals();
