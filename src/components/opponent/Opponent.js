import React from 'react';
import PropTypes from 'prop-types';
import OpponentLocation from '../location/OpponentLocation';
import './Opponent.scss';

const Opponent = ({socket, actions, characters, locations, characterActions }) => {

  console.log(actions);
  return (
    <div className='opponent-inner'>
       <OpponentLocation socket={socket} cards={locations} actions={actions} />
    </div>
  )
}

Opponent.propTypes = {
  socket: PropTypes.object.isRequired,
  actions: PropTypes.object,
  characters: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
}

export default Opponent;
