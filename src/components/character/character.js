import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import './character.scss';

const boardTarget = {
  canDrop(props, monitor){
    return (monitor.getItem().type === 'CHARACTER');
  },
  drop(props, monitor) {
    console.log(monitor.getItem());
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
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color
      }} >CHARACTERS</div>
    )
  }
  render() {
    const { isOver, currentItem, connectDropTarget } = this.props;
    let canDrop = currentItem != null && currentItem.type === 'CHARACTER';
    return connectDropTarget(
      <div className='character-inner' >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {isOver && canDrop && this.renderOverlay('yellow')}
          {!isOver && canDrop && this.renderOverlay('green')}
        </div>
      </div>
    );
  }
}

Character.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  onPlayCard: PropTypes.func.isRequired
}

export default DropTarget('CARD', boardTarget, collect)(Character)
