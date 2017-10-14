import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCreated: false,
    }
  }

  createRoom() {
    this.props.actions.newRoom();
    this.setState({ roomCreated: true });
  }

  render() {
    const { rooms } = this.props;
    return (
      <div>
        { !this.state.roomCreated &&
        <button onClick={ this.createRoom.bind(this) }>Create new room</button> }
        <ul>
        { rooms.map((room, index) => (<li><button key={room.id}>Join room</button></li>)) }
        </ul>
      </div>
    )
  }

}

Room.propTypes = {
  socket: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    newRoom: PropTypes.func.isRequired,
  }),
  rooms: PropTypes.array.isRequired
}

export default Room;
