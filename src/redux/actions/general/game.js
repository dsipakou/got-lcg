export const NEW_GAME = 'NEW_GAME';
export const UPDATE_MACHINE = 'UPDATE_MACHINE';

export const newGame = () => {
  return {
    type: NEW_GAME,
  };
};

export const updateMachine = (payload) => {
  return {
    type: UPDATE_MACHINE,
    payload: payload,
  };
};
