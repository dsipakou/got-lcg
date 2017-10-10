import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../../components/deck/Deck';

class DiscardPile extends Component {
  render() {
    const { cards } = this.props;
    return (
      <div>
        <Deck deck={cards} text="Discard Pile" />
      </div>
    )
  }
}

DiscardPile.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default DiscardPile;
