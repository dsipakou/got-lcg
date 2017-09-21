import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import Card from '../../components/card/Card';

let CARD_TYPE = 'CARD';

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

const DragableCard = ({uid, id, name, kneel, type, image_url, revealed, isDragging, connectDragSource}) => {
  CARD_TYPE = type;
  console.log(CARD_TYPE);
  return connectDragSource(
    <div>
      <Card uid={uid} id={id} kneel={kneel} name={name} image_url={image_url} revealed={revealed} isDragging={isDragging} />
    </div>
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
};
console.log('CARD_TYPE')
export default DragSource(CARD_TYPE, cardSource, collect)(DragableCard);
