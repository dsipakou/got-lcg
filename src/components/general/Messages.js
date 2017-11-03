import React from 'react';
import PropTypes from 'prop-types';
import './Messages.scss';

const Messages = ({text}) => {
  return (
    <div className="message-overlay">
      {text}
    </div>
  )
}

Messages.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Messages;
