import React from 'react';
import ReactDOM from 'react-dom';
import store from './store/index';

import Provider from './react-redux/provider';

import App from './App.js';

ReactDOM.render(
    <Provider store={store}>
        <App></App>
    </Provider>,
    document.getElementById('app')
)