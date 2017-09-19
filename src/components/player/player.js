import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Event from '../event/Event';
import Deck from '../deck/Deck';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

const Player = ({ deck, hand, locations, characters, onDeckClick, onPlayLocation, onPlayCharacter }) => {
  return(
    <div className='player'>
      <div className='play-zone'>
        <div className='events'>
          <Event />
        </div>
        <div className='permanent-cards'>
          <Character cards={characters} onPlayCharacter={onPlayCharacter} />
          <Location cards={locations} onPlayLocation={onPlayLocation} />
        </div>
        <div className='help-zone'>
        </div>
      </div>
      <div className='cards-zone'>
        <Deck deck={deck} onDeckClick={onDeckClick} />
        <Hand cards={hand} />
      </div>
    </div>
  );
}

Player.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  onDeckClick: PropTypes.func.isRequired,
  onPlayLocation: PropTypes.func.isRequired,
  onPlayCharacter: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(Player);
