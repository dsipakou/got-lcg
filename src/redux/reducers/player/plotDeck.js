import arrayShuffle from 'array-shuffle';
import uuid from 'uuid';
import { DRAW_PLOT } from '../../actions/player/plotDeck';
import cards from '../../../data/cards.json';
import currentDeck from '../../../data/currentDeck.json';

let deck = [];

function findCard(card) {
  return card.id === this[0];
}

for (let currentCard of currentDeck.cards) {
  let card = cards.find(findCard, [currentCard]);
  if (card.type === 'PLOT') {
    deck.push({...card, "uid": uuid.v4(), "cardlocation": "DECK"});
  }
}

// const arr = cards.filter((card) => {
//   if (card.type === 'PLOT') {
//     return card;
//   }
// }).map(card => { return { "uid": uuid.v4(), "cardlocation": "PLOTDECK", ...card }});

const initialState = arrayShuffle(deck)

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
