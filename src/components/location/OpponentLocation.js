import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../../components/card/Card';
import {
  addOpponentLocation,
  kneelOpponentLocation,
  standOpponentLocation,
} from '../../redux/actions/opponent/opponentLocation';
import './OpponentLocation.scss';

class OpponentLocation extends Component {
  componentDidMount() {
    const { socket, dispatch } = this.props;
    socket.on('add location', (data) => {
      dispatch(addOpponentLocation(data.action.payload));
    });

    socket.on('kneel location', (data) => {
      dispatch(kneelOpponentLocation(data.action.index));
    });

    socket.on('stand location', (data) => {
      dispatch(standOpponentLocation(data.action.index));
    });
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="opponent-location-inner">
        {cards.map((card, index) => (
          <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
        ))}
      </div>
    );
  }
}

OpponentLocation.propTypes = {
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentLocation;
