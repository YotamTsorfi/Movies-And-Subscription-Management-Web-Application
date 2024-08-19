import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../actions/userActions";
import { useDispatch } from "react-redux";
// const apiUrl = process.env.REACT_APP_SUBSCRIPTIONS_API_URL;

export const fetchMembers = (token) => async (dispatch) => {
  try {
    // console.log("fetchMembers************");

    const response = await axios.get("http://localhost:4321/members/", {
      // const response = await axios.get(`${apiUrl}/members/`, {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "FETCH_MEMBERS", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const addMember = (member, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4321/members/",
      // `${apiUrl}/members`,
      member,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "ADD_MEMBER", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const editMember = (member, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:4321/members/${member._id}`,
      //`${apiUrl}/members/${member._id}`,
      member,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "EDIT_MEMBER", payload: response.data });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const deleteMember = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4321/members/${id}`, {
      //await axios.delete(`${apiUrl}/members/${id}`, {
      headers: { "x-access-token": token },
    });
    await axios.delete(
      `http://localhost:4321/subscriptions/deleteByMemberId/${id}`,
      //`${apiUrl}/subscriptions/deleteByMemberId/${id}`,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "DELETE_MEMBER", payload: id });
  } catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};
