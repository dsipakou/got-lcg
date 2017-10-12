import { ADD_EVENT, DELETE_EVENT } from '../../actions/player/event';
import update from 'react-addons-update';

function eventReducer(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      const card = update(action, {
        payload: {
          cardlocation: {$set: 'EVENT'}
        }
      }).payload
      return card;
    case DELETE_EVENT:
      return {}
    default:
      return state;
  }
}

export default eventReducer;
