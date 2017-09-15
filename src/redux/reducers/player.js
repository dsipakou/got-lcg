import { combineReducers } from 'redux';
import handReducer from './hand';
import locationReducer from './location';

export default combineReducers({
  handReducer,
  locationReducer
})
