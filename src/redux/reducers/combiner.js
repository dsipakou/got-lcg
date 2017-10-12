import { combineReducers } from 'redux';
import playerReducersCombiner from './player/playerReducersCombiner';
import opponentReducersCombiner from './opponent/opponentReducersCombiner';
import generalReducersCombiner from './general/generalReducersCombiner';

export default combineReducers({
  player: playerReducersCombiner,
  opponent: opponentReducersCombiner,
  general: generalReducersCombiner,
})
