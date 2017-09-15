import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Board from './containers/board/Board';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import player from './redux/reducers/player';
import './style/base.scss';

const store = createStore(player, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <Board/>
  </Provider>,
  document.getElementById('app')
);
