import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { connect } from 'react-redux';
import { playCard } from '../../redux/actions/card';
import { bindActionCreators } from 'redux';
import './hand.scss';

class Hand extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { cards, playCard } = this.props;
    console.log(cards)
    return (
      <div className='hand'>
        { cards.map((card, index) => (
          <Card {...card} index={index} key={card.id} revealed={card.revealed} name={card.name} onCardClick={playCard}/>
        )) }
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array,
  playCard: PropTypes.func.isRequired,
}

export default Hand;
