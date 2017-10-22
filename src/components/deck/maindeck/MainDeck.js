import React, { Component } from 'react';
import Deck from '../Deck';
import PropTypes from 'prop-types';

class MainDeck extends Component {

  constructor() {
    super();
    this.drawCard = this.drawCard.bind(this);
    this.drawPhaseDrawing = this.drawPhaseDrawing.bind(this);
  }

  drawPhaseDrawing() {
    this.props.action();
    this.props.action();
    this.props.gameflow.actions.gotoMarshal();
  }

  drawCard() {
    if (this.props.gameflow.states.isDrawPhase) {
      this.drawPhaseDrawing();
    } else {
      this.props.action()
    }
  }

  render() {
    const { deck, gameflow } = this.props;
    let text = gameflow.states.isDrawPhase ? "Click once get 2 cards" : "MAMA PAPA MATBEN MAPK";
    return (
      <div onClick={this.drawCard}>
        <Deck deck={deck} text={text}/>
      </div>
    )
  }

}

MainDeck.propTypes = {
  deck: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
}

export default MainDeck;
