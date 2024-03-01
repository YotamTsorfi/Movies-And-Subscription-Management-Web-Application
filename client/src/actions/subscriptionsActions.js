import axios from 'axios';

export const fetchSubscriptions = (token) => async dispatch => {
  const response = await axios.get('http://localhost:4321/subscriptions', {
    headers: { 'x-access-token': token }  
  });
  dispatch({ type: 'FETCH_SUBSCRIPTIONS', payload: response.data });
};
