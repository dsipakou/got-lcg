import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import DropableCard from '../../containers/dropablecard/DropableCard';
import { kneelCharacter, standCharacter } from '../../redux/actions/player/character';
import { playCharacter } from '../../redux/actions/player/hand';
import './character.scss';

let enoughGold = true;

const boardTarget = {
  canDrop(props, monitor) {
    if (typeof monitor.getItem().card === 'undefined') {
      return false;
    }
    return (
      monitor.getItem().card.type === 'CHARACTER' &&
      monitor.getItem().card.cardlocation !== monitor.getItem().card.type &&
      props.gameflow.states.isMarshalingPhase
    );
  },
  drop(props, monitor) {
    enoughGold = props.dispatch(playCharacter(monitor.getItem().card));
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}

const collectProps = (props) => {
  return {
    index: props.index,
  };
};

// Component

class Character extends Component {
  constructor() {
    super();
    this.kneelCharacter = this.kneelCharacter.bind(this);
    this.standCharacter = this.standCharacter.bind(this);
  }

  kneelCharacter(e, data) {
    const { dispatch } = this.props;
    dispatch(kneelCharacter(data.index));
  }

  standCharacter(e, data) {
    const { dispatch } = this.props;
    dispatch(standCharacter(data.index));
  }

  renderOverlay(bgcolor, color) {
    return (
      <div className="drag-overlay" style={{ backgroundColor: bgcolor, color }}>Location zone</div>
    );
  };

  render() {
    const {
      gameflow,
      cards,
      isOver,
      currentItem,
      connectDropTarget,
    } = this.props;
    const canDrop =
      currentItem != null &&
      typeof currentItem.card !== 'undefined' &&
      currentItem.card.type === 'CHARACTER' &&
      currentItem.card.cardlocation !== currentItem.card.type &&
      gameflow.states.isMarshalingPhase;
    return connectDropTarget(
      <div className="character-inner">
        {!enoughGold && <span>Not enough gold</span>}
        {isOver && canDrop && this.renderOverlay.bind(this, 'yellow', 'black')}
        {!isOver && canDrop && this.renderOverlay.bind(this, 'green', 'white')}
        { cards.map((card, index) => (
          <ContextMenuTrigger holdToDisplay={-1} id="character_context_menu" collect={collectProps} key={card.uid} index={index}>
            <DropableCard card={card} index={index} key={card.uid} />
          </ContextMenuTrigger>
        )) }
        <ContextMenu id="character_context_menu" >
          <MenuItem onClick={this.kneelCharacter}>Kneel</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={this.standCharacter}>Stand</MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

Character.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  currentItem: PropTypes.object.isRequired
}

export default DropTarget('CHARACTER', boardTarget, collect)(Character);
