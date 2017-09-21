import React, {Component} from 'react';
import Player from '../../components/player/player';
import PlayerContainer from '../../containers/player/PlayerContainer';
import Opponent from '../opponent/opponent';
import StartHand from '../../components/starthand/StartHand';
import './board.scss'

class Board extends Component {
  render() {
    return (
    <div className='board'>
      <PlayerContainer />
    </div>
    );
  }
}

export default Board;
