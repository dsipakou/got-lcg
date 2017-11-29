import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import DragableCard from '../../containers/dragablecard/DragableCard';
import Messages from '../general/Messages';
import { playLocation } from '../../redux/actions/player/hand';
import './Location.scss';

const boardTarget = {
  canDrop(props, monitor) {
    if (typeof monitor.getItem().card === 'undefined') {
      return false;
    }
    return (
      monitor.getItem().card.type === 'LOCATION' &&
      monitor.getItem().card.cardlocation !== monitor.getItem().card.type &&
      props.gameflow.states.isMarshalingPhase &&
      props.gameflow.payload.isYourTurn
    );
  },
  drop(props, monitor) {
    props.dispatch(playLocation(monitor.getItem().card));
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}

function collectProps(props) {
  return {
    index: props.index,
  };
}

// Component

const Location = ({
  dispatch,
  isOver,
  cards,
  currentItem,
  connectDropTarget,
  gameflow,
}) => {
  const kneelLocation = (e, data) => {
    dispatch(kneelLocation(data.index));
  };

  const standLocation = (e, data) => {
    dispatch(standLocation(data.index));
  };

  const canDrop =
    currentItem != null &&
    typeof currentItem.card !== 'undefined' &&
    currentItem.card.type === 'LOCATION' &&
    currentItem.card.cardlocation !== currentItem.card.type &&
    gameflow.states.isMarshalingPhase &&
    gameflow.payload.isYourTurn;

  const renderOverlay = (bgcolor, color) => {
    return (
      <div className="drag-overlay" style={{ backgroundColor: bgcolor, color }}>Location zone</div>
    );
  };

  return connectDropTarget(
    <div className="location-inner">
      {
        gameflow.states.isMarshalingPhase &&
        !gameflow.payload.isYourTurn &&
        <Messages text="Wait for your turn" />
      }
      {
        isOver &&
        canDrop &&
        renderOverlay('yellow', 'black')
      }
      {
        !isOver &&
        canDrop &&
        renderOverlay('green', 'white')
      }
      {
        cards.map((card, index) => (
          <ContextMenuTrigger holdToDisplay={-1} id="card_context_menu" collect={collectProps} key={card.uid} index={index}>
            <DragableCard {...card} index={index} key={card.uid} />
          </ContextMenuTrigger>
        ))
      }
      {
        gameflow.states.isChallengesPhase &&
        <ContextMenu id="card_context_menu" >
          <MenuItem onClick={kneelLocation}>Kneel</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={standLocation}>Stand</MenuItem>
        </ContextMenu>
      }
    </div>
  );
};

Location.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default DropTarget('LOCATION', boardTarget, collect)(Location);
