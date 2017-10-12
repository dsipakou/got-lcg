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
    height                : '40%',
    width                 : '90%',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    display               : 'flex',
    flexFlow              : 'row wrap',
    alignItems            : 'center',
    justifyContent        : 'center',
    background            : 'papayawhip',
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
        <Deck deck={cards} text="Plot Pile" plot={true} />
        <Modal style={customStyles}
          onRequestClose={this.closeModal}
          isOpen={this.state.showModal}>
          {cards.map((card, index) => (
            <Card {...card} index={index} key={card.uid} plot={true} />
          ))}
          <div>
            <button onClick={this.closeModal}>Close modal</button>
          </div>
        </Modal>
      </div>
    )
  }

}

PlotDeck.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default PlotDeck;
