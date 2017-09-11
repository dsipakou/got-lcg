import React, {Component} from 'react';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

class Player extends Component {
  render() {
    return(
      <div className='player'>
        <Character />
        <Location />
        <Hand />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Player);
