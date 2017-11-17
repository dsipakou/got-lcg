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
    this.defence = this.defence.bind(this);
    this.state = {
      military: false,
      intrigue: false,
      power: false,
      isYourTurn: false,
      currentChallenge: '',
    };
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;
    if (gameflow.payload.isYourTurn) {
      this.setState({ isYourTurn: true });
    }

    socket.on('game:your turn', () => {
      gameflow.actions.yourTurn(true);
    });
    socket.on('challenge:set', (challenge) => {
      this.setState({ currentChallenge: challenge });
      this.setChallenge(challenge);
    });
    socket.on('challenge:attack', () => {
      this.setState({ isYourTurn: true });
    });
    socket.on('challenge:defence', () => {
      this.setState({ isYourTurn: true, currentChallenge: '' });
    });
    socket.on('opponent:done', () => {
      this.setState({
        military: false,
        intrigue: false,
        power: false,
        isYourTurn: true,
        currentChallenge: '',
      });
    });
  }

  setChallenge(challenge) {
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
  }

  chooseMilitary() {
    const { socket } = this.props;
    this.setState({ currentChallenge: MILITARY });
    socket.emit('challenge:set', (MILITARY));
  }

  chooseIntrigue() {
    const { socket } = this.props;
    this.setState({ currentChallenge: INTRIGUE });
    socket.emit('challenge:set', (INTRIGUE));
  }

  choosePower() {
    const { socket } = this.props;
    this.setState({ currentChallenge: POWER });
    socket.emit('challenge:set', (POWER));
  }

  attack() {
    const { socket } = this.props;
    this.setChallenge(this.state.currentChallenge);
    socket.emit('challenge:attack');
    this.setState({ isYourTurn: false });
  }

  defence() {
    const { socket } = this.props;
    socket.emit('challenge:defence');
    this.setState({ isYourTurn: false });
  }

  render() {
    const { gameflow } = this.props;
    const militaryButton = !this.state.military ? 'Military' : 'Done military';
    if (this.state.isYourTurn) {
      return (
        <div>
          {
            this.state.currentChallenge !== '' &&
            <p>Current: {this.state.currentChallenge}</p>
          }
          {
            !(this.state.currentChallenge === '') &&
            gameflow.payload.isYourTurn &&
            this.state.isYourTurn &&
            <button onClick={this.attack}>Attack</button>
          }
          {
            !gameflow.payload.isYourTurn &&
            this.state.isYourTurn &&
            <button onClick={this.defence}>Defence</button>
          }
          {
            gameflow.payload.isYourTurn &&
            !this.state.military &&
            <button onClick={this.chooseMilitary}>{militaryButton}</button>
          }
          {
            gameflow.payload.isYourTurn &&
            !this.state.intrigue &&
            <button onClick={this.chooseIntrigue}>Intrigue</button>
          }
          {
            gameflow.payload.isYourTurn &&
            !this.state.power &&
            <button onClick={this.choosePower}>Power</button>
          }
        </div>
      );
    }
    return (
      <div>
        { this.state.currentChallenge !== '' && <p>Current: {this.state.currentChallenge}</p> }
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
