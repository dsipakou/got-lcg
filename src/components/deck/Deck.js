import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Deck.scss';

const Deck = ({ deck, action }) => {
  const doAction = () => {
    action(deck.length)
  }
  return (
    <div className='deck-inner' onClick={doAction}><span>Click to draw</span>
      <div className='deck-spinner'></div>
    </div>
  )
}

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  action: PropTypes.func
}

export default Deck;
