import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';
import './location.scss';

const OpponentLocation = ({socket, cards, actions}) => {
  socket.on('add location', (data) => {
    actions.addOpponentLocation(data.action.payload);
  })

  return (
    <div className='location-inner'>
      {cards.map((card, index) => (
        <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
      ))}
    </div>
  )
}

OpponentLocation.propTypes = {
  socket: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentLocation;
