import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { connect } from 'react-redux';
import Card from '../../components/card/Card';

const CARD_TYPE = 'CARD';

const cardSource = {
  beginDrag(props) {
    return {
      card: props,
    };
  },
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
};

const cardType = (props) => {
  return props.type;
};

const DragableCard = ({
  uid,
  id,
  name,
  kneel,
  type,
  cardlocation,
  image_url,
  revealed,
  isDragging,
  connectDragSource,
  connectDragPreview,
}) => {
  return connectDragSource(
    <div>
      <Card
        uid={uid}
        id={id}
        kneel={kneel}
        name={name}
        cardlocation={cardlocation}
        revealed={revealed}
        image_url={image_url}
        isDragging={isDragging}
      />
    </div>,
    { dropEffect: 'copy' },
  );
};

DragableCard.propTypes = {
  uid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  image_url: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  cardlocation: PropTypes.string.isRequired,
  kneel: PropTypes.bool,
  revealed: PropTypes.bool.isRequired,
  action: PropTypes.func,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired
};

DragableCard.defaultProps = {
  kneel: false,
  revealed: true,
};

export default DragSource(cardType, cardSource, collect)(DragableCard);
