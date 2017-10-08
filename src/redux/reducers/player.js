import { combineReducers } from 'redux';
import deckReducer from './deck';
import handReducer from './hand';
import locationReducer from './location';
import eventReducer from './event';
import opponentLocationReducer from './opponentLocations';
import characterReducer from './character';
import opponentCharacterReducer from './opponentCharacters';
import gameReducer from './game';
import roomReducer from './room';

export default combineReducers({
  deckReducer,
  handReducer,
  locationReducer,
  opponentLocationReducer,
  characterReducer,
  opponentCharacterReducer,
  gameReducer,
  roomReducer,
  eventReducer,
})
