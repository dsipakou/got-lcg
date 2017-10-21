import React from 'react';
import Deck from '../Deck';
import PropTypes from 'prop-types';

const MainDeck = ({ deck, action, gameflow }) => {

  const drawCard = () => {
    action()
  }

  if (gameflow.states.isDrawPhase) {
    drawCard();
    drawCard();
    gameflow.actions.gotoMarshal();
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
  gameflow: PropTypes.object.isRequired,
}

export default MainDeck;
