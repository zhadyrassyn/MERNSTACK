import { combineReducers } from 'redux'

import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  SAVE_POSTS_SUCCESS,
  SAVE_POSTS_ERROR
} from "./../types/types";

const initialState = {
  posts: [],
};

function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        error: action.message
      };
    case SAVE_POSTS_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat([action.data])
      };
    case SAVE_POSTS_ERROR:
      return {
        ...state,
        error: action.message
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  posts: posts
});

export default reducers;