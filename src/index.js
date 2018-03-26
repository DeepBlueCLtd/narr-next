import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.min.css";
import React from 'react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import entryApp from './reducers/reducers'
import App from './components/App'

let store = createStore(entryApp)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
