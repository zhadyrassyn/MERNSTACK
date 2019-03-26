import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_POSTS_SUCCESS,
  FETCH_USER_POSTS_ERROR,
  EDIT_USER_POST_SUCCESS,
  EDIT_USER_POST_ERROR,
  DELETE_USER_POST_SUCCESS,
  DELETE_USER_POST_ERROR,
  SAVE_USER_POST_SUCCESS,
  SAVE_USER_POST_ERROR,
  UPDATE_USER_AVATAR_SUCCESS,
  UPDATE_USER_AVATAR_ERROR,
} from "../types/types";

const initialState = {
  authenticated: false,
  user: {},
  posts: []
};

function users(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
      };
    case SIGN_IN_ERROR:
      return {
        ...state,
        authenticated: false
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        authenticated: false
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
      };
    case FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.data
      };
    case FETCH_USER_POSTS_ERROR:
      return {
        ...state,
      };
    case SAVE_USER_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.concat([action.data])
      };
    case SAVE_USER_POST_ERROR:
      return {
        ...state,
        error: action.message
      };
    case EDIT_USER_POST_SUCCESS:
      const copyPosts = state.posts.slice();
      const index = copyPosts.findIndex(post => post._id === action.data._id);
      if (index >= 0) {
        copyPosts[index] = action.data;
      }
      return {
        ...state,
        posts: copyPosts
      };
    case EDIT_USER_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_USER_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.data),
      };
    case DELETE_USER_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_USER_AVATAR_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    case UPDATE_USER_AVATAR_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}

export default users;