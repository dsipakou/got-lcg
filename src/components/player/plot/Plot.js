import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../../deck/Deck';
import ReactModal from 'react-modal';

class Plot extends Component {
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
      <div>
        <Deck deck={cards} onClick={this.openModal} text="Plot Pile" />
        <ReactModal
          isOpen={this.state.showModal}
          contectLabel="Hello modal">
          <button onClick={this.closeModal}>Close modal</button>
        </ReactModal>
      </div>
    )
  }

}

Plot.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default Plot;
