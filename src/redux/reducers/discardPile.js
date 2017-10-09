import { ADD_CARD_TO_DISCARD } from '../actions/discardPile';
import update from 'react-addons-update';

function discardReducer(state = [], action) {
  switch (action.type) {
    case ADD_CARD_TO_DISCARD:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'DISCARD'}
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

export default discardReducer;
