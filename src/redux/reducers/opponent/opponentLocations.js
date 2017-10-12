import {ADD_OPPONENT_LOCATION, KNEEL_OPPONENT_LOCATION, STAND_OPPONENT_LOCATION, REMOVE_OPPONENT_LOCATION} from '../../actions/opponent/opponentLocation';
import update from 'react-addons-update';

function opponentLocationReducer(state = [], action) {
  switch (action.type) {
    case ADD_OPPONENT_LOCATION:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'LOCATION'}
        }
      }).payload
      return [
        ...state,
        card
      ]
    case KNEEL_OPPONENT_LOCATION:
      return update(state, {
          [action.index]: {
            kneel: {$set: true}
          }
        })
    case STAND_OPPONENT_LOCATION:
      return update(state, {
        [action.index]: {
          kneel: {$set: false}
        }
      })
    default:
      return state;
  }
}

export default opponentLocationReducer;
