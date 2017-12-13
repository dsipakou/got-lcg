import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import './card.scss';

const Card = ({
  name,
  kneel,
  plot,
  opponent,
  image_url,
  revealed,
  isDragging,
}) => {
  const cardClass = classNames({
    'card': true,
    'card-kneeled': kneel,
    'card-opponent': opponent,
    'plot': plot,
  });
  return (
    <div className={cardClass} style={{ opacity: isDragging ? 0.5 : 1 }}>
      { revealed && <img src={image_url} alt={name} /> }
    </div>
  );
};

Card.propTypes = {
  uid: PropTypes.string.isRequired,
  image_url: PropTypes.string,
  name: PropTypes.string,
  kneel: PropTypes.bool,
  type: PropTypes.string,
  cardlocation: PropTypes.string.isRequired,
  kneel: PropTypes.bool,
  plot: PropTypes.bool,
  revealed: PropTypes.bool,
  opponent: PropTypes.bool,
  action: PropTypes.func,
  isDragging: PropTypes.bool,
};

Card.defaultProps = {
  isDraggins: false,
  revealed: true,
  kneel: false,
  plot: false,
}

export default Card;
