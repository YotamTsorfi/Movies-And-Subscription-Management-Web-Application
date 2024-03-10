// movieActions.js
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../actions/userActions';
import { useDispatch } from 'react-redux';

export const fetchMovies = (token) => async (dispatch) => {
  try {
    //const response = await axios.get("http://localhost:4321/movies", {
    const response = await axios.get(`${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/movies`, {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "SET_MOVIES", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const addMovie = (movie, token) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/movies`, movie, {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "ADD_MOVIE", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const updateMovie = (movie, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/movies/${movie._id}`,
      movie,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "UPDATE_MOVIE", payload: response.data });
    return Promise.resolve(response.data);
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const deleteMovie = (id, token) => async (dispatch) => {
  try {
    //await axios.delete(`http://localhost:4321/movies/${id}`, {
    await axios.delete(`${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/movies/${id}`, {
      headers: { "x-access-token": token },
    });
    await axios.delete(
     // `http://localhost:4321/subscriptions/deleteMovie/${id}`,
      `${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/subscriptions/deleteMovie/${id}`,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "DELETE_MOVIE", payload: id });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};
