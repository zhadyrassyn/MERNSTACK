const initialState = {
  favourites: []
};

function favourites(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.concat([action.data])
      };
    default:
      return state;
  }
}

export default favourites;