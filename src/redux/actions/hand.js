import { addLocation } from './location'
import { addCharacter } from './character'
import { addEvent } from './event'
import { addCardToDiscard } from './discardPile';
import { discardEvent } from './event';

export const ADD_CARD_TO_HAND = 'ADD_CARD_TO_HAND'
export const REMOVE_CARD_FROM_HAND = 'REMOVE_CARD_FROM_HAND'
export const PLAY_LOCATION = 'PLAY_LOCATION'
export const LOG_CARD = 'LOG_CARD'
export const FOLD_HAND = 'FOLD_HAND'


export const addCardToHand = (payload) => {
  return {
    type: ADD_CARD_TO_HAND,
    payload
  }
}

export const removeCardFromHand = (index) => {
  return {
    type: REMOVE_CARD_FROM_HAND,
    index
  }
}

export const foldHand = () => {
  return {
    type: FOLD_HAND
  }
}

export const playLocation = (payload) => {
  return dispatch => {
    dispatch(addLocation(payload));
    dispatch(removeCardFromHand(payload.index));
  }
}

export const playCharacter = (payload) => {
  return dispatch => {
    dispatch(addCharacter(payload));
    dispatch(removeCardFromHand(payload.index));
  }
}

export const playEvent = (payload) => {
  return (dispatch, getState) => {
    const event = getState().eventReducer;
    if (typeof event.uid !== 'undefined') {
      dispatch(discardEvent(event));
    }
    dispatch(addEvent(payload));
    dispatch(removeCardFromHand(payload.index));
  }
}
