import React from 'react';
import PropTypes from 'prop-types';

const Room = ({socket, actions}) => {

  const createRoom = () => {
    actions.newRoom();
  }
  return (
    <div>
      <button onClick={createRoom}>Create new room</button>
    </div>
  )
}

Room.propTypes = {
  actions: PropTypes.shape({
    newRoom: PropTypes.func.isRequired,
  })
}

export default Room;
