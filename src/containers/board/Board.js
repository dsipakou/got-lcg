import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Player from '../../components/player/player';
import Opponent from '../../components/opponent/Opponent';
import Lobby from '../../containers/lobby/Lobby';
import Navigation from '../../components/navigation/Navigation';
import StartHand from '../../components/starthand/StartHand';
import { playLocation, playCharacter, playEvent } from '../../redux/actions/hand'
import { discardEvent } from '../../redux/actions/event';
import { kneelLocation, standLocation } from '../../redux/actions/location';
import { addOpponentLocation, kneelOpponentLocation, standOpponentLocation } from '../../redux/actions/opponentLocation';
import { kneelCharacter, standCharacter } from '../../redux/actions/character';
import { addOpponentCharacter, kneelOpponentCharacter, standOpponentCharacter } from '../../redux/actions/opponentCharacter';
import { drawCard, getStartHand, doMulligan } from '../../redux/actions/deck';
import { newGame } from '../../redux/actions/game';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './board.scss'

const Board = ({
  socket,
  deck,
  hand,
  discardPile,
  plotCards,
  room,
  locations, opponentLocations, locationActions, opponentLocationActions,
  characters, opponentCharacters, characterActions, opponentCharacterActions,
  event, eventActions,
  deckActions,
  gameActions
}) => {
  let starthand = false;
  if (starthand) {
    return (
      <div className='board'>
        <StartHand deck={deck} hand={hand} deckActions={deckActions}/>
      </div>
    )
  } else {
    return (
      <div className='board'>
        <Opponent
          socket={socket}
          locations={opponentLocations}
          locationActions={opponentLocationActions}
          characters={opponentCharacters}
          characterActions={opponentCharacterActions}
        />
        <Player
          deck={deck}
          hand={hand}
          discardPile={discardPile}
          plotCards={plotCards}
          locations={locations}
          characters={characters}
          event={event}
          deckActions={deckActions}
          locationActions={locationActions}
          characterActions={characterActions}
          eventActions={eventActions}
        />
      </div>
    )
  }
}

Board.propTypes = {
  socket: PropTypes.object.isRequired,
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  discardPile: PropTypes.array.isRequired,
  plotCards: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  opponentLocations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  opponentCharacters: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
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
  opponentLocationActions: PropTypes.shape({
    addOpponentLocation: PropTypes.func.isRequired,
    kneelOpponentLocation: PropTypes.func.isRequired,
    standOpponentLocation: PropTypes.func.isRequired,
  }),
  characterActions: PropTypes.shape({
    playCharacter: PropTypes.func.isRequired,
    kneelCharacter: PropTypes.func.isRequired,
    standCharacter: PropTypes.func.isRequired,
  }),
  opponentCharacterActions: PropTypes.shape({
    addOpponentCharacter: PropTypes.func.isRequired,
    kneelOpponentCharacter: PropTypes.func.isRequired,
    standOpponentCharacter: PropTypes.func.isRequired,
  }),
  eventActions: PropTypes.shape({
    playEvent: PropTypes.func.isRequired,
    discardEvent: PropTypes.func.isRequired,
  }),
  gameActions: PropTypes.shape({
    newGame: PropTypes.func.isRequired,
  })
}

const mapStateToProps = (state) => ({
  deck: state.deckReducer,
  hand: state.handReducer,
  discardPile: state.discardReducer,
  plotCards: state.plotDeckReducer,
  locations: state.locationReducer,
  opponentLocations: state.opponentLocationReducer,
  characters: state.characterReducer,
  opponentCharacters: state.opponentCharacterReducer,
  event: state.eventReducer,
  game: state.gameReducer,
  room: state.roomReducer,
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
  opponentLocationActions: bindActionCreators({
    addOpponentLocation,
    kneelOpponentLocation,
    standOpponentLocation,
  }, dispatch),
  characterActions: bindActionCreators({
    playCharacter,
    standCharacter,
    kneelCharacter,
  }, dispatch),
  opponentCharacterActions: bindActionCreators({
    addOpponentCharacter,
    kneelOpponentCharacter,
    standOpponentCharacter,
  }, dispatch),
  eventActions: bindActionCreators({
    playEvent,
    discardEvent,
  }, dispatch),
  gameActions: bindActionCreators({
    newGame,
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
