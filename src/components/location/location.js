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
    card: props.card
  }
}

class Location extends Component {
  renderOverlay(color) {
    return (
      <div className='drag-overlay' style={{backgroundColor: color}}>Put location here</div>
    )
  }

  handleClick(e, data) {
    console.log(data);
  }

  render() {
    const { isOver, cards, currentItem, connectDropTarget } = this.props;
    let canDrop = currentItem != null && currentItem.type === 'LOCATION';
    return connectDropTarget(
      <div className='location-inner'>
        {isOver && canDrop && this.renderOverlay('yellow')}
        {!isOver && canDrop && this.renderOverlay('green')}
        { cards.map((card, index) => (
          <ContextMenuTrigger id='card_context_menu' collect={collect_props} card={card}>
            <Card {...card} index={index} key={card.id} revealed={true} name={card.name}/>
          </ContextMenuTrigger>

        )) }
        <ContextMenu id='card_context_menu' >
          <MenuItem onClick={this.handleClick} data={{ action: 'hello boy'}}>Kneel</MenuItem>
          <MenuItem divider/>
          <MenuItem>Undo</MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

Location.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onPlayLocation: PropTypes.func.isRequired
}

export default DropTarget('CARD', boardTarget, collect)(Location)
