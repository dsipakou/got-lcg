import { addCardToHand, foldHand } from './hand';

export const DRAW_CARD = 'DRAW_CARD';
export const ADD_CARD_TO_HAND = 'ADD_CARD_TO_HAND';
export const MAKE_DECK = 'MAKE_DECK';
const START_HAND_SIZE = 7;

export const removeDeckCard = (uid) => {
  return {
    type: DRAW_CARD,
    uid
  };
};

export const makeDeckFromCardArray = (cards) => {
  return {
    type: MAKE_DECK,
    cards,
  };
};

const shouldMakeDeck = (state) => {
  const cards = state.player.deckReducer;
  if (cards.length === 0) {
    return true;
  }
  return false;
};

export const makeDeck = () => {
  return (dispatch, getState) => {
    if (shouldMakeDeck(getState())) {
      return fetch('http://localhost:8000/cards')
        .then(response => response.json())
        .then(json => dispatch(makeDeckFromCardArray(json)));
    }
    Promise.resolve();
  };
};

export const drawCard = () => {
  return (dispatch, getState) => {
    const deck = getState().player.deckReducer;
    if (deck.length > 0) {
      const lastCard = deck[deck.length - 1];
      dispatch(addCardToHand(lastCard));
      dispatch(removeDeckCard(lastCard.uid));
    }
  }
}

export const getStartHand = () => {
  return (dispatch, getState) => {
    for (var i = 0; i < START_HAND_SIZE; i++) {
      const deck = getState().player.deckReducer;
      if (deck.length > 0) {
        const lastCard = deck[deck.length - 1];
        dispatch(addCardToHand(lastCard));
        dispatch(removeDeckCard(lastCard.uid));
      }
    }
  }
}

export const doMulligan = () => {
  return (dispatch) => {
    dispatch(foldHand());
    dispatch(makeDeck());
  }
}
