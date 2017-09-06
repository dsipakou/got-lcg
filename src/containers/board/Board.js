import React, {Component} from 'react';
import Player from '../../components/player/player';
import './board.scss'

class Board extends Component {
  render() {
    return (
    <div className='board'>Board here
      <Player />
    </div>
    );
  }
}

export default Board;
