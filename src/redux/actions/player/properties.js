export const GET_GOLD = 'GET_GOLD';
export const GET_INITIATIVE = 'GET_INITIATIVE';
export const GET_CLAIM = 'GET_CLAIM';
export const SPEND_GOLD = 'SPEND_GOLD';

export const getGold = (payload) => {
  return {
    type: GET_GOLD,
    payload
  }
}

export const getInitiative = (payload) => {
  return {
    type: GET_INITIATIVE,
    payload
  }
}

export const getClaim = (payload) => {
  return {
    type: GET_CLAIM,
    payload,
  }
}

export const spendGold = (payload) => {
  return {
    type: SPEND_GOLD,
    payload
  }
}
