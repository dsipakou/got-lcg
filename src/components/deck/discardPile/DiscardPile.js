import React from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck';

const DiscardPile = (cards) = {
  return (
    <div>
      <Deck deck={cards} text="Discard Pile" />
    </div>
  )
}

DiscardPile.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default DiscardPile;
