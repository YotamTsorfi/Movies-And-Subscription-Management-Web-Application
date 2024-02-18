const initialState = {
    token: null, 
    username: null,
    isAdmin: false,
    error: null
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
        return { 
          ...state,       
            token: action.payload.token,
            username: action.payload.username,
            isAdmin: action.payload.isAdmin,
            error: null
        };
      case 'USER_LOGIN_FAIL':
        return {
           ...state,
            token: null,
            username: null, 
            isAdmin: false,   
            error: action.payload 
          };
      case 'USER_LOGOUT':
            return initialState;          
      default:
        return state;
    }
  };