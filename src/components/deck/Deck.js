import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Deck.scss';

const Deck = (onClick) => {
  return (
    <div className='deck-inner' onClick={onClick}>Deck here</div>
  )
}

Deck.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Deck;
