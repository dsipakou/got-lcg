import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import player from './redux/reducers/player';
import './style/base.scss';

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
