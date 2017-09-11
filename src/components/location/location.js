import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from '../card/card';
import './location.scss';

const boardTarget = {
  drop(props, monitor) {
    const { name, index, type } = monitor.getItem();
    console.log(index);
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

class Location extends Component {
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
      }} >LOCATIONS</div>
    )
  }
  render() {
    const { isOver, currentItem, connectDropTarget } = this.props;
    let canDrop = false;
    if (currentItem != null && currentItem.type === 'LOCATION') {
      canDrop = true;
    }
    return connectDropTarget(
      <div className='location-inner'>
        {isOver && canDrop && this.renderOverlay('yellow')}
        {!isOver && canDrop && this.renderOverlay('green')}
        <Card own={false} />
      </div>
    );
  }
}

Location.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
}

export default DropTarget('CARD', boardTarget, collect)(Location)
