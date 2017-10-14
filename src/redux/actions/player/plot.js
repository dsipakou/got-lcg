import { removePlotFromDeck } from './plotDeck';
import { getGold, getInitiative, getClaim } from './properties';

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
    const { gold, initiative, claim } = card;
    dispatch(addPlot(card))
    dispatch(removePlotFromDeck(card.uid))
    dispatch(getGold(gold))
    dispatch(getInitiative(initiative))
    dispatch(getClaim(claim))
  }
}
