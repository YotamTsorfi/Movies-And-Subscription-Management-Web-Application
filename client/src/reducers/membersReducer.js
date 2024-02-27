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
    default:
      return state;
  }
};

