import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import './location.scss';

const boardTarget = {
  drop(props, monitor) {
    props.playCard(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class Location extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
  }

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
    const { isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='location-inner' >
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}>
          {isOver && this.renderOverlay('yellow')}
          {!isOver && this.renderOverlay('green')}
        </div>
      </div>
    );
  }
}

export default DropTarget('CARD', boardTarget, collect)(Location)
