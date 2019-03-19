const initialState = {
  movies: [
    {
      id: 1,
      name: "Movie 1"
    },
    {
      id: 2,
      name: "Movie 2"
    }
  ]
};

function movies(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default movies;