export const SET_GOLD = 'SET_GOLD';
export const SET_INITIATIVE = 'SET_INITIATIVE';
export const SET_CLAIM = 'SET_CLAIM';
export const SPEND_GOLD = 'SPEND_GOLD';

export const setGold = (payload) => {
  return {
    type: SET_GOLD,
    payload
  }
}

export const setInitiative = (payload) => {
  return {
    type: SET_INITIATIVE,
    payload
  }
}

export const setClaim = (payload) => {
  return {
    type: SET_CLAIM,
    payload,
  }
}

export const spendGold = (payload) => {
  return {
    type: SPEND_GOLD,
    payload
  }
}
