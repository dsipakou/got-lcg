import { addCardToDiscard } from './discardPile';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';

export const addEvent = (payload) => {
  return {
    type: ADD_EVENT,
    payload
  }
}

export const deleteEvent = () => {
  return {
    type: DELETE_EVENT
  }
}

export const discardEvent = (event) => {
  return (dispatch) => {
    dispatch(deleteEvent())
    dispatch(addCardToDiscard(event))
  }
}
