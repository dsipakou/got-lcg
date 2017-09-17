import { addCardToHand } from '../actions/hand';
import { getCard } from '../actions/deck';
import arrayShuffle from 'array-shuffle';
import { DRAW_CARD, GET_CARD, CARD_LOCATION } from '../actions/deck';
import cards from '../../data/cards.json';
import update from 'react-addons-update';

let uid = 0;
const arr = cards.map(card => {return { "uid": uid++, location: CARD_LOCATION.DECK,  ...card }})
const initialState = arrayShuffle(arr);

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      let index = state.lastIndexOf((card) => card.location === CARD_LOCATION.DECK );
      console.log('index', index);
      index = 1;
      return update(state, {
        [index]: {
          location: {$set: CARD_LOCATION.HAND}
        }
      })


      return state;
    case GET_CARD:
      return state;
    default:
      return state;
  }
}

export default deckReducer
