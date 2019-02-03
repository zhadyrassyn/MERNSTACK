import { combineReducers } from 'redux'

const initialState = {
  posts: [],
};

function posts(state = initialState, action) {
  switch (action.type) {
    case 'GET_POSTS':
      return {
        ...state,
        posts: action.data
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: state.posts.concat([action.data])
      };
    default:
      return state;
  }
}

const reducers = combineReducers({
  posts: posts
});

export default reducers;