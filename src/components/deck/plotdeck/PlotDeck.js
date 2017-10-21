import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Deck from '../Deck';
import Card from '../../card/Card';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import Modal from 'react-modal';
import { playPlot } from '../../../redux/actions/player/plot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const customStyles = {
  content : {
    height                : '40%',
    width                 : '90%',
    display               : 'flex',
    flexFlow              : 'row wrap',
    alignItems            : 'center',
    justifyContent        : 'center',
    background            : 'papayawhip',
  }
};

function collect_props(props) {
  return {
    index: props.index
  }
}

class PlotDeck extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    }
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.play = this.play.bind(this);
  }

  openModal() {
    this.setState({ showModal: true, })
  }

  closeModal() {
    this.setState({ showModal: false, })
  }

  play(event, data) {
    this.props.actions.playPlot(data.index);
    this.props.gameflow.actions.gotoMarshal();
  }

  render () {
    const { cards, gameflow } = this.props
    console.log(this.props.gameflow);
    return (
      <div onClick={this.openModal}>
        <Deck deck={cards} text="Plot Pile" plot={true} />
        <Modal style={customStyles}
          onRequestClose={this.closeModal}
          isOpen={this.state.showModal}>
          {cards.map((card, index) => (
            <ContextMenuTrigger holdToDisplay={-1} id='plot_context_menu' collect={collect_props} key={card.uid} index={index}>
              <Card {...card} index={index} key={card.uid} plot={true} />
            </ContextMenuTrigger>
          ))}
          { gameflow.states.plotPhase &&
          <ContextMenu id='plot_context_menu' >
            <MenuItem onClick={this.play}>Play Plot</MenuItem>
          </ContextMenu>
          }
        </Modal>
      </div>
    )
  }
}

PlotDeck.propTypes = {
  cards: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
}

export default PlotDeck;
