import React, {Component} from 'react';
import Hand from '../hand/hand';
import './player.scss';

class Player extends Component {
  render() {
    return(
      <div className='player'>
        <div className='player-wrapper'>
          <Hand />
        </div>
      </div>
    );
  }
}

export default Player;
