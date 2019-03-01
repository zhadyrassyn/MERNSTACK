import {
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS
} from "../types/types";

const initialState = {
  authenticated: false,
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
    default:
      return state;
  }
}

export default users;