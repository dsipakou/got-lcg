import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import Lobby from './containers/lobby/Lobby';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { browserHistory, BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import game from './redux/reducers/general/game';
import combiner from './redux/reducers/combiner';
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
	combiner,
	compose(
    applyMiddleware(thunk, ioMiddleware),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

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
  document.getElementById('app')
);
