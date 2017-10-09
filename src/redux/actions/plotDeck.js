export const DRAW_PLOT = "DRAW_PLOT"

export const removePlotFromDeck = (uid) => {
  return {
    type: DRAW_PLOT,
    uid
  }
}
