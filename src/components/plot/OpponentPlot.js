import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../deck/Deck';

class OpponentPlot extends Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on('play plot', data =>
      actions.addOpponentPlot(data.action.payload)
    );
  }

  render() {
    const { cards } = this.props;
    return (
      <div>
          <h2>Opponents plot</h2>
          <Deck deck={cards} plot={true} revealed={true} />
      </div>
    )
  }
}

export default OpponentPlot;
