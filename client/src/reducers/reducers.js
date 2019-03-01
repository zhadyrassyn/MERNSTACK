import { combineReducers } from 'redux'

import postReducer from './postReducer';
import userReducer from './userReducer';

const reducers = combineReducers({
  posts: postReducer,
  users: userReducer
});

export default reducers;