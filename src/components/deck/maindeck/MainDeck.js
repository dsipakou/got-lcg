import React, { Component } from 'react';
import Deck from '../Deck';
import PropTypes from 'prop-types';

class MainDeck extends Component {

  constructor() {
    super();
    this.drawCard = this.drawCard.bind(this);
    this.drawPhaseDrawing = this.drawPhaseDrawing.bind(this);
    this.doneStage = this.doneStage.bind(this);
    this.state = {
      drawComplete: false,
    }
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('opponent:done', () => {
      gameflow.actions.opponentDone();
    })
    socket.on('game:marshal', () => {
      gameflow.actions.gotoMarshal();
    })
  }

  drawPhaseDrawing() {
    const { action } = this.props;
    action();
    action();
    this.setState({drawComplete: true})
  }

  drawCard() {
    const { gameflow } = this.props;
    if (this.props.gameflow.states.isDrawPhase) {
      this.drawPhaseDrawing();
    } else {
      this.props.action()
    }
  }

  doneStage() {
    const { gameflow, socket } = this.props;
    if (gameflow.payload.isOpponentDone) {
      gameflow.actions.gotoMarshal();
      socket.emit('game:marshal');
    } else {
      gameflow.actions.playerDone();
      socket.emit('opponent:done');
    }
  }

  render() {
    const { deck, gameflow } = this.props;
    let text = gameflow.states.isDrawPhase ? "Click once get 2 cards" : "MAMA PAPA MATBEN MAPK";
    return (
      <div>
        { gameflow.states.isDrawPhase && this.state.drawComplete && !gameflow.payload.isPlayerDone && <button onClick={this.doneStage}>Next stage</button> }
        { gameflow.states.isDrawPhase && !gameflow.payload.isOpponentDone && gameflow.payload.isPlayerDone && <span>Wait for opponent</span> }
        <div onClick={this.drawCard}>
          <Deck deck={deck} text={text}/>
        </div>
      </div>
    )
  }

}

MainDeck.propTypes = {
  socket: PropTypes.object.isRequired,
  deck: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
}

export default MainDeck;
