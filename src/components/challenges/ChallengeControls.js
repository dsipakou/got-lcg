import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
      hideContorls: false,
    }
  }

  componentDidMount() {
    const { socket, gameflow } = this.props;

    socket.on('challenge:attack', () => {
      this.setState({hideContorls: false})
    });

    socket.on('game:your turn', () => {
      gameflow.actions.yourTurn(true);
    });

    socket.on('challenge:set', (challenge) => {
      switch(challenge) {
        case 'MILITARY': {
          this.setState({military: true});
          break;
        };
        case 'INTRIGUE': {
          this.setState({intrigue: true});
          break;
        };
        case 'POWER': {
          this.setState({power: true});
          break;
        }
      }
    });
  }

  chooseMilitary() {
    const { gameflow, socket } = this.props;
    this.setState({ military: true });
    gameflow.challenges.setCurrentChallenge('MILITARY');
    socket.emit('challenge:set', ("MILITARY"));
    return (
      <button>asfasfsaf</button>
    )
  }

  chooseIntrigue() {
    const { gameflow } = this.props;
    this.setState({ intrigue: true });
    gameflow.challenges.setCurrentChallenge('INTRIGUE');
  }

  choosePower() {
    const { gameflow } = this.props;
    this.setState({ power: true });
    gameflow.challenges.setCurrentChallenge('POWER');
  }

  attack() {
    const { socket } = this.props;
    this.setState({hideContorls: true});
    socket.emit('challenge:attack');
    socket.emit('game:your turn');
    gameflow.actions.yourTurn(false);
  }

  render() {
    const { gameflow } = this.props;
    let militaryButton = !this.state.military ? "Military" : "Done military";
    return (
      <div>
        { !(gameflow.challenges.currentChallenge === '') && <button onClick={this.attack}>Attack</button>}
        { gameflow.challenges.currentChallenge === '' && !this.state.military && <button onClick={this.chooseMilitary}>{militaryButton}</button> }
        { gameflow.challenges.currentChallenge === '' && !this.state.intrigue && <button onClick={this.chooseIntrigue}>Intrigue</button> }
        { gameflow.challenges.currentChallenge === '' && !this.state.power && <button onClick={this.choosePower}>Power</button> }
      </div>
    )
  }
}

ChallengeControls.propTypes = {
  gameflow: PropTypes.object.isRequired,
}

export default ChallengeControls;
