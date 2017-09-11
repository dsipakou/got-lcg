import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import './card.scss';

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class Card extends Component {

  static propTypes = {
    name: PropTypes.string,
    own: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired
  };

  render() {
    const {name, own, isDragging, connectDragSource } = this.props;
    let cardTitle = null;
    if (own) {
      cardTitle = <h1>{name || 'No name'}</h1>
    } else {
      cardTitle = <h1>Opp</h1>
    }
    return connectDragSource(
      <div className='card' style={{ opacity: isDragging ? 0.5 : 1 }}>Card container
        {cardTitle}
      </div>
    );
  }
}

export default DragSource('CARD', cardSource, collect)(Card);
