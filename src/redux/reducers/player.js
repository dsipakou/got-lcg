import { combineReducers } from 'redux';
import deckReducer from './deck';
import handReducer from './hand';
import locationReducer from './location';
import opponentLocationReducer from './opponentLocations';
import characterReducer from './character';
import gameReducer from './game';

export default combineReducers({
  deckReducer,
  handReducer,
  locationReducer,
  opponentLocationReducer,
  characterReducer,
  gameReducer
})
