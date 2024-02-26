// movieActions.js
export const setMovies = (movies) => {
    return {
      type: 'SET_MOVIES',
      payload: movies,
    };
  };
  
  export const deleteMovie = (id) => {
    return {
      type: 'DELETE_MOVIE',
      payload: id,
    };
  };

  export const updateMovie = (id, updatedMovie) => {
    return {
      type: 'UPDATE_MOVIE',
      payload: { id, updatedMovie },
    };
  }

  export const addMovie = (newMovie) => {
    return {
      type: 'ADD_MOVIE',
      payload: newMovie,
    };
  };

  export const removeMovie = (movie) => {
    return {
      type: 'REMOVE_MOVIE',
      payload: movie,
    };
  };