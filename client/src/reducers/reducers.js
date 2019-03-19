import { combineReducers } from 'redux'

import postReducer from './postReducer';
import userReducer from './userReducer';
import moviesReducer from './moviesReducer';
import favouritesReducer from './favouritesReducer';

const reducers = combineReducers({
  posts: postReducer,
  users: userReducer,
  movies: moviesReducer,
  favourites: favouritesReducer
});

export default reducers;