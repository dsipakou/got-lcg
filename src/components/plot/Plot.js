import React, {Component} from 'react';
import Deck from '../deck/Deck';
import Card from '../card/Card';
import PropTypes from 'prop-types';

class Plot extends Component {
  constructor() {
    super();
    this.state = {
      setFirstPlayer: false,
      donePlotStage: false,
    }
    this.doneTurn = this.doneTurn.bind(this);
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('opponent:done', () => {
      gameflow.actions.opponentDone();
    });
    socket.on('game:first player', (isFirstPlayer) => {
      gameflow.actions.setFirstPlayer(isFirstPlayer);
      this.setState({setFirstPlayer: true})
    });
    socket.on('game:draw', () => {
      gameflow.actions.gotoDraw();
    })
  }

  chooseFirstPlayer(isPlayer) {
    const { gameflow, socket } = this.props;
    this.setState({setFirstPlayer: true});
    gameflow.actions.setFirstPlayer(isPlayer);
    socket.emit('game:first player', {isFirstPlayer: !isPlayer});
  }

  doneTurn() {
    const { gameflow, socket } = this.props;
    if (gameflow.payload.isOpponentDone) {
      gameflow.actions.gotoDraw();
      socket.emit('game:draw');
    } else {
      this.setState({donePlotStage: true});
      gameflow.actions.playerDone();
      socket.emit('opponent:done');
    }
  }

  render() {
    const { cards, gameflow, playerPlotsInPlay, opponentPlotsInPlay } = this.props;
    return (
      <div>
        <h2>Plot in play</h2>
        {
          this.state.donePlotStage &&
          this.state.setFirstPlayer &&
          <button onClick={this.doneTurn}>Next stage</button>
        }
        {
          this.state.setFirstPlayer &&
          !this.state.donePlotStage &&
          <span>Wait for your opponent</span>
        }
        {
          gameflow.payload.isOpponentDone &&
          gameflow.payload.isPlayerDone &&
          !this.state.setFirstPlayer &&
          playerPlotsInPlay[playerPlotsInPlay.length - 1].initiative > opponentPlotsInPlay[opponentPlotsInPlay.length - 1].initiative &&
          <button onClick={() => this.chooseFirstPlayer(true)}>I will be first player</button> && <button onClick={() => this.chooseFirstPlayer(false)}>My opponent will be first player</button>
        }
        <Deck deck={cards} plot={true} revealed={gameflow.payload.isOpponentDone} />
      </div>
    )
  }
}

Plot.propTypes = {
  cards: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
  playerPlotsInPlay: PropTypes.array,
  opponentPlotsInPlay: PropTypes.array,
}

export default Plot;
