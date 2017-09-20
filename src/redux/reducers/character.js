import { ADD_CHARACTER, KNEEL_CHARACTER, STAND_CHARACTER, REMOVE_CHARACTER } from '../actions/character';
import update from 'react-addons-update'

function characterReducer(state = [], action) {
  switch (action.type) {
    case ADD_CHARACTER:
      return [
        ...state,
        action.payload
      ]
    case KNEEL_CHARACTER:
      return update(state, {
          [action.index]: {
            kneel: {$set: true}
          }
        })
    case STAND_CHARACTER:
      return update(state, {
        [action.index]: {
          kneel: {$set: false}
        }
      })
    default:
      return state
  }
}

export default characterReducer;
