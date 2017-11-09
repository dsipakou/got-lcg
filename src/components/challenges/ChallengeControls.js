import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChallengeControls extends Component {
  constructor() {
    super();
    this.chooseMilitary = this.chooseMilitary.bind(this);
    this.chooseIntrigue = this.chooseIntrigue.bind(this);
    this.choosePower = this.choosePower.bind(this);
    this.state = {
      military: false,
      intrigue: false,
      power: false,
    }
  }

  chooseMilitary() {
    const { gameflow } = this.props;
    this.setState({ military: true });
    gameflow.challenges.setCurrentChallenge('MILITARY');
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

  render() {
    const { gameflow } = this.props;
    return (
      <div>
        { !this.state.military && <button onClick={this.chooseMilitary}>Military</button> }
        { !this.state.intrigue && <button onClick={this.chooseIntrigue}>Intrigue</button> }
        { !this.state.power && <button onClick={this.choosePower}>Power</button> }
      </div>
    )
  }
}

ChallengeControls.propTypes = {
  gameflow: PropTypes.object.isRequired,
}

export default ChallengeControls;
