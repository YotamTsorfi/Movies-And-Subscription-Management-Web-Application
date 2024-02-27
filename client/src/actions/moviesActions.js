// movieActions.js
import axios from 'axios';

export const fetchMovies = () => async dispatch => {
  const response = await axios.get('http://localhost:4321/movies');
  dispatch({ type: 'SET_MOVIES', payload: response.data });
};

export const addMovie = movie => async dispatch => {
  const response = await axios.post('http://localhost:4321/movies/', movie);
  dispatch({ type: 'ADD_MOVIE', payload: response.data });
};

export const updateMovie = movie => async dispatch => {
  const response = await axios.put(`http://localhost:4321/movies/${movie._id}`, movie);
  dispatch({ type: 'UPDATE_MOVIE', payload: response.data });
};

export const deleteMovie = id => async dispatch => {
  await axios.delete(`http://localhost:4321/movies/${id}`);
  dispatch({ type: 'DELETE_MOVIE', payload: id });
};
