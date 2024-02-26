// reducers/subscriptionReducer.js
import { SET_SUBSCRIPTIONS } from '../actions/subscriptionActions';

const initialState = {
  subscriptions: [],
};

export const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.subscriptions,
      };
    default:
      return state;
  }
};