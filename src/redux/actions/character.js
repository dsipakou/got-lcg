export const ADD_CHARACTER = 'ADD_CHARACTER';
export const REMOVE_CHARACTER = 'REMOVE_CHARACTER';

export const addCharacter = (payload) => {
  return {
    type: ADD_CHARACTER,
    payload
  }
}
