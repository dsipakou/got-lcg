import { createStore } from 'redux';
import { PLAY_CARD, LOG_CARD, DRAW_CARD } from '../actions/card';

const initialState = [
  {id: 23, revealed: true, name: 'Lannister', type: 'CHARACTER'},
  {id: 543, revealed: false, name: 'Stark', type: 'CHARACTER'},
  {id: 54, revealed: true, name: 'Winterfell', type: 'LOCATION'},
  {id: 44, revealed: true, name: 'Wall', type: 'LOCATION'}
]

function deckReducer(state = initialState, action) {
  switch (action.type) {
    case DRAW_CARD:
      return [
        ...state,
        {id: action.id, revealed: true, name: 'new card', type: 'CHARACTER'}
      ]
    case PLAY_CARD:
      const index = action.index;
      const length = action.length;
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1, length),
      ];
    case LOG_CARD:
      return state;
    default:
      return state;
  }
}

export default deckReducer;
