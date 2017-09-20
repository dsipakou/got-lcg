import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import './card.scss';

const cardSource = {
  beginDrag(props) {
    return {
      card: props
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Card = ({name, kneel, image_url, revealed, isDragging, connectDragSource}) => {
  console.log('card', image_url)
  let cardTitle = null;
  if (revealed) {
    cardTitle = <h3>{name || 'No name'}</h3>
  } else {
    cardTitle = <h3>Closed</h3>
  }

  return connectDragSource(
    <div className={kneel ? 'card card-kneeled' : 'card'} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={image_url} />
    </div>
  )
}

Card.propTypes = {
  uid: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  image_url: PropTypes.string,
  name: PropTypes.string,
  kneel: PropTypes.bool,
  type: PropTypes.string,
  kneel: PropTypes.bool,
  revealed: PropTypes.bool.isRequired,
  action: PropTypes.func,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource('CARD', cardSource, collect)(Card);
