import { addCardToHand } from './hand';

export const GET_CARD = 'GET_CARD'
export const DRAW_CARD = 'DRAW_CARD'
export const CARD_LOCATION = {
  DECK: "DECK",
  HAND: "HAND",
  LOCATION: "LOCATION"
}

export const getCard = (index) => {
  return {
    type: GET_CARD,
    index
  }
}

let cardId = 0;

export const removeDeckCard = (uid) => {
  return {
    type: DRAW_CARD,
    uid
  }
}

export function drawCard() {
  return (dispatch, getState) => {
    const deck = getState().deckReducer;
    if (deck.length > 0) {
      const lastCard = deck[deck.length - 1];
      dispatch(addCardToHand(lastCard));
      dispatch(removeDeckCard(lastCard.uid));
    }
  }
}
