import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Board from './Board';

const BoardContainer = ({
  socket,
  dispatch,
}) => {
  return (
    <Board dispatch={dispatch} socket={socket} />
  );
};

BoardContainer.propTypes = {
  socket: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ state });

export default connect(mapStateToProps)(BoardContainer);
