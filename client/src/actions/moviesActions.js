// movieActions.js
import axios from "axios";

export const fetchMovies = (token) => async (dispatch) => {
  const response = await axios.get("http://localhost:4321/movies", {
    headers: { "x-access-token": token },  
  });
  dispatch({ type: "SET_MOVIES", payload: response.data });
};

export const addMovie = (movie, token) => async (dispatch) => {
  const response = await axios.post("http://localhost:4321/movies/", movie, {
    headers: { "x-access-token": token },  
  });
  dispatch({ type: "ADD_MOVIE", payload: response.data });
};

export const updateMovie = (movie, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:4321/movies/${movie._id}`,
      movie,
      {
        headers: { "x-access-token": token },  
      }
    );
    dispatch({ type: "UPDATE_MOVIE", payload: response.data });
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteMovie = (id, token) => async (dispatch) => {
  await axios.delete(`http://localhost:4321/movies/${id}`, {
    headers: { "x-access-token": token },  
  });
  await axios.delete(`http://localhost:4321/subscriptions/deleteMovie/${id}`, {
    headers: { "x-access-token": token },    
  });
  dispatch({ type: "DELETE_MOVIE", payload: id });
};
