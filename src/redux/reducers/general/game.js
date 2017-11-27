import { UPDATE_MACHINE } from '../../actions/general/game';

export default function gameReducer(state = [], action) {
  switch (action.type) {
    case UPDATE_MACHINE:
      return action.payload;
    default:
      return state;
  }
}
