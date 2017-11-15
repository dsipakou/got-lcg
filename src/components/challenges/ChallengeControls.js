import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MILITARY = 'MILITARY';
const INTRIGUE = 'INTRIGUE';
const POWER = 'POWER';


class ChallengeControls extends Component {
  constructor() {
    super();
    this.chooseMilitary = this.chooseMilitary.bind(this);
    this.chooseIntrigue = this.chooseIntrigue.bind(this);
    this.choosePower = this.choosePower.bind(this);
    this.attack = this.attack.bind(this);
    this.state = {
      military: false,
      intrigue: false,
      power: false,
      hideControls: false,
      yourTurn: false,
      currentChallenge: '',
    };
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    if (gameflow.payload.isYourTurn) {
      this.setState({ yourTurn: true });
    }

    socket.on('challenge:attack', () => {
      this.setState({ hideControls: false });
    });

    socket.on('game:your turn', () => {
      gameflow.actions.yourTurn(true);
    });
    socket.on('challenge:set', (challenge) => {
      this.setState({ currentChallenge: challenge });
      switch (challenge) {
        case MILITARY:
          this.setState({ military: true });
          break;
        case INTRIGUE:
          this.setState({ intrigue: true });
          break;
        case POWER:
          this.setState({ power: true });
          break;
        default:
          break;
      }
    });
  }

  chooseMilitary() {
    const { socket } = this.props;
    this.setState({ military: true, currentChallenge: MILITARY });
    socket.emit('challenge:set', (MILITARY));
  }

  chooseIntrigue() {
    const { socket } = this.props;
    this.setState({ intrigue: true, currentChallenge: INTRIGUE });
    socket.emit('challenge:set', (INTRIGUE));
  }

  choosePower() {
    const { socket } = this.props;
    this.setState({ power: true, currentChallenge: POWER });
    socket.emit('challenge:set', (POWER));
  }

  attack() {
    const { socket, gameflow } = this.props;
    this.setState({ hideContorls: true });
    socket.emit('challenge:attack');
    socket.emit('game:your turn');
    gameflow.actions.yourTurn(false);
  }

  render() {
    const { gameflow } = this.props;
    const militaryButton = !this.state.military ? 'Military' : 'Done military';
    if (this.state.yourTurn) {
      return (
        <div>
          { this.state.currentChallenge !== '' && <span>Current: {this.state.currentChallenge}</span> }
          { !(this.state.currentChallenge === '') && <button onClick={this.attack}>Attack</button>}
          { this.state.currentChallenge === '' && !this.state.military && <button onClick={this.chooseMilitary}>{militaryButton}</button> }
          { this.state.currentChallenge === '' && !this.state.intrigue && <button onClick={this.chooseIntrigue}>Intrigue</button> }
          { this.state.currentChallenge === '' && !this.state.power && <button onClick={this.choosePower}>Power</button> }
        </div>
      );
    }
    return (
      <div>
        { this.state.currentChallenge !== '' && <span>Current: {this.state.currentChallenge}</span> }
        <span>Wait for opponent complete</span>
      </div>
    );
  }
}

ChallengeControls.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
}

export default ChallengeControls;
