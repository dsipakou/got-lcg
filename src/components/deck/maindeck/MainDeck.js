import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck';
import { drawCard, getStartHand } from '../../../redux/actions/player/deck';

class MainDeck extends Component {
  constructor() {
    super();
    this.drawCard = this.drawCard.bind(this);
    this.drawPhaseDrawing = this.drawPhaseDrawing.bind(this);
    this.doneStage = this.doneStage.bind(this);
    this.state = {
      drawComplete: false,
    };
  }

  drawPhaseDrawing() {
    const { dispatch } = this.props;
    dispatch(drawCard());
    dispatch(drawCard());
    this.setState({ drawComplete: true });
  }

  drawCard() {
    const { gameflow, dispatch } = this.props;
    if (gameflow.states.isDrawPhase) {
      this.drawPhaseDrawing();
    } else if (gameflow.states.isSetupPhase) {
      dispatch(getStartHand());
    }
  }

  doneStage() {
    const { gameflow, socket } = this.props;
    if (gameflow.payload.isOpponentDone) {
      gameflow.actions.gotoNext();
      socket.emit('game:nextphase');
    } else {
      gameflow.actions.playerDone();
      socket.emit('opponent:done');
    }
  }

  render() {
    const { deck, gameflow } = this.props;
    const text = gameflow.states.isDrawPhase ? 'Click once get 2 cards' : 'MAMA PAPA MATBEN MAPK';
    return (
      <div>
        {
          gameflow.states.isDrawPhase &&
          this.state.drawComplete &&
          !gameflow.payload.isPlayerDone &&
          <button onClick={this.doneStage}>Next stage</button>
        }
        {
          gameflow.states.isDrawPhase &&
          !gameflow.payload.isOpponentDone &&
          gameflow.payload.isPlayerDone &&
          <span>Wait for opponent</span>
        }
        <div onClick={this.drawCard}>
          <Deck deck={deck} text={text} />
        </div>
      </div>
    );
  }
}

MainDeck.propTypes = {
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
  deck: PropTypes.array.isRequired,
  action: PropTypes.func,
};

export default MainDeck;
