import React from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { playLocation } from '../../redux/actions/hand'
import { drawCard } from '../../redux/actions/deck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const PlayerContainer = ({deck, hand, locations, drawCard, playLocation}) => {
  return (
    <Player deck={deck} hand={hand} locations={locations} onDeckClick={drawCard} onPlayLocation={playLocation} />
  )
}

PlayerContainer.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired,
  playLocation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    deck: state.deckReducer,
    hand: state.handReducer,
    locations: state.locationReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ drawCard, playLocation }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
