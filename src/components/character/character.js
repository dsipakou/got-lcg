import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from '../card/card';
import './character.scss';

const boardTarget = {
  canDrop(props, monitor){
    return (monitor.getItem().type === 'CHARACTER');
  },
  drop(props, monitor) {
    console.log(monitor.getItem());
    props.onPlayCharacter(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    currentItem: monitor.getItem(),
  };
}

class Character extends Component {
  renderOverlay(color) {
    return (
      <div className="drag-overlay" style={{ backgroundColor: color }} >Put character here</div>
    )
  }
  render() {
    const { isOver, cards, currentItem, connectDropTarget } = this.props;
    let canDrop = currentItem != null && currentItem.type === 'CHARACTER';
    return connectDropTarget(
      <div className='character-inner' >
          {isOver && canDrop && this.renderOverlay('yellow')}
          {!isOver && canDrop && this.renderOverlay('green')}
          { cards.map((card, index) => (
            <Card {...card} index={index} key={card.id} revealed={true} name={card.name}/>
          )) }
      </div>
    );
  }
}

Character.propTypes = {
  cards: PropTypes.array.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onPlayCharacter: PropTypes.func.isRequired
}

export default DropTarget('CARD', boardTarget, collect)(Character)
