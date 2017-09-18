export const PLAY_CARD = 'PLAY_CARD'
export const DRAW_CARD = 'DRAW_CARD'
export const LOG_CARD = 'LOG_CARD'

export const playCard = (card) => {
  return {
    type: PLAY_CARD,
    card
  }
}

let cardId = 0;

export const drawCard = (length) => {
  let index = Math.floor((Math.random() * length) + 1);
  return {
    type: DRAW_CARD,
    id: cardId++,
    index: index
  }
}
