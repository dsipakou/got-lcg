import { addCardToHand } from '../../actions/player/hand';
import { getCard } from '../../actions/player/deck';
import arrayShuffle from 'array-shuffle';
import uuid from 'uuid';
import { DRAW_CARD, MAKE_DECK } from '../../actions/player/deck';
import cards from '../../../data/cards.json';
import currentDeck from '../../../data/currentDeck.json';

let deck = [];

function findCard(card) {
  return card.id === this[0];
}

for (let currentCard of currentDeck.cards) {
  let card = cards.find(findCard, [currentCard]);
  if (card.type !== 'PLOT') {
    deck.push({...card, "uid": uuid.v4(), "cardlocation": "DECK"});
  }
}

// const arr = cards.filter((card) => {
//   if (card.type !== 'PLOT') {
//     return card;
//   }
// }).map(card => { return { "uid": uuid.v4(), "cardlocation": "DECK", ...card }});

const initialState = arrayShuffle(deck);

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      } else {
        return state;
      }
    case MAKE_DECK:
      return arrayShuffle(deck)
    default:
      return state;
  }
}

export default deckReducer
