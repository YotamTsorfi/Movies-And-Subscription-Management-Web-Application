import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware, combineReducers } from 'redux'; 
import { Provider } from 'react-redux';
import { userReducer } from './reducers/userReducer';
import { subscriptionReducer } from './reducers/subscriptionReducer';
import { movieReducer } from './reducers/movieReducer';
import {thunk} from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

// Combine multiple reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer,
  movie: movieReducer,
  subscription: subscriptionReducer
});

const persistConfig = {
  key: 'root',
  storage,
  //blacklist: ['username'] // user will not be persisted
};


const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the root reducer and apply the thunk middleware
const store = createStore(
  persistedReducer,
  applyMiddleware(thunk) // apply the thunk middleware
);

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();