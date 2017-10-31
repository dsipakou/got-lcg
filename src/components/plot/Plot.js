import React, {Component} from 'react';
import Deck from '../deck/Deck';
import Card from '../card/Card';
import PropTypes from 'prop-types';

class Plot extends Component {
  constructor() {
    super();
    this.doneTurn = this.doneTurn.bind(this);
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('opponent:done', () => {
      gameflow.actions.opponentDone();
    })
  }

  doneTurn() {

  }

  render() {
    const { cards, gameflow } = this.props;
    console.log(gameflow.payload.isOpponentDone)
    return (
      <div>
        <h2>Plot in play</h2>
        {gameflow.payload.isOpponentDone && <button onClick={this.doneTurn}>Next stage</button>}

        <Deck deck={cards} plot={true} revealed={gameflow.payload.isOpponentDone} />
      </div>
    )
  }
}

Plot.propTypes = {
  cards: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired
}

export default Plot;
