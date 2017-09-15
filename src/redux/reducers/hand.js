import { PLAY_CARD, LOG_CARD, DRAW_CARD } from '../actions/card';
import cards from '../../data/cards.json';

function handReducer(state = [], action) {
  switch (action.type) {
    case DRAW_CARD:
      return [
        ...state,
        {id: action.id, revealed: true, name: action.name, type: action.type}
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
