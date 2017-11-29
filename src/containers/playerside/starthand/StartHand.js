import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../../../components/card/Card';
import MainDeck from '../../../components/deck/maindeck/MainDeck';
import Messages from '../../../components/general/Messages';
import { makeDeck, getStartHand, doMulligan } from '../../../redux/actions/player/deck';
import './StartHand.scss';

class StartHand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canMulligan: true,
    };
    this.doMulligan = this.doMulligan.bind(this);
    this.doneStage = this.doneStage.bind(this);
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('opponent:done', () => {
      gameflow.actions.opponentDone();
    });
    socket.on('game:plot', () => {
      gameflow.actions.gotoPlot();
    });
  }

  doMulligan() {
    const { dispatch } = this.props;
    this.setState({ canMulligan: false });
    dispatch(doMulligan());
    dispatch(getStartHand());
  }

  doneStage() {
    const { socket, gameflow } = this.props;
    gameflow.actions.playerDone();
    if (!gameflow.payload.isOpponentDone) {
      socket.emit('opponent:done');
    } else {
      socket.emit('game:plot');
      gameflow.actions.gotoPlot();
    }
  }

  render() {
    const {
      dispatch,
      deck,
      hand,
      gameflow,
      socket,
    } = this.props;
    if (this.state.canMulligan) {
      dispatch(makeDeck());
    }
    return (
      <div className="starthand-inner">
        { !gameflow.payload.isPlayerDone && <Messages text="Choose your start hand" /> }
        { gameflow.payload.isPlayerDone && <Messages text="Wait for opponent done" /> }
        <div className="starthand-content">
          <div className="starthand-cardlist">
            {
              hand.map((card, index) => (
                <Card {...card} index={index} key={card.uid} />
              ))
            }
          </div>
          <div className="starthand-buttons">
            {
              !gameflow.payload.isPlayerDone &&
              this.state.canMulligan &&
              hand.length > 0 ? <button onClick={this.doMulligan}>Do mulligan</button> : null
            }
            {
              !gameflow.payload.isPlayerDone &&
              hand.length > 0 ? <button onClick={this.doneStage}>Done</button> : null
            }
          </div>
        </div>
        <div className="starthand-footer">
          <MainDeck
            deck={deck}
            dispatch={dispatch}
            gameflow={gameflow}
            socket={socket}
          />
        </div>
      </div>
    );
  }
}

StartHand.propTypes = {
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  gameflow: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
});

export default connect(mapStateToProps)(StartHand);
