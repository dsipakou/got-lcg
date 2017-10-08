import { ADD_EVENT } from '../actions/event';

function eventReducer(state = {}, action) {
  switch (action.type) {
    case ADD_EVENT:
      return action.payload;
    default:
      return state;
  }
}

export default eventReducer;
