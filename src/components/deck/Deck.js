import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Deck.scss';

const Deck = ({deck, actions}) => {
  const draw = () => {
    actions.drawCard(deck.length)
  }
  return (
    <div className='deck-inner' onClick={draw}><span>Click to draw</span>
      <div className='deck-spinner'></div>
    </div>
  )
}

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    drawCard: PropTypes.func.isRequired,
  })
}

export default Deck;
