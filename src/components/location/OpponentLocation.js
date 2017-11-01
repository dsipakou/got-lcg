import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';
import './OpponentLocation.scss';

class OpponentLocation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on('add location', data =>
      actions.addOpponentLocation(data.action.payload)
    );

    socket.on('kneel location', data =>
      actions.kneelOpponentLocation(data.action.index)
    );

    socket.on('stand location', data =>
      actions.standOpponentLocation(data.action.index)
    );
  }

  render() {
    const { cards } = this.props;
    return (
      <div className='opponent-location-inner'>
        {cards.map((card, index) => (
          <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
        ))}
      </div>
    )
  }
}

OpponentLocation.propTypes = {
  socket: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentLocation;
