import update from 'react-addons-update';
import { GET_GOLD, GET_INITIATIVE, GET_CLAIM } from '../../actions/player/properties';

const propertiesReducer = (state = {
  gold: 0,
  initiative: 0,
  claim: 0
}, action) => {
  switch (action.type) {
    case GET_GOLD:
      return {...state, gold: action.payload}
    case GET_INITIATIVE:
      return {...state, initiative: action.payload}
    case GET_CLAIM:
      return {...state, claim: action.payload}
    default:
      return state
  }
}

export default propertiesReducer;
