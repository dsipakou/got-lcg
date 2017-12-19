import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'stent/lib/react';
import { Machine } from 'stent';
import PlayerSide from '../../containers/playerside/PlayerSide';
import OpponentSide from '../../containers/opponentside/OpponentSide';
import StartHand from '../playerside/starthand/StartHand';
import store from '../../redux/store';
import { updateMachine } from '../../redux/actions/general/game';
import { machineState, machineTransitions } from '../../machine/game';
import './Board.scss';

let currentState = machineState;

console.log(store.getState().general.gameReducer.length);
console.log(store.getState().general.gameReducer);
if (store.getState().general.gameReducer.length > 0) {
  currentState = store.getState().general.gameReducer;
}
Machine.create(
  'gameflow',
  { state: currentState, transitions: machineTransitions },
);

Machine.addMiddleware({
  onActionDispatched(actionName) {
    console.log(this);
    store.dispatch(updateMachine(this.state));
    actionName();
  },
});

class Board extends Component {
  constructor(props) {
    super(props);
    props.socket.on('connect', () => {
      props.socket.emit('room', 'room123');
    });
    this.gotoSetup = this.gotoSetup.bind(this);
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('game:start', () => {
      gameflow.actions.gotoSetup(false, false);
    });
    Machine.create(
      'gameflow',
      { state: currentState, transitions: machineTransitions },
    );
  }

  gotoSetup() {
    const { gameflow, socket } = this.props;
    gameflow.actions.gotoSetup(true, true);
    socket.emit('game:start', { data: socket.id });
  }

  render() {
    const { gameflow, socket } = this.props;
    if (gameflow.states.isNewGame) {
      return (
        <div className="board">
          <div>
            <button onClick={this.gotoSetup.bind(this)}>Start game</button>
          </div>
        </div>
      );
    } else if (gameflow.states.isSetupPhase) {
      return (
        <div className="board">
          <StartHand socket={socket} gameflow={gameflow} />
        </div>
      );
    }
    return (
      <div className="board">
        <OpponentSide gameflow={gameflow} socket={socket} />
        <PlayerSide gameflow={gameflow} socket={socket} />
      </div>
    );
  }
}

Board.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.shape({
    name: PropTypes.string,
    states: PropTypes.shape({
      isNewGame: PropTypes.bool.isRequired,
      isSetupPhase: PropTypes.bool.isRequired,
      isPlotPhase: PropTypes.bool.isRequired,
      isDrawPhase: PropTypes.bool.isRequired,
      isMarshalingPhase: PropTypes.bool.isRequired,
      isChallengesPhase: PropTypes.bool.isRequired,
      isDominancePhase: PropTypes.bool.isRequired,
      isStandingPhase: PropTypes.bool.isRequired,
      isTaxationPhase: PropTypes.bool.isRequired,
    }),
    actions: PropTypes.shape({
      gotoSetup: PropTypes.func.isRequired,
      gotoPlot: PropTypes.func.isRequired,
      gotoDraw: PropTypes.func.isRequired,
      gotoDominance: PropTypes.func.isRequired,
      gotoStanding: PropTypes.func.isRequired,
      gotoTaxation: PropTypes.func.isRequired,
      gotoNext: PropTypes.func.isRequired,
      playerDone: PropTypes.func.isRequired,
      opponentDone: PropTypes.func.isRequired,
      setFirstPlayer: PropTypes.func.isRequired,
      yourTurn: PropTypes.func.isRequired,
    }),
    payload: PropTypes.shape({
      isFirstPlayer: PropTypes.bool.isRequired,
      isYourTurn: PropTypes.bool.isRequired,
      isPlayerDone: PropTypes.bool.isRequired,
      isOpponentDone: PropTypes.bool.isRequired
    })
  }),
}

export default connect(Board)
  .with('gameflow')
  .map(gameflow => ({
    gameflow: {
      name: gameflow.state.name,
      states: {
        isNewGame: gameflow.isNewGame(),
        isSetupPhase: gameflow.isSetupPhase(),
        isPlotPhase: gameflow.isPlotPhase(),
        isDrawPhase: gameflow.isDrawPhase(),
        isMarshalingPhase: gameflow.isMarshalingPhase(),
        isChallengesPhase: gameflow.isChallengesPhase(),
        isDominancePhase: gameflow.isDominancePhase(),
        isStandingPhase: gameflow.isStandingPhase(),
        isTaxationPhase: gameflow.isTaxationPhase(),
      },
      actions: {
        gotoSetup: gameflow.gotoSetup,
        gotoPlot: gameflow.gotoPlot,
        gotoDraw: gameflow.gotoDraw,
        gotoDominance: gameflow.gotoDominance,
        gotoStanding: gameflow.gotoStanding,
        gotoTaxation: gameflow.gotoTaxation,
        gotoNext: gameflow.gotoNext,
        playerDone: gameflow.playerDone,
        opponentDone: gameflow.opponentDone,
        setFirstPlayer: gameflow.setFirstPlayer,
        yourTurn: gameflow.yourTurn,
      },
      payload: {
        isFirstPlayer: gameflow.state.isFirstPlayer,
        isYourTurn: gameflow.state.isYourTurn,
        isPlayerDone: gameflow.state.isPlayerDone,
        isOpponentDone: gameflow.state.isOpponentDone,
      }
    },
  }));
