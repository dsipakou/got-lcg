import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck';
import Card from '../../card/Card';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    height                : '50%',
    width                 : '90%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display               : 'flex',
    flexFlow              : 'row wrap',
    alignItems            : 'center',
    justifyContent        : 'center',
  }
};



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
        <Modal style={customStyles}
          shouldCloseOnOverlayClick={true}
          isOpen={this.state.showModal}
          contectLabel="Hello modal">
          <button onClick={this.closeModal}>Close modal</button>
          {cards.map((card, index) => (
            <Card {...card} index={index} key={card.uid} plot={true} />
          ))}
        </Modal>
      </div>
    )
  }

}

PlotDeck.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default PlotDeck;
