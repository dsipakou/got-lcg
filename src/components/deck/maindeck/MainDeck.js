import React from 'react';
import Deck from '../Deck';
import PropTypes from 'prop-types';

const MainDeck = ({ deck, action }) => {
  const drawCard = () => {
    action()
  }

  return (
    <div onClick={drawCard}>
      <Deck deck={deck} text="Click to Draw"/>
    </div>
  )
}

MainDeck.propTypes = {
  deck: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
}

export default MainDeck;
