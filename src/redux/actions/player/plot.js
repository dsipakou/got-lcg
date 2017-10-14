import { removePlotFromDeck } from './plotDeck';
import { getGold } from './properties';

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
    const gold = card.gold;
    dispatch(addPlot(card))
    dispatch(removePlotFromDeck(card.uid))
    dispatch(getGold(gold))
  }
}
