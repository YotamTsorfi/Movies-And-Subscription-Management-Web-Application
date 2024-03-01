import axios from 'axios';

export const fetchMembers = (token) => async dispatch => {
  const response = await axios.get('http://localhost:4321/members/', {
    headers: { 'x-access-token': token }  
  });
  dispatch({ type: 'FETCH_MEMBERS', payload: response.data });
};

export const addMember = (member, token) => async dispatch => {
  const response = await axios.post('http://localhost:4321/members/', member, {
    headers: { 'x-access-token': token }
  });
  dispatch({ type: 'ADD_MEMBER', payload: response.data });
};

export const editMember = (member, token) => async dispatch => {
  const response = await axios.put(`http://localhost:4321/members/${member._id}`, member, {
    headers: { 'x-access-token': token }
  });
  dispatch({ type: 'EDIT_MEMBER', payload: response.data });
};

export const deleteMember = (id, token) => async dispatch => {
  await axios.delete(`http://localhost:4321/members/${id}`, {
    headers: { 'x-access-token': token }
  });
  await axios.delete(`http://localhost:4321/subscriptions/deleteByMemberId/${id}`, {
    headers: { 'x-access-token': token }
  });
  dispatch({ type: 'DELETE_MEMBER', payload: id });
};