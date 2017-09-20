import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './hand.scss';

class Hand extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { cards, playCard } = this.props;
    return (
      <div className='hand'>
        { cards.map((card, index) => (
          <Card {...card} index={index} key={card.id} revealed={card.revealed} name={card.name} kneel={card.kneel} />
        )) }
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array,
}

export default Hand;
