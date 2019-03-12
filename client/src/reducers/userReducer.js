import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from "../types/types";

const initialState = {
  authenticated: false,
  user: {}
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
    default:
      return state;
  }
}

export default users;