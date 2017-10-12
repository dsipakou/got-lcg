import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Deck.scss';

const Deck = ({ deck, text, plot }) => {

  let deckClass = classNames({
    'deck-inner': true,
    'empty-deck': deck.length == 0,
    'plot': plot,
  });

  return (
    <div className={deckClass}>
      <span>{text}</span>
      <div className='deck-spinner'></div>
    </div>
  )
}

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  text: PropTypes.string,
  plot: PropTypes.bool,
}

Deck.defaultTypes = {
  plot: false,
}

export default Deck;
