import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchSubscriptions = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4321/subscriptions", {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "FETCH_SUBSCRIPTIONS", payload: response.data });
  } catch (error) {
    if (error.response) {
      useNavigate("/login");
    }
  }
};
