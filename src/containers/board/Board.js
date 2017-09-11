import React, {Component} from 'react';
import Player from '../../components/player/player';
import Opponent from '../opponent/opponent';
import './board.scss'

class Board extends Component {
  render() {
    return (
    <div className='board'>
      <Opponent />
      <Player />
    </div>
    );
  }
}

export default Board;
