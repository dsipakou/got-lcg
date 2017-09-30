import React from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';

const OpponentCharacter = ({socket, cards, actions}) => {
  socket.on('add character', (data) => {
    actions.addOpponentCharacter(data.action.payload);
  })
  return (
    <div className='character-inner'>
      {cards.map((card, index) => (
        <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
      ))}
    </div>
  )
}

OpponentCharacter.propTypes = {
  socket: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentCharacter;
