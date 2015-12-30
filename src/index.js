import React from 'react';
import { render } from 'react-dom';
import { syncReduxAndRouter } from 'redux-simple-router'
import { RootComponent } from './root';
import { store } from './store';

render(<RootComponent store={ store } />, document.getElementById('root'));



