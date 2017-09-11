import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import './hand.scss';

class Hand extends Component {
  constructor(props) {
    super(props);
    this.cards = [
      {id: 23, revealed: true, name: 'New card'},
      {id: 543, revealed: false, name: 'Old card'},
      {id: 54, revealed: true, name: 'Funny card'},
      {id: 44, revealed: true, name: 'One more card'}
    ]
  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <div className='hand'>
        { this.cards.map((card, index) => (
          <Card {...card} index={index} key={card.id} revealed={card.revealed} name={card.name} />
        )) }
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array
}

export default Hand;
