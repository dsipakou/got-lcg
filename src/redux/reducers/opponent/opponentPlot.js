import { ADD_OPPONENT_PLOT } from '../../actions/opponent/opponentPlot';

const opponentPlotReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_OPPONENT_PLOT:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}

export default opponentPlotReducer;
