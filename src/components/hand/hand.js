import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/card';
import { connect } from 'react-redux';
import './hand.scss';

class Hand extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const { cards } = this.props;
    return (
      <div className='hand'>
        { cards.map((card, index) => (
          <Card {...card} index={index} key={card.id} revealed={card.revealed} name={card.name} />
        )) }
      </div>
    );
  }
}

Hand.propTypes = {
  cards: PropTypes.array
}

export default connect(
  state => ({
    cards: state
  }),
  dispatch => ({})
)(Hand);
