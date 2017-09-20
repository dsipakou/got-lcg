import { addCardToHand } from '../actions/hand';
import { getCard } from '../actions/deck';
import arrayShuffle from 'array-shuffle';
import { DRAW_CARD } from '../actions/deck';
import cards from '../../data/cards.json';

let uid = 0;
const arr = cards.map(card => {return { "uid": uid++, "kneel": false, "revealed": true,  ...card }})
const initialState = arrayShuffle(arr);

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default deckReducer
