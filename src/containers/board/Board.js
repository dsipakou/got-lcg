import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Player from '../../components/player/player';
import Opponent from '../../components/opponent/Opponent';
import Lobby from '../../containers/lobby/Lobby';
import Navigation from '../../components/navigation/Navigation';
import StartHand from '../../components/starthand/StartHand';
import { playLocation, playCharacter, playEvent } from '../../redux/actions/player/hand'
import { discardEvent } from '../../redux/actions/player/event';
import { kneelLocation, standLocation } from '../../redux/actions/player/location';
import { addOpponentLocation, kneelOpponentLocation, standOpponentLocation } from '../../redux/actions/opponent/opponentLocation';
import { kneelCharacter, standCharacter } from '../../redux/actions/player/character';
import { addOpponentCharacter, kneelOpponentCharacter, standOpponentCharacter } from '../../redux/actions/opponent/opponentCharacter';
import { drawCard, getStartHand, doMulligan } from '../../redux/actions/player/deck';
import { playPlot } from '../../redux/actions/player/plot';
import { addOpponentPlot } from '../../redux/actions/opponent/opponentPlot';
import { newGame } from '../../redux/actions/general/game';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './board.scss'

const Board = ({
  socket,
  deck,
  hand,
  discardPile,
  plotDeck, plotInPlay,
  room,
  locations, opponentLocations, locationActions, opponentLocationActions,
  characters, opponentCharacters, characterActions, opponentCharacterActions,
  event, eventActions,
  deckActions,
  gameActions,
  plotActions,
  opponentPlotInPlay,
  opponentPlotActions,
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
          plotInPlay={opponentPlotInPlay}
          plotActions={opponentPlotActions}
        />
        <Player
          deck={deck}
          hand={hand}
          discardPile={discardPile}
          plotDeck={plotDeck}
          plotInPlay={plotInPlay}
          locations={locations}
          characters={characters}
          event={event}
          deckActions={deckActions}
          locationActions={locationActions}
          characterActions={characterActions}
          eventActions={eventActions}
          plotActions={plotActions}
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
  plotDeck: PropTypes.array.isRequired,
  plotInPlay: PropTypes.array.isRequired,
  opponentPlotInPlay: PropTypes.array.isRequired,
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
  }),
  plotActions: PropTypes.shape({
    playPlot: PropTypes.func.isRequired,
  }),
  opponentPlotActions: PropTypes.shape({
    addOpponentPlot: PropTypes.func.isRequired,
  })
}

const mapStateToProps = (state) => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
  discardPile: state.player.discardReducer,
  plotDeck: state.player.plotDeckReducer,
  plotInPlay: state.player.plotReducer,
  opponentPlotInPlay: state.opponent.opponentPlotReducer,
  locations: state.player.locationReducer,
  opponentLocations: state.opponent.opponentLocationReducer,
  characters: state.player.characterReducer,
  opponentCharacters: state.opponent.opponentCharacterReducer,
  event: state.player.eventReducer,
  game: state.general.gameReducer,
  room: state.general.roomReducer,
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
  }, dispatch),
  plotActions: bindActionCreators({
    playPlot,
  }, dispatch),
  opponentPlotActions: bindActionCreators({
    addOpponentPlot,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Board)
