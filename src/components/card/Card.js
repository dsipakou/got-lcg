import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import './card.scss';

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      key: props.id,
      index: props.index,
      type: props.type,
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Card = ({name, revealed, isDragging, connectDragSource}) => {

  let cardTitle = null;
  if (revealed) {
    cardTitle = <h3>{name || 'No name'}</h3>
  } else {
    cardTitle = <h3>Closed</h3>
  }

  return connectDragSource(
    <div className='card' style={{ opacity: isDragging ? 0.5 : 1 }}>
      {cardTitle}
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  revealed: PropTypes.bool.isRequired,
  action: PropTypes.func,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource('CARD', cardSource, collect)(Card);
