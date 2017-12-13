import React from 'react';
import { DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import DragableCard from '../dragablecard/DragableCard';
import './DropableCard.scss';

const cardTarget = {
  canDrop(props, monitor) {
    return true;
  },

  drop(props, monitor) {

  },
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
};

const DropableCard = ({
  isOver,
  card,
  currentItem,
  connectDropTarget
}) => {
  const renderOverlay = (bgColor, color) => {
    return (
      <div
        className="drag-overlay"
        style={{ backgroundColor: bgColor, color }}
      >
      Here
      </div>
    );
  };

  const canDrop =
    currentItem != null &&
    typeof currentItem.card !== 'undefined' &&
    currentItem.card.type === 'ATTACHMENT' &&
    currentItem.card.cardlocation !== currentItem.card.type;

  return connectDropTarget(
    <div className="dropableCard">
      {isOver && canDrop && renderOverlay('yellow', 'black')}
      {!isOver && canDrop && renderOverlay('green', 'black')}
      <DragableCard {...card} />
    </div>
  );
};

DropableCard.propTypes = {
  card: PropTypes.object.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget('ATTACHMENT', cardTarget, collect)(DropableCard);
