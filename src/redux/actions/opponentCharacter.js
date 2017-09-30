export const ADD_OPPONENT_CHARACTER = 'ADD_OPPONENT_CHARACTER';
export const KNEEL_OPPONENT_CHARACTER = 'KNEEL_OPPONENT_CHARACTER';
export const STAND_OPPONENT_CHARACTER = 'STAND_OPPONENT_CHARACTER';
export const REMOVE_OPPONENT_CHARACTER = 'REMOVE_OPPONENT_CHARACTER';

export const addOpponentCharacter = (payload) => {
  return {
    type: ADD_OPPONENT_CHARACTER,
    payload
  }
}

export const kneelOpponentCharacter = (index) => {
  return {
    type: KNEEL_OPPONENT_CHARACTER,
    index
  }
}

export const standOpponentCharacter = (index) => {
  return {
    type: STAND_OPPONENT_CHARACTER,
    index
  }
}
