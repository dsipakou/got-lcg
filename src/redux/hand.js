import { createStore } from 'redux';

const initialState = [
  {id: 23, revealed: true, name: 'Lannister', type: 'CHARACTER'},
  {id: 543, revealed: false, name: 'Stark', type: 'CHARACTER'},
  {id: 54, revealed: true, name: 'Winterfell', type: 'LOCATION'},
  {id: 44, revealed: true, name: 'Wall', type: 'LOCATION'}
]

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case 'PLACE_CARD':
      const index = action.index;
      const length = action.length;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, length),
      ];
    case 'LOG_CARD':
      console.log(action.card);
      return state;
    default:
      return state;
  }
}

export default deckReducer;
