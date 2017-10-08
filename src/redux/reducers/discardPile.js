import { ADD_CARD_TO_DISCARD } from '../actions/discardPile';

function discardReducer(state = [], action) {
  switch (action.type) {
    case ADD_CARD_TO_DISCARD:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;

  }
}

export default discardReducer;
