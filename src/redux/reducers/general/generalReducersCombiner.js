import { combineReducers } from 'redux';
import gameReducer from './game'
import roomReducer from './room';

export default combineReducers({
  gameReducer,
  roomReducer,
})
