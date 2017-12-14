import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { REHYDRATE, PURGE, persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combiner from './reducers/combiner';

const socket = require('socket.io-client')('http://localhost:3000');

const config = {
  key: 'primary',
  storage,
};

const ioMiddleware = () => next => (action) => {
  console.log(action.type);
  socket.emit('action', { action });
  next(action);
};

const reducer = persistCombineReducers(config, combiner);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk, ioMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

persistStore(
  store,
  null,
  () => {
    store.getState();
  },
);

export default store;
