export const ADD_CHARACTER = 'ADD_CHARACTER';
export const KNEEL_CHARACTER = 'KNEEL_CHARACTER';
export const STAND_CHARACTER = 'STAND_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';

export const addCharacter = (payload) => {
  return {
    type: ADD_CHARACTER,
    payload
  }
}

export const kneelCharacter = (index) => {
  return {
    type: KNEEL_CHARACTER,
    index
  }
}

export const standCharacter = (index) => {
  return {
    type: STAND_CHARACTER,
    index
  }
}
