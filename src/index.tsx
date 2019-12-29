import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import SpaceInvaders from './components/space-invaders/space-invaders';

import './index.scss';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SpaceInvaders />, document.getElementById('root'));
serviceWorker.unregister();
