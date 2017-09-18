import React from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { CARD_LOCATION } from '../../redux/actions/deck';
import { playCard } from '../../redux/actions/hand'
import { drawCard } from '../../redux/actions/deck'
import { addLocation } from '../../redux/actions/location';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const PlayerContainer = ({deck, hand, locations, drawCard, playCard, addLocation}) => {
  const handCards = deck.filter((item) => {return item.location === CARD_LOCATION.HAND });
  return (
    <Player deck={deck} cards={hand} locations={locations} onDeckClick={drawCard} onPlayLocation={playLocation} />
  )
}

PlayerContainer.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired,
  playLocation: PropTypes.func.isRequired,
  addLocation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  console.log(state);
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
