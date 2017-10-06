import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/lobby/loginform/LoginForm';
import { newRoom } from '../../redux/actions/room';
import Room from '../../components/lobby/room/Room';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedin: false
    }
  }

  login() {
    this.setState({ loggedin: true });
  }

  render() {
    const { socket, roomActions } = this.props;
    if (this.state.loggedin) {
      console.log('roomactions' + roomActions)
      return (
        <Room socket={socket} actions={roomActions} />
      )
    } else {
      return (
        <LoginForm login={this.login.bind(this)}/>
      )
    }
  }
}

Lobby.propTypes = {
  socket: PropTypes.object.isRequired,
  roomActions: PropTypes.shape({
    newRoom: PropTypes.func.isRequired
  })
}

const mapStateToProps = (state) => ({
  room: state.roomReducer,
});

const mapDispatchToProps = (dispatch) => ({
  roomActions: bindActionCreators({
    newRoom,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
