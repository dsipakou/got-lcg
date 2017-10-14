import React from 'react';
import PropTypes from 'prop-types';

const Gold = ({gold}) => {
  return(
    <div>
      <h2>Gold</h2>
      {gold}
    </div>
  )
}

Gold.propTypes = {
  gold: PropTypes.number.isRequired,
}

export default Gold;
