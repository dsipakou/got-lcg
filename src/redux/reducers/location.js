import {ADD_LOCATION, REMOVE_LOCATION} from '../actions/location';

function locationReducer(state = [], action) {
  switch (action.type) {
    case ADD_LOCATION:
      return [
        ...state,
        action.card
      ]
    default:
      return state;
  }
}

export default locationReducer;
