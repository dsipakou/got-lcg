import { combineReducers } from 'redux';
import opponentCharacterReducer from './opponentCharacters';
import opponentLocationReducer from './opponentLocations';
import opponentPlotReducer from './opponentPlot'

export default combineReducers({
  opponentCharacterReducer,
  opponentLocationReducer,
  opponentPlotReducer,
});
