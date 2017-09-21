import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DragableCard from '../../containers/dragablecard/DragableCard';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './character.scss';

const boardTarget = {
  canDrop(props, monitor){
    return (monitor.getItem().card.type === 'CHARACTER');
  },
  drop(props, monitor) {
    props.onPlayCharacter(monitor.getItem().card);
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}

const collect_props = (props) => {
  return {
    index: props.index
  }
}

// Component

const Character = ({isOver, cards, onKneelCharacter, onStandCharacter, currentItem, connectDropTarget}) => {
  const renderOverlay = (color) => {
    return (
      <div className="drag-overlay" style={{ backgroundColor: color }}>Character zone</div>
    )
  }

  const kneelCharacter = (e, data) => {
    console.log('kneel', data)
    onKneelCharacter(data.index)
  }
  let canDrop = currentItem != null && currentItem.card.type === 'CHARACTER';
  return connectDropTarget(
    <div className='character-inner' >
        {isOver && canDrop && renderOverlay('yellow')}
        {!isOver && canDrop && renderOverlay('green')}
        { cards.map((card, index) => (
          <ContextMenuTrigger holdToDisplay={-1} id='character_context_menu' collect={collect_props} key={card.uid} index={index}>
            <DragableCard {...card} kneel={card.kneel} index={index} key={card.uid} revealed={true} />
          </ContextMenuTrigger>
        )) }
        <ContextMenu id='character_context_menu' >
          <MenuItem onClick={kneelCharacter}>Kneel</MenuItem>
          <MenuItem divider/>
          <MenuItem>Undo</MenuItem>
        </ContextMenu>
    </div>
  );

}

Character.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onPlayCharacter: PropTypes.func.isRequired
}

export default DropTarget('CARD', boardTarget, collect)(Character)
