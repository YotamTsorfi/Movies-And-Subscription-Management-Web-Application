// actions/subscriptionActions.js
export const SET_SUBSCRIPTIONS = 'SET_SUBSCRIPTIONS';

export const setSubscriptions = (subscriptions) => ({
  type: SET_SUBSCRIPTIONS,
  subscriptions,
});