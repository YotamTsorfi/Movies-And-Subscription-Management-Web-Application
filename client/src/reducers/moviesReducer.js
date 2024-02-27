// movieReducer.js

export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    case 'UPDATE_MOVIE':
      return state.map(movie =>
        movie._id === action.payload._id ? action.payload : movie
      );
    case 'ADD_MOVIE':
      return [...state, action.payload];
      case 'DELETE_MOVIE':
        return state.filter(movie => movie._id !== action.payload);        
    default:
      return state;
  }
};



