import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  SAVE_POSTS_SUCCESS,
  SAVE_POSTS_ERROR,
  EDIT_POST_SUCCESS,
  EDIT_POST_ERROR,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
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
    case EDIT_POST_SUCCESS:
      const copyPosts = state.posts.slice();
      const index = copyPosts.findIndex(post => post._id === action.data._id);
      if (index >= 0) {
        copyPosts[index] = action.data;
      }
      return {
        ...state,
        posts: copyPosts
      };

    // return {
    //   ...state,
    //   posts: state.posts.map((post) =>
    //     post._id === action.data._id ? action.data : post)
    // };
    case EDIT_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.data),
      };
    case DELETE_POST_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export default posts;