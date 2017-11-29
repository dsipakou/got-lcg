import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../deck/Deck';
import { addOpponentPlot } from '../../redux/actions/opponent/opponentPlot';

class OpponentPlot extends Component {
  componentDidMount() {
    const { socket, dispatch, gameflow } = this.props;
    socket.on('play plot', (data) => {
      dispatch(addOpponentPlot(data.action.payload));
      gameflow.actions.opponentDone();
    });
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
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
}

export default OpponentPlot;
