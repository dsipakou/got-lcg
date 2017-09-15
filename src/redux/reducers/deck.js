import { DRAW_CARD } from '../actions/card';
import cards from '../../data/cards.json';

const initialState = cards

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      const length = state.length;
      if (length > 1) {
        return [
          ...state.slice(0, length - 1)
        ]
      }
      return state;
    default:
      return state;
  }
}

export default deckReducer
