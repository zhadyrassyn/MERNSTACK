import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
} from "./../types/types";

const initialState = {
  posts: [],
  selectedPost: {},
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
    default:
      return state;
  }
}

export default posts;