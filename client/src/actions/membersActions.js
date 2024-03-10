import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from '../actions/userActions';
import { useDispatch } from 'react-redux';

export const fetchMembers = (token) => async (dispatch) => {
  try {
    //const response = await axios.get("http://localhost:4321/members/", {
    const response = await axios.get(`${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/members/`, {
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
     // "http://localhost:4321/members/",
     `${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/members`,
      member,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "ADD_MEMBER", payload: response.data });
  }  catch (error) {
    if (error.response) {
      useDispatch(logoutUser);
      useNavigate("/login");
    }
  }
};

export const editMember = (member, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      //`http://localhost:4321/members/${member._id}`,
      `${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/members/${member._id}`,
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
    //await axios.delete(`http://localhost:4321/members/${id}`, {
    await axios.delete(`${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/members/${id}`, {
      headers: { "x-access-token": token },
    });
    await axios.delete(
      //`http://localhost:4321/subscriptions/deleteByMemberId/${id}`,
      `${process.env.REACT_APP_SUBSCRIPTIONS_API_URL}/subscriptions/deleteByMemberId/${id}`,
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
