import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DragableCard from '../../containers/dragablecard/DragableCard';
import './Event.scss';

const boardTarget = {
  canDrop(props, monitor) {
    if (typeof monitor.getItem().card === "undefined") {
      return false;
    }
    return (monitor.getItem().card.type === "EVENT" && monitor.getItem().card.cardlocation !== monitor.getItem().card.type);
  },
  drop(props, monitor) {
    props.actions.playEvent(monitor.getItem().card);
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
  const renderOverlay = (bgcolor, color) => {
    return(
      <div className='drag-overlay' style={{backgroundColor: bgcolor, color: color}}>Event zone</div>
    )
  }

  let canDrop =
    currentItem != null &&
    typeof currentItem.card !== "undefined" &&
    currentItem.card.type === "EVENT" &&
    currentItem.card.cardlocation !== currentItem.card.type;
  return connectDropTarget(
    <div className='event-inner'>
      {isOver && canDrop && renderOverlay('yellow', 'black')}
      {!isOver && canDrop && renderOverlay('green', 'white')}
      { typeof card.id !== "undefined" && <DragableCard {...card} key={card.id} /> }

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
