import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StartHand.scss';
import Card from '../../components/card/Card';
import Deck from '../../components/deck/Deck';

class StartHand extends Component {
  constructor(props) {
    super(props)
    this.state = {
      canMulligan: true,
    }
  }

  doMulligan(e) {
    this.setState({mulliganed: false})
    this.props.deckActions.getStartHand()
  }
  render () {
    const { deck, hand, deckActions } = this.props
    console.log(this.state.canMulligan)
    return (
      <div className='starthand-inner'>
        <div className='starthand-header'>StartHand</div>
        <div className='starthand-content'>
          <div>
          {
            hand.map((card, index) => (
              <Card {...card} index={index} key={card.uid} isDragging={false} />
            ))
          }
          </div>
          <div>
          { this.state.canMulligan ? <button onClick={this.doMulligan.bind(this)}>Do mulligan</button> : null }
          <button>Start Game</button>
         </div>
        </div>
        <div className='starthand-footer'>
          <Deck deck={deck} action={deckActions.getStartHand} />
        </div>
      </div>
    )
  }
}

StartHand.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array,
  deckActions: PropTypes.shape({
    getStartHand: PropTypes.func
  })
}


export default StartHand;
