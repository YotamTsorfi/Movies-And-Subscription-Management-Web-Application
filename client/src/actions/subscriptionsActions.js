import axios from 'axios';

export const fetchSubscriptions = () => async dispatch => {
  const response = await axios.get('http://localhost:4321/subscriptions');
  dispatch({ type: 'FETCH_SUBSCRIPTIONS', payload: response.data });
};
