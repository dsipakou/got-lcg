import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const boardTarget = {
  canDrop(props, monitor) {
    if (typeof monitor.getItem().card === "undefined") {
      return false;
    }
    return (monitor.getItem().card.type === "EVENT" && monitor.getItem().card.cardlocation !== monitor.getItem().card.type);
  },
  drop(props, monitor) {
    props.action.playEvent(monitor.getItem().card);
  },
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}


const Event = ({isOver, card, actions, currentItem, connectDropTarget}) => {
  const renderOverlay = (color) => {
    return(
      <div className='drag-overlay' style={{backgroundColor: color}}>Event zone</div>
    )
  }

  let canDrop =
    currentItem != null &&
    typeof currentItem.card !== "undefined" &&
    currentItem.card.type === "EVENT" &&
    currentItem.card.cardlocation !== currentItem.card.type;
  return connectDropTarget(
    <div>
      {isOver && canDrop && renderOverlay('yellow')}
      {!isOver && canDrop && renderOverlay('green')}
    </div>
  )
}

Event.propTypes = {
  card: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    playEvent: PropTypes.func.isRequired,
    discardEvent: PropTypes.func.isRequired,
  })
}

export default DropTarget('EVENT', boardTarget, collect)(Event);
