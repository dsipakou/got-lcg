import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import Lobby from './components/lobby/Lobby';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import player from './redux/reducers/player';
const socket = require('socket.io-client')('http://localhost:3000');
import './style/base.scss';


const ioMiddleware = () => next => action => {
	console.log(action.type);
	socket.emit('action', { action });
	next(action);
}

const connectSocket = (component) => {
	return props => React.createElement(component, {socket: socket, ...props})
}
const store = createStore(
	player,
	compose(
    applyMiddleware(thunk, ioMiddleware)
  ),
);

render(
  <Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route path="/" component={connectSocket(Board)} />
				<Route path="/lobby" component={Lobby} />
			</Switch>
		</BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
