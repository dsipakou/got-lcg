import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './Deck.scss';

const Deck = ({
  deck,
  text,
  plot,
  revealed,
}) => {
  const emptyDeck = deck.length === 0;

  const deckClass = classNames({
    'deck-inner': true,
    'empty-deck': emptyDeck,
    plot,
    revealed,
  });

  const topCard = !emptyDeck ? deck[deck.length - 1] : 0;

  return (
    <div className={deckClass}>
      { revealed && !emptyDeck && <img src={topCard.image_url} alt="Card" />}
      { (!revealed || emptyDeck) && <span>{text}</span>}
      <div className="deck-spinner" />
    </div>
  );
};

Deck.propTypes = {
  deck: PropTypes.array.isRequired,
  text: PropTypes.string,
  plot: PropTypes.bool,
  revealed: PropTypes.bool,
};

Deck.defaultTypes = {
  plot: false,
  revealed: false,
};

export default Deck;
