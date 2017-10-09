import React from 'react';
import PropTypes from 'prop-types';
import Deck from '../../deck/Deck';

const Plot = ({cards}) => {
  return (
    <div>
      <Deck deck={cards} />
    </div>
  )
}

Plot.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default Plot;
