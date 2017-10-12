import { PLAY_PLOT } from '../../actions/player/plot';

function plotReducer(state = [], action) {
  switch (action.type) {
    case PLAY_PLOT:
      return [
        ...state,
        action.payload
      ]
    default:
      return state;
  }
}

export default plotReducer;
