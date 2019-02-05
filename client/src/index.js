import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/reducers';

const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  ));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);