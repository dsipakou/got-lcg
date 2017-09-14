export const PLAY_CARD = 'PLAY_CARD'
export const DRAW_CARD = 'DRAW_CARD'
export const LOG_CARD = 'LOG_CARD'

export const playCard = (index) => {
  return {
    type: 'PLAY_CARD',
    index
  }
}

export const drawCard = () => {
  return {
    type: 'DRAW_CARD'
  }
}
