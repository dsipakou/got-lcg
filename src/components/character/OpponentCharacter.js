import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './OpponentCharacter.scss';
import {
  addOpponentCharacter,
  kneelOpponentCharacter,
  standOpponentCharacter,
} from '../../redux/actions/opponent/opponentCharacter';

class OpponentCharacter extends Component {
  componentDidMount() {
    const { socket, dispatch } = this.props;
    socket.on('add character', data =>
      dispatch(addOpponentCharacter(data.action.payload))
    );
    socket.on('kneel character', data =>
      dispatch(kneelOpponentCharacter(data.action.index))
    );
    socket.on('stand character', data =>
      dispatch(standOpponentCharacter(data.action.index))
    );
  }

  render() {
    const { cards } = this.props;
    return (
      <div className="opponent-character-inner">
        {cards.map((card, index) => (
          <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
        ))}
      </div>
    )
  }
}

OpponentCharacter.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentCharacter;
