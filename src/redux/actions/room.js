export const NEW_ROOM = 'NEW_ROOM';

export const newRoom = (payload) => {
  return {
    type: NEW_ROOM,
    payload
  }
}
