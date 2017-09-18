import { ADD_CARD_TO_HAND, REMOVE_CARD_FROM_HAND } from '../actions/hand';
import cards from '../../data/cards.json';

function handReducer(state = [], action) {
  switch (action.type) {

    case ADD_CARD_TO_HAND:
      return [
        ...state,
        action.payload
      ]

    case REMOVE_CARD_FROM_HAND:
      const length = state.length
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1, length)
      ]
    default:
      return state;
  }
}

export default handReducer;
