import { NEW_GAME } from '../actions/game';

function gameReducer(state = [], action) {
  switch(action.type) {
    case NEW_GAME:
      return [
        ...state,
        {
          started: true
        }
      ]

    default:
      return state
  }
}

export default gameReducer;
