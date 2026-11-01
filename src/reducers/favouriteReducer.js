function favouriteReducer(state, action) {

  switch (action.type) {

    case 'TOGGLE_FAVOURITE':

      if (state.includes(action.id)) {
        return state.filter((id) => id !== action.id);
      }

      return [...state, action.id];

    default:
      return state;
  }
}

export default favouriteReducer;