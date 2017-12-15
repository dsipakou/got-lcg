import React from 'react';
import ReactDOM, { render } from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Board from './containers/board/Board';
import Lobby from './containers/lobby/Lobby';
import Layout from './components/Layout';
import store from './redux/store';
import './style/base.scss';

const socket = require('socket.io-client')('http://localhost:3000');

const connectSocket = (component) => {
  return props => React.createElement(component, { socket, ...props });
};

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
