import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { getPosts, addPost } from './actions/actions';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
const store = createStore(reducers);

console.log("INITIAL STATE: " , store.getState());

store.dispatch(getPosts());

console.log("STATE AFTER ACTION: " , store.getState());

const newPost = {
  title: 'newTitle',
  content: 'newContent',
  author: 'newAUthor'
};

console.log('ADDING NEW POST ', newPost);

store.dispatch(addPost(newPost));

console.log('STORE AFTER ADD_POST ', store.getState());

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);