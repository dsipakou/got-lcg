import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Deck from '../deck/Deck';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

class Player extends Component {

  render() {
    const { cards } = this.props
    
    return(
      <div className='player'>
        <Character />
        <Location />
        <div>
          <Deck />
          <Hand cards={cards} />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  cards: PropTypes.array.isRequired
}

export default DragDropContext(HTML5Backend)(Player);
