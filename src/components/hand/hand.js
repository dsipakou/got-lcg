import React, { Component } from 'react';
import Card from '../card/card';
import './hand.scss';

class Hand extends Component {
  render() {
    return (
      <div className='hand'>
        <Card />
        <Card />
        <Card />
      </div>
    );
  }
}

export default Hand;
