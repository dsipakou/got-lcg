import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OpponentPlot extends Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on('play plot', data =>
      actions.addOpponentPlot(data.action.payload)
    );
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}
