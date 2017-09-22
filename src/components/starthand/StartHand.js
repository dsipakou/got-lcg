import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StartHand.scss';
import Card from '../../components/card/Card';
import Deck from '../../components/deck/Deck';

const StartHand = ({ deck, hand, deckActions }) => {
  return (
    <div className='starthand-inner'>
      <div className='starthand-header'>StartHand</div>
      <div className='starthand-content'>
        {
          hand.map((card, index) => (
            <Card {...card} index={index} key={card.uid} isDragging={false} />
          ))
        }
      </div>
      <div className='starthand-footer'>
        <Deck deck={deck} action={deckActions.getStartHand} />
      </div>
    </div>
  )
}

StartHand.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array,
  deckActions: PropTypes.shape({
    getStartHand: PropTypes.func
  })
}


export default StartHand;
