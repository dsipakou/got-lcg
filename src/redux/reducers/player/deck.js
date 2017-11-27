import { addCardToHand } from '../../actions/player/hand';
import { getCard } from '../../actions/player/deck';
import arrayShuffle from 'array-shuffle';
import uuid from 'uuid';
import { DRAW_CARD, MAKE_DECK } from '../../actions/player/deck';
import currentDeck from '../../../data/currentDeck.json';

/*const cards = fetch(`http://127.0.0.1:8000/cards/`)
              .then(response => response.json())
              .catch(error => {throw error});*/

function findCard(card) {
  return card.db_id === this[0];
}

function makeDeck(cards) {
  let deck = [];
  for (let currentCard of currentDeck.cards) {
    let card = cards.find(findCard, [currentCard]);
    if (card.type !== 'PLOT') {
      deck.push({...card, "uid": uuid.v4(), "cardlocation": "DECK"});
    }
  }

  return deck;
}



// const arr = cards.filter((card) => {
//   if (card.type !== 'PLOT') {
//     return card;
//   }
// }).map(card => { return { "uid": uuid.v4(), "cardlocation": "DECK", ...card }});

const initialState = [];

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      }
      return state;
    case MAKE_DECK:
      let deck = makeDeck(action.cards);
      return arrayShuffle(deck);
    default:
      return state;
  }
}

export default deckReducer
