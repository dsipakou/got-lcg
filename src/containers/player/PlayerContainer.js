import React, { Component } from 'react'
import Player from '../../components/player/player'
import { playCard, drawCard } from '../../redux/actions/card'
import { connect } from 'react-redux'
import bindActionCreators from 'redux'

const PlayerContainer = (cards, drawACard) => {
  return (
    <Player cards={cards} onDeckClick={drawACard} />
  )
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ drawACard: drawCard }, dispatch)
)

export default connect(
  state => ({
    cards: state
  }), mapDispatchToProps)(PlayerContainer)
