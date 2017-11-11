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

class Character extends Component {

  renderOverlay(bgcolor, color) {
    return (
      <div className="drag-overlay" style={{ backgroundColor: bgcolor, color: color }}>Character zone</div>
    )
  }

  kneelCharacter(e, data) {
    const { actions } = this.props;
    actions.kneelCharacter(data.index)
  }

  standCharacter(e, data) {
    const { actions } = this.props;
    actions.standCharacter(data.index)
  }

  render() {
    const { isOver, socket, cards, gameflow, actions, currentItem, connectDropTarget } = this.props;
    let canDrop =
      currentItem != null &&
      typeof currentItem.card !== "undefined" &&
      currentItem.card.type === 'CHARACTER' &&
      currentItem.card.cardlocation !== currentItem.card.type &&
      gameflow.states.isMarshalingPhase;
    return connectDropTarget(
      <div className='character-inner' >
        {!enoughGold && <span>Not enough gold</span>}
        {isOver && canDrop && this.renderOverlay.bind(this, 'yellow', 'black')}
        {!isOver && canDrop && this.renderOverlay.bind(this, 'green', 'white')}
        { cards.map((card, index) => (
          <ContextMenuTrigger holdToDisplay={-1} id='character_context_menu' collect={collect_props} key={card.uid} index={index}>
            <DropableCard card={card} index={index} key={card.uid} />
          </ContextMenuTrigger>
        )) }
        <ContextMenu id='character_context_menu' >
          <MenuItem onClick={this.kneelCharacter.bind(this)}>Kneel</MenuItem>
          <MenuItem divider/>
          <MenuItem onClick={this.standCharacter.bind(this)}>Stand</MenuItem>
        </ContextMenu>
      </div>
    );
  }
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
