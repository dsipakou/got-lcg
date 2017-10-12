export const ADD_OPPONENT_LOCATION = 'ADD_OPPONENT_LOCATION';
export const KNEEL_OPPONENT_LOCATION = 'KNEEL_OPPONENT_LOCATION';
export const STAND_OPPONENT_LOCATION = 'STAND_OPPONENT_LOCATION';
export const REMOVE_OPPONENT_LOCATION = 'REMOVE_OPPONENT_LOCATION';

export const addOpponentLocation = (payload) => {
  return {
    type: ADD_OPPONENT_LOCATION,
    payload
  }
}

export const kneelOpponentLocation = (index) => {
  return {
    type: KNEEL_OPPONENT_LOCATION,
    index
  }
}

export const standOpponentLocation = (index) => {
  return {
    type: STAND_OPPONENT_LOCATION,
    index
  }
}

export const removeOpponentLocation = (card) => {
  return {
    type: REMOVE_OPPONENT_LOCATION,
    card
  }
}
