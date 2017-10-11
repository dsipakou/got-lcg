import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck';
import ReactModal from 'react-modal';

class PlotDeck extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal =this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true, })
  }

  closeModal() {
    this.setState({ showModal: false, })
  }

  render () {
    const { cards } = this.props
    return (
      <div onClick={this.openModal}>
        <Deck deck={cards} text="Plot Pile" />
        <ReactModal
          isOpen={this.state.showModal}
          contectLabel="Hello modal">
          <button onClick={this.closeModal}>Close modal</button>
        </ReactModal>
      </div>
    )
  }

}

PlotDeck.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default PlotDeck;
