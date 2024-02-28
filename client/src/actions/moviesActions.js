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
  try {
    const response = await axios.put(`http://localhost:4321/movies/${movie._id}`, movie);
    dispatch({ type: 'UPDATE_MOVIE', payload: response.data });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteMovie = id => async dispatch => {
  await axios.delete(`http://localhost:4321/movies/${id}`);
  await axios.delete(`http://localhost:4321/subscriptions/deleteMovie/${id}`);
  dispatch({ type: 'DELETE_MOVIE', payload: id });
};