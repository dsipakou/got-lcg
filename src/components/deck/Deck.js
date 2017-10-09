import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Deck.scss';

const Deck = ({ deck, action }) => {
  const doAction = () => {
    action(deck.length)
  }

  let deckClass = classNames({
    'deck-inner': true,
    'empty-deck': deck.length == 0
  });

  return (
    <div className={deckClass} onClick={doAction}>
      <div className='deck-spinner'></div>
    </div>
  )
}

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  action: PropTypes.func
}

export default Deck;
