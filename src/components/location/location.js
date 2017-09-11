import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import Card from '../card/card';
import './location.scss';

const boardTarget = {
  drop(props, monitor) {
    props.playCard(monitor.getItem());
    console.log(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
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
    const { isOver, canDrop, connectDropTarget } = this.props;
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
