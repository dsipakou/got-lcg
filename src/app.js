import React from 'react';
import ReactDOM, { render } from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { autoRehydrate, persistStore } from 'redux-persist';
import Board from './containers/board/Board';
import Lobby from './containers/lobby/Lobby';
import Layout from './components/Layout';
import combiner from './redux/reducers/combiner';
import './style/base.scss';
import { Provider } from 'react-redux';
const socket = require('socket.io-client')('http://localhost:3000');
import store from './redux/store';

// const ioMiddleware = () => next => (action) => {
//   console.log(action.type);
//   socket.emit('action', { action });
//   next(action);
// };

const connectSocket = (component) => {
  return props => React.createElement(component, { socket, ...props });
};

// export const store = createStore(
//   combiner,
//   compose(
//     applyMiddleware(thunk, ioMiddleware),
// 		autoRehydrate(),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={connectSocket(Board)} />
          <Route path="/lobby" component={connectSocket(Lobby)} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
);
