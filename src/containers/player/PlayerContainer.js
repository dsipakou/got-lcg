import React from 'react'
import PropTypes from 'prop-types'
import Player from '../../components/player/player'
import { playLocation, playCharacter } from '../../redux/actions/hand'
import { kneelLocation, standLocation } from '../../redux/actions/location';
import { kneelCharacter, standCharacter } from '../../redux/actions/character';
import { drawCard } from '../../redux/actions/deck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const PlayerContainer = ({
  deck,
  hand,
  locations,
  characters,
  drawCard,
  playLocation,
  kneelLocation,
  standLocation,
  playCharacter,
  kneelCharacter,
  standCharacter
}) => {
  return (
    <Player deck={deck} hand={hand} locations={locations} characters={characters} onDeckClick={drawCard} onPlayLocation={playLocation} onKneelLocation={kneelLocation} onStandLocation={standLocation} onPlayCharacter={playCharacter} onKneelCharacter={kneelCharacter} onStandCharacter={standCharacter} />
  )
}

PlayerContainer.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters:PropTypes.array.isRequired,
  drawCard: PropTypes.func.isRequired,
  playLocation: PropTypes.func.isRequired,
  kneelLocation: PropTypes.func.isRequired,
  standLocation: PropTypes.func.isRequired,
  playCharacter: PropTypes.func.isRequired,
  kneelCharacter: PropTypes.func.isRequired,
  standCharacter: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    deck: state.deckReducer,
    hand: state.handReducer,
    locations: state.locationReducer,
    characters: state.characterReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ drawCard, playLocation, kneelLocation, standLocation, playCharacter, kneelCharacter, standCharacter }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer)
