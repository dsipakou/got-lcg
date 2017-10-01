import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '../card/Card';

class OpponentCharacter extends Component {
  componentDidMount() {
    const { socket, actions } = this.props;
    socket.on('add character', data =>
      actions.addOpponentCharacter(data.action.payload)
    );

    socket.on('kneel character', data =>
      actions.kneelOpponentCharacter(data.action.index)
    );
  }

  render() {
    const { cards } = this.props;
    return (
      <div className='character-inner'>
        {cards.map((card, index) => (
          <Card {...card} index={index} key={card.uid} revealed={true} opponent={true} />
        ))}
      </div>
    )
  }
}

OpponentCharacter.propTypes = {
  socket: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object
}

export default OpponentCharacter;
