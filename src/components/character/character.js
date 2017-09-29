import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DragableCard from '../../containers/dragablecard/DragableCard';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './character.scss';

const boardTarget = {
  canDrop(props, monitor){
    if (typeof monitor.getItem().card === "undefined") {
      return false;
    }
    return (monitor.getItem().card.type === 'CHARACTER' && monitor.getItem().card.cardlocation !== monitor.getItem().card.type);
  },
  drop(props, monitor) {
    props.actions.playCharacter(monitor.getItem().card);
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

const Character = ({ isOver, cards, actions, currentItem, connectDropTarget }) => {
  const renderOverlay = (color) => {
    return (
      <div className="drag-overlay" style={{ backgroundColor: color }}>Character zone</div>
    )
  }

  const kneelCharacter = (e, data) => {
    actions.kneelCharacter(data.index)
  }

  const standCharacter = (e, data) => {
    actions.standCharacter(data.index)
  }

  let canDrop =
    currentItem != null &&
    typeof currentItem.card !== "undefined" &&
    currentItem.card.type === 'CHARACTER' &&
    currentItem.card.cardlocation !== currentItem.card.type;
  return connectDropTarget(
    <div className='character-inner' >
        {isOver && canDrop && renderOverlay('yellow')}
        {!isOver && canDrop && renderOverlay('green')}
        { cards.map((card, index) => (
          <ContextMenuTrigger holdToDisplay={-1} id='character_context_menu' collect={collect_props} key={card.uid} index={index}>
            <DragableCard {...card} index={index} key={card.uid} revealed={true} />
          </ContextMenuTrigger>
        )) }
        <ContextMenu id='character_context_menu' >
          <MenuItem onClick={kneelCharacter}>Kneel</MenuItem>
          <MenuItem divider/>
          <MenuItem onClick={standCharacter}>Stand</MenuItem>
        </ContextMenu>
    </div>
  );

}

Character.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    playCharacter: PropTypes.func.isRequired,
    kneelCharacter: PropTypes.func.isRequired,
    standCharacter: PropTypes.func.isRequired,
  })
}

export default DropTarget('CHARACTER', boardTarget, collect)(Character)
