const initialState = {
    token: null, 
    userId: null,
    username: null,
    isAdmin: false,
    permissions: [],
    error: null
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        return { 
          ...state,       
            token: action.payload.token,
            userId: action.payload.userId,
            username: action.payload.username,
            isAdmin: action.payload.isAdmin,
            permissions: action.payload.permissions,
            error: null
        };
      case 'USER_LOGIN_FAIL':
        return {
           ...state,
            token: null,
            userId: null, 
            username: null, 
            isAdmin: false, 
            permissions: [],  
            error: action.payload 
          };
      case 'USER_UPDATE_PERMISSIONS':
        return {
          ...state,
          permissions: action.payload
        };          
      case 'USER_LOGOUT':
            return initialState;          
      default:
        return state;
    }
  };