import axios from 'axios';

export const loginUser = (username, password) => {

  return async (dispatch, getState) => {
    try {
      const response = await axios.post('http://localhost:4824/auth/login', { username, password });    

      // Check if the username is 'admin'
      const isAdmin = username.toLowerCase() === 'admin';

      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: {token : response.data, username, isAdmin} });
      return true;
    } catch (error) {      
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.message });
      return false;
    }
  };

};


export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT',
  };
};
