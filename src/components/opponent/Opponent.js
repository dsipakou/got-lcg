import React from 'react';
import OpponentLocation from '../location/OpponentLocation';
import './Opponent.scss';

const Opponent = ({characters, locations, characterActions, locationActions}) => {
  return (
    <div className='opponent-inner'>
       <OpponentLocation cards={locations} />
    </div>
  )
}

export default Opponent;
