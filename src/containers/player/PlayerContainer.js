import React from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { playCard, drawCard } from '../../redux/actions/card'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const PlayerContainer = ({cards, drawCard, playCard}) => {
  return (
    <Player cards={cards} onDeckClick={drawCard} onPlayCard={playCard} />
  )
}

PlayerContainer.propTypes = {
  cards: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return { cards: state }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ drawCard, playCard }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
