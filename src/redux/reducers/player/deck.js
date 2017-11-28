import uuid from 'uuid';
import arrayShuffle from 'array-shuffle';
import { DRAW_CARD, MAKE_DECK, FOLD_DECK } from '../../actions/player/deck';
import currentDeck from '../../../data/currentDeck.json';

function findCard(card) {
  return card.db_id === this[0];
}

function makeDeck(cards) {
  let deck = [];
  for (let currentCard of currentDeck.cards) {
    let card = cards.find(findCard, [currentCard]);
    if (card.type !== 'PLOT') {
      deck.push({...card, "uid": uuid.v4(), "cardlocation": "DECK"});
    };
  };
  return deck;
}
const initialState = [];

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD: {
      if (state.length > 0) {
        return state.filter(card => card.uid !== action.uid);
      }
      return state;
    }
    case MAKE_DECK: {
      const deck = makeDeck(action.cards);
      return arrayShuffle(deck);
    }
    case FOLD_DECK:
      return [];
    default:
      return state;
  }
}

export default deckReducer;
