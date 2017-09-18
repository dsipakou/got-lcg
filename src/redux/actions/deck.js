import { addCardToHand } from './hand';

export const DRAW_CARD = 'DRAW_CARD'

let cardId = 0;

export const removeDeckCard = (uid) => {
  return {
    type: DRAW_CARD,
    uid
  }
}

export const drawCard = () => {
  return (dispatch, getState) => {
    const deck = getState().deckReducer;
    if (deck.length > 0) {
      const lastCard = deck[deck.length - 1];
      dispatch(addCardToHand(lastCard));
      dispatch(removeDeckCard(lastCard.uid));
    }
  }
}
