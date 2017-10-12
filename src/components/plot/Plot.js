import React from 'react';
import Deck from '../deck/Deck';
import Card from '../card/Card';

const Plot = ({ cards }) => {
  const emptyDeck = cards.length == 0;
  const topCard = !emptyDeck ? cards[cards.length - 1] : 0
  return (
    <div>
      <h2>Plot in play</h2>
      <Deck deck={cards} plot={true} revealed={true} />
    </div>
  )
}

export default Plot;
