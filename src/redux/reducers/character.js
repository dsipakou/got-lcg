import { ADD_CHARACTER, REMOVE_CHARACTER } from '../actions/character';

function characterReducer(state = [], action) {
  switch (action.type) {
    case ADD_CHARACTER:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}

export default characterReducer;
