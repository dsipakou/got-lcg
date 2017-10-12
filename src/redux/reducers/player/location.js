import {ADD_LOCATION, KNEEL_LOCATION, STAND_LOCATION, REMOVE_LOCATION} from '../../actions/player/location';
import update from 'react-addons-update';

function locationReducer(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'LOCATION'}
        }
      }).payload
      return [
        ...state,
        card
      ]
    case KNEEL_LOCATION:
      return update(state, {
          [action.index]: {
            kneel: {$set: true}
          }
        })
    case STAND_LOCATION:
      return update(state, {
        [action.index]: {
          kneel: {$set: false}
        }
      })
    default:
      return state;
  }
}

export default locationReducer;
