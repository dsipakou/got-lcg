import { DRAW_PLOT } from '../actions/plotDeck';

function plotDeckReducer(state = [], action) {
  switch (action.type) {
    case DRAW_PLOT:
      if (state.length > 0) {
        return state.filter(card => card.uid != action.uid);
      } else {
        return state;
      }
    default:
      return state;
  }
}

export default plotDeckReducer;
