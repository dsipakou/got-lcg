export const ADD_LOCATION = 'ADD_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

export const addLocation = (card) => {
  return {
    type: ADD_LOCATION,
    card
  }
}

export const removeLocation = (card) => {
  return {
    type: REMOVE_LOCATION,
    card 
  }
}
