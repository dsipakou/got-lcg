import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import DropableCard from '../../containers/dropablecard/DropableCard';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import './character.scss';

let enoughGold = true;

const boardTarget = {
  canDrop(props, monitor){
    if (typeof monitor.getItem().card === "undefined") {
      return false;
    }
    return (
      monitor.getItem().card.type === 'CHARACTER' &&
      monitor.getItem().card.cardlocation !== monitor.getItem().card.type &&
      props.gameflow.states.isMarshalingPhase
    );
  },
  drop(props, monitor) {
    enoughGold = props.actions.playCharacter(monitor.getItem().card);
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

const Character = ({ isOver, socket, cards, gameflow, actions, currentItem, connectDropTarget }) => {
  const renderOverlay = (bgcolor, color) => {
    return (
      <div className="drag-overlay" style={{ backgroundColor: bgcolor, color: color }}>Character zone</div>
    )
  }

  const kneelCharacter = (e, data) => {
    actions.kneelCharacter(data.index)
  }

  const standCharacter = (e, data) => {
    actions.standCharacter(data.index)
  }

  const doneStage = () => {
    if (gameflow.payload.isOpponentDone) {
      gameflow.actions.gotoChallenge();
      socket.emit('game:challenge');
    } else {
      socket.emit('opponent:done');
    }
  }

  let canDrop =
    currentItem != null &&
    typeof currentItem.card !== "undefined" &&
    currentItem.card.type === 'CHARACTER' &&
    currentItem.card.cardlocation !== currentItem.card.type &&
    gameflow.states.isMarshalingPhase;

  return connectDropTarget(
    <div className='character-inner' >
      {!enoughGold && <span>Not enough gold</span>}
      {isOver && canDrop && renderOverlay('yellow', 'black')}
      {!isOver && canDrop && renderOverlay('green', 'white')}
      <button onClick={doneStage}>I'm done</button>
      { cards.map((card, index) => (
        <ContextMenuTrigger holdToDisplay={-1} id='character_context_menu' collect={collect_props} key={card.uid} index={index}>
          <DropableCard card={card} index={index} key={card.uid} />
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
  gameflow: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
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
