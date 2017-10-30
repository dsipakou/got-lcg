import { NEW_ROOM } from '../../actions/general/room';
import uuid from 'uuid';

function roomReducer(state = [], action) {
  switch (action.type) {
    case NEW_ROOM:
      return [
        ...state,
        {
          id: action.id
        }
      ]
    default:
      return state;
  }
}

export default roomReducer;
