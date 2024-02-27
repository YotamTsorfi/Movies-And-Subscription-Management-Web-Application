export const subscriptionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SUBSCRIPTIONS':
      return action.payload;   
    case 'ADD_SUBSCRIPTION':
      return [...state, action.payload];
    case 'EDIT_SUBSCRIPTION':
      return state.map(subscription =>
        subscription._id === action.payload._id ? action.payload : subscription
      );
    case 'DELETE_SUBSCRIPTION':
      return state.filter(subscription => subscription._id !== action.payload);
    default:
      return state;
  }
};
