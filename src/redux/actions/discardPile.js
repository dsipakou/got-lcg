export const ADD_CARD_TO_DISCARD = 'ADD_CARD_TO_DISCARD'

export const addCardToDiscard = (payload) => {
  return {
    type: ADD_CARD_TO_DISCARD,
    payload
  }
}
