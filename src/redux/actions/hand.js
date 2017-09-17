export const PLAY_CARD = 'PLAY_CARD'
export const ADD_CARD_TO_HAND = 'ADD_CARD_TO_HAND'
export const LOG_CARD = 'LOG_CARD'

export const playCard = (card) => {
  return {
    type: PLAY_CARD,
    card
  }
}

export const addCardToHand = (payload) => {
  return {
    type: ADD_CARD_TO_HAND,
    payload
  }
}
