import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StartHand.scss';
import Card from '../../../components/card/Card';
import MainDeck from '../../../components/deck/maindeck/MainDeck';
import { getStartHand, doMulligan } from '../../../redux/actions/player/deck';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class StartHand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canMulligan: true,
    }
    this.doMulligan = this.doMulligan.bind(this);
    this.gotoPlotPhase = this.props.gameflow.actions.gotoPlot.bind(this);
  }

  doMulligan(e) {
    this.setState({canMulligan: false})
    this.props.deckActions.doMulligan()
    this.props.deckActions.getStartHand()
  }
  render () {
    const { deck, hand, deckActions, gameflow } = this.props
    console.log(this.state.canMulligan)
    return (
      <div className='starthand-inner'>
        <div className='starthand-header'>StartHand</div>
        <div className='starthand-content'>
          <div className='starthand-cardlist'>
          {
            hand.map((card, index) => (
              <Card {...card} index={index} key={card.uid} />
            ))
          }
          </div>
          <div className='starthand-buttons'>
          { this.state.canMulligan && hand.length > 0 ? <button onClick={this.doMulligan}>Do mulligan</button> : null }
          { hand.length > 0 ? <button onClick={this.gotoPlotPhase}>Start Game</button> : null }
          </div>
        </div>
        <div className='starthand-footer'>
          <MainDeck deck={deck} action={hand.length == 0 ? deckActions.getStartHand : ()=>{} } gameflow={gameflow} />
        </div>
      </div>
    )
  }
}

StartHand.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  deckActions: PropTypes.shape({
    getStartHand: PropTypes.func.isRequired,
    doMulligan: PropTypes.func.isRequired,
  }),
  gameflow: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
})

const mapDispatchToProps = (dispatch) => ({
  deckActions: bindActionCreators({
    getStartHand,
    doMulligan
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StartHand)
