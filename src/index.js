import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/reducers'
import App from './components/App'

let store = createStore(todoApp)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
