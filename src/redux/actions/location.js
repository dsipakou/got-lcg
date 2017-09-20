export const ADD_LOCATION = 'ADD_LOCATION';
export const KNEEL_LOCATION = 'KNEEL_LOCATION';
export const REMOVE_LOCATION = 'REMOVE_LOCATION';

export const addLocation = (card) => {
  return {
    type: ADD_LOCATION,
    card
  }
}

export const kneelLocation = (index) => {
  return {
    type: KNEEL_LOCATION,
    index
  }
}

export const removeLocation = (card) => {
  return {
    type: REMOVE_LOCATION,
    card
  }
}
