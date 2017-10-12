import { ADD_CARD_TO_HAND, REMOVE_CARD_FROM_HAND, FOLD_HAND  } from '../../actions/player/hand';
import cards from '../../../data/cards.json';
import update from 'react-addons-update';

function handReducer(state = [], action) {
  switch (action.type) {

    case ADD_CARD_TO_HAND:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'HAND'}
        }
      }).payload
      return [
        ...state,
        card
      ]

    case REMOVE_CARD_FROM_HAND:
      const length = state.length
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1, length)
      ]
    case FOLD_HAND:
      return []
    default:
      return state;
  }
}

export default handReducer;
