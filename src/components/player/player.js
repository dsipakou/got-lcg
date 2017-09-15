import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Deck from '../deck/Deck';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

const Player = ({ cards, locations, onDeckClick, onPlayCard, onAddLocation }) => {
  return(
    <div className='player'>
      <Character onPlayCard={onPlayCard} />
      <Location cards={locations} onPlayCard={onPlayCard} onAddLocation={onAddLocation}/>
      <div className='cards-zone'>
        <Deck onDeckClick={onDeckClick} />
        <Hand cards={cards} />
      </div>
    </div>
  );
}

Player.propTypes = {
  cards: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  onDeckClick: PropTypes.func.isRequired,
  onPlayCard: PropTypes.func.isRequired,
  onAddLocation: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(Player);
