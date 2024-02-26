// movieReducer.js
const initialState = {
    movies: [],
  };
  
  export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MOVIES':
        return {
          ...state,
          movies: action.payload,
        };
      case 'UPDATE_MOVIE':
        return {
          ...state,
          movies: state.movies.map(movie =>
            movie._id === action.payload.id ? action.payload.updatedMovie : movie
          ),
        };
      case 'ADD_MOVIE':
        return {
          ...state,
          movies: [...state.movies, action.payload],
        };
      case 'DELETE_MOVIE':
        return {
          ...state,
          movies: state.movies.filter(movie => movie._id !== action.payload),
        };
      case 'REMOVE_MOVIE':
        return {
          ...state,
          movies: state.movies.filter(movie => movie !== action.payload),
        };  
      default:
        return state;
    }
  };
  
