export const NEW_ROOM = 'NEW_ROOM';

export const newRoom = (id) => {
  return {
    type: NEW_ROOM,
    id: id
  }
}
