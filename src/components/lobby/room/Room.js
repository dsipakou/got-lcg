import React from 'react';
import PropTypes from 'prop-types';

const Room = (newRoom) => {
  console.log(newRoom);

  const createRoom = (data) => {
    console.log(typeof newRoom);
    newRoom.newRoom(data);
  }
  return (
    <div>
      <button onClick={createRoom}>Create new room</button>
    </div>
  )
}

Room.propTypes = {
  newRoom: PropTypes.func.isRequired,
}

export default Room;
