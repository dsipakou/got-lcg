import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragableCard from '../../containers/dragablecard/DragableCard'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './hand.scss';

const Hand =({ cards, playCard }) => {
  return (
    <div className='hand'>
      { cards.map((card, index) => (
        <DragableCard {...card} index={index} key={card.id} />
      )) }
    </div>
  );
}

Hand.propTypes = {
  cards: PropTypes.array,
}

export default Hand;
