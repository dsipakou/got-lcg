import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    }
  }

  startNewGame() {
    this.props.newGame();
  }

  login() {
    this.setState({ loggedin: true });
  }

  render() {
    if (this.state.loggedin) {
      return (
        <div>
          <button onClick={this.startNewGame.bind(this)}>Start new game</button>
        </div>
      )
    } else {
      return (
        <LoginForm login={this.login.bind(this)}/>
      )
    }
  }
}

Lobby.propTypes = {
  newGame: PropTypes.func
}

export default Lobby;
