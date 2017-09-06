import React, {Component} from 'react';
import Card from '../../components/card/Card';
import './board.scss'

class Board extends Component {
  render() {
    return (
    <span className='board'>Board here
      <Card/>
      <Card name="test name here" />
    </span>
    );
  }
}

export default Board;
