import { removePlotFromDeck } from './plotDeck';

export const ADD_PLOT = 'ADD_PLOT';
export const PLAY_PLOT = 'PLAY_PLOT';

export const addPlot = (payload) => {
  return {
    type: ADD_PLOT,
    payload
  }
}

export const playPlot = (index) => {
  return (dispatch, getState) => {
    const card = getState().player.plotDeckReducer[index];
    dispatch(addPlot(card))
    dispatch(removePlotFromDeck(card.uid))
  }
}
