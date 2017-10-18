import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DragableCard from '../dragablecard/DragableCard';
import {DropTarget} from 'react-dnd';
import './DropableCard.scss';

const cardTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor) {

  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  }
}

const DropableCard = ({isOver, card, currentItem, connectDropTarget}) => {
  const renderOverlay = (bgColor, color) => {
    return(
      <div className='drag-overlay' style={{backgroundColor: bgColor, color: color}}>Attachment</div>
    )
  }

  return connectDropTarget(
    <div className='dropableCard'>
      {isOver && renderOverlay('yellow', 'black')}
      {!isOver && renderOverlay('green', 'black')}
      <DragableCard {...card} />
    </div>
  )

}

DropableCard.propTypes = {
  card: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default DropTarget('EVENT', cardTarget, collect)(DropableCard);
