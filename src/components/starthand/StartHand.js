import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StartHand.scss';
import Card from '../../components/card/Card';
import Deck from '../../components/deck/Deck';

class StartHand extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.deckActions.getStartHand()
  }

  render () {
    const { hand } = this.props
    return (
      <div className='starthand-inner'>
        <div>StartHand</div>
        <div>
          {
            hand.map((card, index) => (
              <Card {...card} index={index} key={card.uid} />
            ))
          }
        </div>
        <Deck />
      </div>
    )
  }
}

StartHand.propTypes = {
  hand: PropTypes.array,
  deckActions: PropTypes.shape({
    getStartHand: PropTypes.func
  })
}


export default StartHand;
