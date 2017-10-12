import { ADD_OPPONENT_CHARACTER, KNEEL_OPPONENT_CHARACTER, STAND_OPPONENT_CHARACTER, REMOVE_OPPONENT_CHARACTER } from '../../actions/opponent/opponentCharacter';
import update from 'react-addons-update'

function opponentCharacterReducer(state = [], action) {
  switch (action.type) {
    case ADD_OPPONENT_CHARACTER:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'CHARACTER'}
        }
      }).payload
      return [
        ...state,
        card
      ]
    case KNEEL_OPPONENT_CHARACTER:
      return update(state, {
          [action.index]: {
            kneel: {$set: true}
          }
        })
    case STAND_OPPONENT_CHARACTER:
      return update(state, {
        [action.index]: {
          kneel: {$set: false}
        }
      })
    default:
      return state
  }
}

export default opponentCharacterReducer;
