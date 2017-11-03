import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';
import './OpponentCharacter.scss';

class OpponentCharacter extends Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on('add character', data =>
      actions.addOpponentCharacter(data.action.payload)
    );

    socket.on('kneel character', data =>
      actions.kneelOpponentCharacter(data.action.index)
    );

    socket.on('stand character', data =>
      actions.standOpponentCharacter(data.action.index)
    );
  }

  render() {
    const { cards, gameflow } = this.props;
    return (
      <div className='opponent-character-inner'>
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
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentCharacter;
