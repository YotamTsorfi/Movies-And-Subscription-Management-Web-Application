export const membersReducer = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_MEMBERS':
      return action.payload;
    case 'ADD_MEMBER':
      return [...state, action.payload];
    case 'EDIT_MEMBER':
      return state.map(member =>
        member._id === action.payload._id ? action.payload : member
      );
    case 'DELETE_MEMBER':
      return state.filter(member => member._id !== action.payload);
    default:
      return state;
  }
};

