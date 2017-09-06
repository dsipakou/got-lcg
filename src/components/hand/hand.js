import React, { Component } from 'react';
import Card from '../card/card';
import './hand.scss';

class Hand extends Component {
  render() {
    return (
      <div className='hand'>
        <Card own={true} />
        <Card own={true} />
        <Card own={false} />
      </div>
    );
  }
}

export default Hand;
