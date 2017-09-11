import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import './card.scss';

const cardSource = {
  beginDrag(props) {
    return {
      name: props.name,
      key: props.id,
      index: props.index,
      type: props.type,
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
  placeCard() {
    const { id, index, name, revealed, action } = this.props;
  }

  render() {
    const {name, revealed, isDragging, connectDragSource } = this.props;
    let cardTitle = null;
    if (revealed) {
      cardTitle = <h1>{name || 'No name'}</h1>
    } else {
      cardTitle = <h1>Opp</h1>
    }
    return connectDragSource(
      <div className='card' style={{ opacity: isDragging ? 0.5 : 1 }}>
        {cardTitle}
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  revealed: PropTypes.bool.isRequired,
  action: PropTypes.func,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

export default DragSource('CARD', cardSource, collect)(Card);
