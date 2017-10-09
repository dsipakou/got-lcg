import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';

const DiscardPile = ({cards}) => {
  return (
    <div>
      {cards.map((card, index) => (
        <Card {...card} key={card.id} index={index} revealed={false} />
      ))}
    </div>
  )
}

DiscardPile.propTypes = {
  cards: PropTypes.array.isRequired
}

export default DiscardPile;
