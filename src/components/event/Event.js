import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DragableCard from '../../containers/dragablecard/DragableCard';
import { playEvent } from '../../redux/actions/player/hand';
import './Event.scss';

const boardTarget = {
  canDrop(props, monitor) {
    if (typeof monitor.getItem().card === 'undefined') {
      return false;
    }
    return (monitor.getItem().card.type === 'EVENT' && monitor.getItem().card.cardlocation !== monitor.getItem().card.type);
  },
  drop(props, monitor) {
    props.dispatch(playEvent(monitor.getItem().card));
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}


const Event = ({
  isOver,
  card,
  currentItem,
  connectDropTarget,
}) => {
  const renderOverlay = (bgcolor, color) => {
    return (
      <div className="drag-overlay" style={{ backgroundColor: bgcolor, color }}>Event zone</div>
    );
  };

  const canDrop =
    currentItem != null &&
    typeof currentItem.card !== 'undefined' &&
    currentItem.card.type === 'EVENT' &&
    currentItem.card.cardlocation !== currentItem.card.type;
  return connectDropTarget(
    <div className="event-inner">
      {isOver && canDrop && renderOverlay('yellow', 'black')}
      {!isOver && canDrop && renderOverlay('green', 'white')}
      { typeof card.id !== 'undefined' && <DragableCard {...card} key={card.id} /> }
    </div>
  );
};

Event.propTypes = {
  card: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget('EVENT', boardTarget, collect)(Event);
