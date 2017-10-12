import { combineReducers } from 'redux';
import opponentCharacterReducer from './opponentCharacters';
import opponentLocationReducer from './opponentLocations';

export default combineReducers({
  opponentCharacterReducer,
  opponentLocationReducer,
});
