import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import combiner from './reducers/combiner';

const socket = require('socket.io-client')('http://localhost:3000');

const config = {
  key: 'primary',
  storage,
  debug: true,
};

// eslint-disable-next-line no-underscore-dangle
let devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production') {
  devTools = null;
}

// if (devTools !== 'undefined') {
//   devTools = a => a;
// }

const ioMiddleware = () => next => (action) => {
  console.log(action.type);
  socket.emit('action', { action });
  next(action);
};

const reducer = persistCombineReducers(config, combiner);

function configureStore() {
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk, ioMiddleware),
      devTools,
    ),
  );

  const persistor = persistStore(store);

  return { store, persistor };
}

export default configureStore;
