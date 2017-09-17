import { PLAY_CARD, LOG_CARD, ADD_CARD_TO_HAND } from '../actions/hand';
import cards from '../../data/cards.json';

function handReducer(state = [], action) {
  switch (action.type) {

    case ADD_CARD_TO_HAND:
      return [
        ...state,
        action.payload
      ]
    case PLAY_CARD:
      const index = action.card.index;
      const length = state.length;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, length),
      ];
    case LOG_CARD:
      return state;
    default:
      return state;
  }
}

export default handReducer;
