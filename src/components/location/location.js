import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from '../card/card';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import './location.scss';

const boardTarget = {
  canDrop(props, monitor) {
    return (monitor.getItem().type === 'LOCATION');
  },
  drop(props, monitor) {
    props.onPlayLocation(monitor.getItem());
    console.log(monitor.getItem())
  },
};

function collect(connect, monitor) {

  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}

function collect_props(props) {

  return {
    index: props.index
  }
}

const Location = ({isOver, cards, onKneelLocation, onStandLocation, currentItem, connectDropTarget}) => {
  const renderOverlay = (color) => {
    return (
      <div className='drag-overlay' style={{backgroundColor: color}}>Put location here</div>
    )
  }

  const kneelLocation = (e, data) => {
    onKneelLocation(data.index)
  }

  let canDrop = currentItem != null && currentItem.type === 'LOCATION';
  return connectDropTarget(
    <div className='location-inner'>
      {isOver && canDrop && renderOverlay('yellow')}
      {!isOver && canDrop && renderOverlay('green')}
      { cards.map((card, index) => (
        <ContextMenuTrigger id='card_context_menu' collect={collect_props} key={card.uid} index={index}>
          <Card {...card} kneel={card.kneel} index={index} key={card.uid} revealed={true} name={card.name}/>
        </ContextMenuTrigger>
      )) }

      <ContextMenu id='card_context_menu' >
        <MenuItem onClick={kneelLocation}>Kneel</MenuItem>
        <MenuItem divider/>
        <MenuItem>Undo</MenuItem>
      </ContextMenu>
    </div>
  );

}

Location.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onPlayLocation: PropTypes.func.isRequired,
  onStandLocation: PropTypes.func.isRequired,
  onKneelLocation: PropTypes.func.isRequired
}

export default DropTarget('CARD', boardTarget, collect)(Location)
