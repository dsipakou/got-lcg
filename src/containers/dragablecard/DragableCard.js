import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    return {
      card: props
    };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const DragableCard = (kneel, image_url, revealed, isDragging, connectDragSource) => {
  return connectDragSource(
    <Card kneel={kneel} image_url={image_url} revealed={revealed} idDraggin={isDragging}/>
  )
}

DragableCard.propTypes = {
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
}

export default DragSource('CARD', cardSource, collect)(DragableCard)
