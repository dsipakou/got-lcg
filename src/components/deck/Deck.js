import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Deck.scss';

const Deck = ({deck, onDeckClick}) => {
  const draw = () => {
    onDeckClick(deck.length)
  }
  return (
    <div className='deck-inner' onClick={draw}><span>Click to draw</span>
      <div className='deck-spinner'></div>
    </div>
  )
}

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  onDeckClick: PropTypes.func.isRequired
}

export default Deck;
