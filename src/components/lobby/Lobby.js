import React from 'react';
import PropTypes from 'prop-types';

const Lobby = ({newGame}) => {
  const doAction = () => {
    newGame()
  }

  return (
    <div>Lobby here will be
      <button onClick={doAction}>start new game</button>
    </div>

  );
}

Lobby.propTypes = {
  newGame: PropTypes.func
}

export default Lobby;
