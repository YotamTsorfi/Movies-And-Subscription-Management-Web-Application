import axios from 'axios';

export const fetchMembers = () => async dispatch => {
  const response = await axios.get('http://localhost:4321/members/');
  dispatch({ type: 'FETCH_MEMBERS', payload: response.data });
};

export const addMember = member => async dispatch => {
  const response = await axios.post('http://localhost:4321/members/', member);
  console.log(response.data);
  dispatch({ type: 'ADD_MEMBER', payload: response.data });
};

export const editMember = member => async dispatch => {
  const response = await axios.put(`http://localhost:4321/members/${member._id}`, member);
  dispatch({ type: 'EDIT_MEMBER', payload: response.data });
};

export const deleteMember = id => async dispatch => {
  await axios.delete(`http://localhost:4321/members/${id}`);
  await axios.delete(`http://localhost:4321/subscriptions/deleteByMemberId/${id}`);
  dispatch({ type: 'DELETE_MEMBER', payload: id });
};