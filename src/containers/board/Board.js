import React, {Component} from 'react';
import Card from '../../components/card/Card';
import './Board.scss'

class Board extends Component {
  render() {
    return (
    <span className='Board'>Board here
      <Card/>
      <Card name="test name here" />
    </span>
    );
  }
}

export default Board;
