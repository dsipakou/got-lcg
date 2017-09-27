import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import player from './redux/reducers/player';
const socket = require('socket.io-client')('http://localhost:3000');
import './style/base.scss';

socket.on('news', (data) => {
	console.log(data);
	socket.emit('other event', {my: 'data'})
});

const store = createStore(
	player,
	compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('app')
);
