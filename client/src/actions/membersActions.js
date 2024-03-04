import axios from "axios";
import { useNavigate } from "react-router-dom";

export const fetchMembers = (token) => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4321/members/", {
      headers: { "x-access-token": token },
    });
    dispatch({ type: "FETCH_MEMBERS", payload: response.data });
  } catch (error) {
    if (error.response) {
      useNavigate("/login");
    }
  }
};

export const addMember = (member, token) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:4321/members/",
      member,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "ADD_MEMBER", payload: response.data });
  }  catch (error) {
    if (error.response) {
      useNavigate("/login");
    }
  }
};

export const editMember = (member, token) => async (dispatch) => {
  try {
    const response = await axios.put(
      `http://localhost:4321/members/${member._id}`,
      member,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "EDIT_MEMBER", payload: response.data });
  } catch (error) {
    if (error.response) {
      useNavigate("/login");
    }
  }
};

export const deleteMember = (id, token) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4321/members/${id}`, {
      headers: { "x-access-token": token },
    });
    await axios.delete(
      `http://localhost:4321/subscriptions/deleteByMemberId/${id}`,
      {
        headers: { "x-access-token": token },
      }
    );
    dispatch({ type: "DELETE_MEMBER", payload: id });
  } catch (error) {
    if (error.response) {
      useNavigate("/login");
    }
  }
};
