import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../actions/userActions';
import { useDispatch } from 'react-redux';

export const fetchSubscriptions = (token) => async (dispatch) => {
  try {
    //const response = await axios.get("http://localhost:4321/subscriptions", {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/subscriptions`, {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "FETCH_SUBSCRIPTIONS", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};
