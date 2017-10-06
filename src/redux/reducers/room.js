import { NEW_ROOM } from '../actions/room';
import uuid from 'uuid';

function roomReducer(state = [], action) {
  switch (action.type) {
    case NEW_ROOM:
      return [
        ...state,
        {
          id: uuid.v4()
        }
      ]
    default:
      return state;
  }
}

export default roomReducer;
