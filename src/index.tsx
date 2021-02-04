import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import SpaceInvaders from './components/space-invaders/space-invaders';

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <React.StrictMode>
        <SpaceInvaders />
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
