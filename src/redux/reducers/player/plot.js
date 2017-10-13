import { ADD_PLOT } from '../../actions/player/plot';
import update from 'react-addons-update';

function plotReducer(state = [], action) {
  switch (action.type) {
    case ADD_PLOT:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'PLOT'}
        }
      }).payload
      return [
        ...state,
        card
      ]
    default:
      return state;
  }
}

export default plotReducer;
