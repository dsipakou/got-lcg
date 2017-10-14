import update from 'react-addons-update';
import { SET_GOLD, SET_INITIATIVE, SET_CLAIM, SPEND_GOLD } from '../../actions/player/properties';

const propertiesReducer = (state = {
  gold: 0,
  initiative: 0,
  claim: 0
}, action) => {
  switch (action.type) {
    case SET_GOLD:
      return {...state, gold: action.payload}
    case SET_INITIATIVE:
      return {...state, initiative: action.payload}
    case SET_CLAIM:
      return {...state, claim: action.payload}
    case SPEND_GOLD:
      return {...state, gold: state.gold - action.payload}
    default:
      return state
  }
}

export default propertiesReducer;
