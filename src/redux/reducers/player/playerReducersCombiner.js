import { combineReducers } from 'redux';
import deckReducer from './deck';
import handReducer from './hand';
import locationReducer from './location';
import eventReducer from './event';
import characterReducer from './character';
import discardReducer from './discardPile';
import plotDeckReducer from './plotDeck';
import plotReducer from './plot';

export default combineReducers({
  deckReducer,
  handReducer,
  locationReducer,
  characterReducer,
  eventReducer,
  discardReducer,
  plotDeckReducer,
  plotReducer,
})
