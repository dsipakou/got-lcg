import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../deck/Deck';

class OpponentPlot extends Component {
  constructor() {
    super();
    this.state = {
      revealed: false,
    }
  }

  componentDidMount() {
    const { socket, actions, gameflow } = this.props;
    socket.on('play plot', (data) => {
        actions.addOpponentPlot(data.action.payload);
        gameflow.actions.opponentDone();
      }
    );
  }

  render() {
    const { cards, gameflow } = this.props;
    return (
      <div>
          <h2>Opponents plot</h2>
          <Deck deck={cards}
            plot={true}
            revealed={!gameflow.states.isPlotPhase ? true : gameflow.payload.isPlayerDone} />
      </div>
    )
  }
}

OpponentPlot.propTypes = {
  gameflow: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
}

export default OpponentPlot;
