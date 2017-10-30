import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomCreated: false,
    }
  }

  componentDidMount() {
    const { actions, socket } = this.props;
    socket.on('room:created', (id) => {
      actions.newRoom(id);
    })
  }

  createRoom() {
    const { actions, socket, rooms } = this.props;
    let roomId = uuid.v4();
    socket.emit('room:created', {id: roomId})
    this.setState({ roomCreated: true });
  }

  render() {
    const { rooms } = this.props;
    return (
      <div>
        { !this.state.roomCreated &&
        <button onClick={ this.createRoom.bind(this) }>Create new room</button> }
        <ul>
        { this.state.roomCreated && <span>Wait for connect</span>}
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
