import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';
import './location.scss';

const OpponentLocation = ({cards}) => {
  return (
    <div className='location-inner'>
      {cards.map((card, index) => (
        <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
      ))}
    </div>
  )
}

OpponentLocation.propTypes = {
  cards: PropTypes.array.isRequired
}

export default OpponentLocation;
