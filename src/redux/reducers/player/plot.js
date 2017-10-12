import { ADD_PLOT } from '../../actions/player/plot';

function plotReducer(state = [], action) {
  switch (action.type) {
    case ADD_PLOT:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}

export default plotReducer;
