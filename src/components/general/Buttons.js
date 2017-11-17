import React from 'react';
import PropTypes from 'prop-types';

const doneButtonProps = {
  gameflow: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
}

export const DoneButton = ({gameflow, socket}) => {
  const doneClick = () => {
    if (gameflow.payload.isOpponentDone) {
      gameflow.actions.gotoNext();
      socket.emit('game:nextphase');
    } else {
      gameflow.actions.yourTurn(false);
      socket.emit('opponent:done');
    }
  }

  return (
    <div>
      <button onClick={doneClick}>Im done</button>
    </div>
  )
}

DoneButton.propTypes = doneButtonProps;
