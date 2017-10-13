import React from 'react';
import PropTypes from 'prop-types';
import OpponentLocation from '../location/OpponentLocation';
import OpponentCharacter from '../character/OpponentCharacter';
import OpponentPlot from '../plot/OpponentPlot';
import './Opponent.scss';

const Opponent = ({
  socket,
  actions,
  locations,
  locationActions,
  characters,
  characterActions,
  plotInPlay,
  plotActions,
}) => {

  return (
    <div className='opponent-inner'>
      <OpponentCharacter socket={socket} cards={characters} actions={characterActions} />
      <OpponentLocation socket={socket} cards={locations} actions={locationActions} />
      <OpponentPlot socket={socket} cards={plotInPlay} actions={plotActions} />
    </div>
  )
}

Opponent.propTypes = {
  socket: PropTypes.object.isRequired,
  actions: PropTypes.object,
  characters: PropTypes.array.isRequired,
  characterActions: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
  locationActions: PropTypes.object.isRequired,
  plotInPlay: PropTypes.array.isRequired,
  plotActions: PropTypes.object.isRequired,
}

export default Opponent;
