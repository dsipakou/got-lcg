import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Player from '../../components/player/player';
import Opponent from '../opponent/opponent';
import StartHand from '../../components/starthand/StartHand';
import { playLocation, playCharacter } from '../../redux/actions/hand'
import { kneelLocation, standLocation } from '../../redux/actions/location';
import { kneelCharacter, standCharacter } from '../../redux/actions/character';
import { drawCard, getStartHand, doMulligan } from '../../redux/actions/deck'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import './board.scss'

const Board = ({ deck, hand, locations, characters, deckActions, locationActions, characterActions }) => {
  let starthand = true;
  if (starthand) {
    return (
      <div className='board'>
        <StartHand deck={deck} hand={hand} deckActions={deckActions}/>
      </div>
    )
  } else {
    return (
      <div className='board'>
        <Opponent />
        <Player deck={deck} hand={hand} locations={locations} characters={characters} deckActions={deckActions} locationActions={locationActions} characterActions={characterActions} />
      </div>
    )
  }
}

Board.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  deckActions: PropTypes.shape({
    drawCard: PropTypes.func.isRequired,
    getStartHand: PropTypes.func,
    doMulligan: PropTypes.func
  }),
  locationActions: PropTypes.shape({
    playLocation: PropTypes.func.isRequired,
    kneelLocation: PropTypes.func.isRequired,
    standLocation: PropTypes.func.isRequired,
  }),
  characterActions: PropTypes.shape({
    playCharacter: PropTypes.func.isRequired,
    kneelCharacter: PropTypes.func.isRequired,
    standCharacter: PropTypes.func.isRequired,
  })
}

const mapStateToProps = (state) => ({
  deck: state.deckReducer,
  hand: state.handReducer,
  locations: state.locationReducer,
  characters: state.characterReducer,
})

const mapDispatchToProps = (dispatch) => ({
  deckActions: bindActionCreators({
    drawCard,
    getStartHand,
    doMulligan
  }, dispatch),
  locationActions: bindActionCreators({
    playLocation,
    standLocation,
    kneelLocation,
  }, dispatch),
  characterActions: bindActionCreators({
    playCharacter,
    standCharacter,
    kneelCharacter,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
