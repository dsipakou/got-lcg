import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import Lobby from './components/lobby/Lobby';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Route } from 'react-router-dom';
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

const store = createStore(
	player,
	compose(
    applyMiddleware(thunk, ioMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

render(
  <Provider store={store}>
		<BrowserRouter>
			<Route path="/" component={Board} />
		</BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
