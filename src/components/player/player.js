import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Deck from '../deck/Deck';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

const Player = ({ deck, cards, locations, onDeckClick, onPlayLocation }) => {
  console.log(cards);
  return(
    <div className='player'>
      <Character />
      <Location cards={locations} onPlayLocation={onPlayLocation} />
      <div className='cards-zone'>
        <Deck deck={deck} onDeckClick={onDeckClick} />
        <Hand cards={cards} />
      </div>
    </div>
  );
}

Player.propTypes = {
  deck: PropTypes.array.isRequired,
  cards: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  onDeckClick: PropTypes.func.isRequired,
  onPlayLocation: PropTypes.func.isRequired,
}

export default DragDropContext(HTML5Backend)(Player);
