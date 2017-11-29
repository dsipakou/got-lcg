import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import Deck from '../Deck';
import Card from '../../card/Card';
import { playPlot } from '../../../redux/actions/player/plot';

const customStyles = {
  content: {
    height: '40%',
    width: '90%',
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'papayawhip',
  },
};

function collectProps(props) {
  return {
    index: props.index,
  };
}

class PlotDeck extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      done: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.play = this.play.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  play(event, data) {
    const { dispatch, gameflow } = this.props;
    dispatch(playPlot(data.index));
    gameflow.actions.playerDone();
    this.setState({ done: true });
  }

  render() {
    const { cards, gameflow } = this.props;
    return (
      <div onClick={this.openModal}>
        <Deck deck={cards} text="Plot Pile" plot />
        <Modal
          style={customStyles}
          onRequestClose={this.closeModal}
          isOpen={this.state.showModal}
        >
          {cards.map((card, index) => (
            <ContextMenuTrigger holdToDisplay={-1} id="plot_context_menu" collect={collectProps} key={card.uid} index={index}>
              <Card {...card} index={index} key={card.uid} plot />
            </ContextMenuTrigger>
          ))}
          {
            gameflow.states.isPlotPhase &&
            !this.state.done &&
            <ContextMenu id="plot_context_menu">
              <MenuItem onClick={this.play}>Play Plot</MenuItem>
            </ContextMenu>
          }
        </Modal>
      </div>
    );
  }
}

PlotDeck.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
  cards: PropTypes.array.isRequired,
};

export default PlotDeck;
