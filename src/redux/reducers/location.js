import {ADD_LOCATION, KNEEL_LOCATION, REMOVE_LOCATION} from '../actions/location';
import update from 'react-addons-update';

function locationReducer(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        action.card
      ]
    case KNEEL_LOCATION:
      console.log('index', action.index);
      console.log('state', state);
      return update(state, {
          [action.index]: {
            kneel: {$set: true}
          }
        })
    default:
      return state;
  }
}

export default locationReducer;
