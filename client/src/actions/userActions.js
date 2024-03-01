import axios from 'axios';

export const loginUser = (username, password) => {

  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:4824/auth/login', { username, password });    

      // Check if the username is 'admin'
      const isAdmin = username.toLowerCase() === 'admin';

      // Fetch the permissions for the user
      const permissionsResponse = await axios.get(`http://localhost:4824/permissionsfile/${response.data.userId}`);
      const permissions = permissionsResponse.data.permissions;

      dispatch({ type: 'USER_LOGIN_SUCCESS', payload: {token : response.data.token, userId: response.data.userId, username, isAdmin, permissions} });
      return true;
    } catch (error) {      
      dispatch({ type: 'USER_LOGIN_FAIL', payload: error.message });
      return false;
    }
  };
};

export const updateUserPermissions = (permissions) => {
  return {
    type: 'USER_UPDATE_PERMISSIONS',
    payload: permissions
  };
};

export const logoutUser = () => {
  return {
    type: 'USER_LOGOUT',
  };
};
