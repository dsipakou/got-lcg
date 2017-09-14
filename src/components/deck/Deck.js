import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Deck.scss';

const Deck = (onDeckClick) => {
  return (
    <div className='deck-inner' onClick={onDeckClick}>Deck here</div>
  )
}

Deck.propTypes = {
  onDeckClick: PropTypes.func.isRequired
}

export default Deck;
