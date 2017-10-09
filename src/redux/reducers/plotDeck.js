import { DRAW_PLOT } from '../actions/plotDeck';
import arrayShuffle from 'array-shuffle';
import uuid from 'uuid';
import cards from '../../data/cards.json';

const arr = cards.filter((card) => {
  if (card.type === 'PLOT') {
    return card;
  }
}).map(card => { return { "uid": uuid.v4(), "cardlocation": "DECK", ...card }});

const initialState = arrayShuffle(arr)

function plotDeckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_PLOT:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default plotDeckReducer;
