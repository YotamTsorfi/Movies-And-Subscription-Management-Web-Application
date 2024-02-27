import axios from 'axios';

export const fetchSubscriptions = () => async dispatch => {
  const response = await axios.get('http://localhost:4321/subscriptions');
  dispatch({ type: 'FETCH_SUBSCRIPTIONS', payload: response.data });
};

// export const fetchSubscriptionsByMovieId = movieId => async dispatch => {
//   const response = await axios.get(`http://localhost:4321/subscriptions/movie/${movieId}`);
//   dispatch({ type: 'FETCH_SUBSCRIPTIONS_BY_MOVIE_ID', payload: response.data });
// };