import update from 'react-addons-update';
import { GET_GOLD } from '../../actions/player/properties';

const propertiesReducer = (state = {
  gold: 0,
  initiative: 0,
  claim: 0
}, action) => {
  switch (action.type) {
    case GET_GOLD:
      return {...state, gold: action.payload}
    default:
      return state
  }
}

export default propertiesReducer;
