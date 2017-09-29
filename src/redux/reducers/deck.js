import { addCardToHand } from '../actions/hand';
import { getCard } from '../actions/deck';
import arrayShuffle from 'array-shuffle';
import uuid from 'uuid';
import { DRAW_CARD, MAKE_DECK } from '../actions/deck';
import cards from '../../data/cards.json';

let uid = 0;
const arr = cards.map(card => {return { "uid": uuid.v4(), "kneel": false, "revealed": true, "cardlocation": "DECK", ...card }})
const initialState = arrayShuffle(arr);

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      } else {
        return state;
      }
    case MAKE_DECK:
      return arrayShuffle(arr)
    default:
      return state;
  }
}

export default deckReducer
