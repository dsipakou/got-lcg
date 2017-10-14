export const GET_GOLD = 'GET_GOLD';
export const GET_INITIATIVE = 'GET_INITIATIVE';
export const GET_CLAIM = 'GET_CLAIM';

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
