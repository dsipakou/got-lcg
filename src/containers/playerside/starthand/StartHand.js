import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StartHand.scss';
import Card from '../../../components/card/Card';
import Deck from '../../../components/deck/Deck';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class StartHand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canMulligan: true,
    }
  }

  doMulligan(e) {
    this.setState({canMulligan: false})
    this.props.deckActions.doMulligan()
    this.props.deckActions.getStartHand()
  }
  render () {
    const { deck, hand, deckActions } = this.props
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
          { this.state.canMulligan && hand.length > 0 ? <button onClick={this.doMulligan.bind(this)}>Do mulligan</button> : null }
          { hand.length > 0 ? <button>Start Game</button> : null }
          </div>
        </div>
        <div className='starthand-footer'>
          <Deck deck={deck} action={hand.length == 0 ? deckActions.getStartHand : ()=>{} } />
        </div>
      </div>
    )
  }
}

StartHand.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array,
  deckActions: PropTypes.shape({
    getStartHand: PropTypes.func,
    doMulligan: PropTypes.func
  })
}

const mapStateToProps = (state) => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
})

const mapDispatchToProps = (dispatch) => ({
  deckActions: bindActionCreators({
    drawCard,
    getStartHand,
    doMulligan
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(StartHand)