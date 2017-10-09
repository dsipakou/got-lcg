import { ADD_EVENT } from '../actions/event';
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
    default:
      return state;
  }
}

export default eventReducer;
