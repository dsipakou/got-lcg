import { createStore } from 'redux';

const initialState = [
  {id: 23, revealed: true, name: 'New card'},
  {id: 543, revealed: false, name: 'Old card'},
  {id: 54, revealed: true, name: 'Funny card'},
  {id: 44, revealed: true, name: 'One more card'}
]

const deckReducer = (state = initialState, action) => {
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

const store = createStore(deckReducer)
