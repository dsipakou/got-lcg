import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hand from '../../components/hand/hand';
import Location from '../../components/location/Location';
import Character from '../../components/character/Character';
import Event from '../../components/event/Event';
import MainDeck from '../../components/deck/maindeck/MainDeck';
import DiscardPile from '../../components/deck/discardPile/DiscardPile';
import PlotDeck from '../../components/deck/plotdeck/PlotDeck';
import Plot from '../../components/plot/Plot';
import Gold from '../../components/player/gold/Gold';
import ChallengeControls from '../../components/challenges/ChallengeControls';
import { DoneButton } from '../../components/general/Buttons';
import { playLocation, playCharacter, playEvent } from '../../redux/actions/player/hand';
import { discardEvent } from '../../redux/actions/player/event';
import { kneelLocation, standLocation } from '../../redux/actions/player/location';
import { kneelCharacter, standCharacter } from '../../redux/actions/player/character';
import { makeDeck, drawCard, getStartHand, doMulligan } from '../../redux/actions/player/deck';
import { playPlot } from '../../redux/actions/player/plot';
import './PlayerSide.scss';

class PlayerSide extends Component {
  componentDidMount() {
    const { socket, gameflow } = this.props;
    socket.on('opponent:done', () => {
      gameflow.actions.opponentDone();
      gameflow.actions.yourTurn(true);
    });
    socket.on('game:nextphase', () => {
      gameflow.actions.gotoNext();
    });
  }

  render() {
    const {
      socket,
      deck,
      hand,
      discardPile,
      plotDeck, plotInPlay, opponentPlotInPlay,
      locations,
      characters,
      event,
      gold,
      deckActions,
      locationActions,
      characterActions,
      eventActions,
      plotActions,
      gameflow,
    } = this.props;

    return (
      <div className="player-inner">
        <div className="play-zone">
          <div className="events">
            <Event card={event} actions={eventActions} />
          </div>
          <div className="permanent-cards">
            <Character
              cards={characters}
              actions={characterActions}
              gameflow={gameflow}
              socket={socket}
            />
            <Location cards={locations} actions={locationActions} gameflow={gameflow} />
          </div>
          <div className="help-zone">
            {
              gameflow.states.isMarshalingPhase &&
              gameflow.payload.isYourTurn &&
              <DoneButton gameflow={gameflow} socket={socket} />
            }
            {
              gameflow.states.isChallengesPhase &&
              gameflow.payload.isYourTurn &&
              <DoneButton gameflow={gameflow} socket={socket} />
            }
            {
              gameflow.states.isChallengesPhase &&
              <ChallengeControls gameflow={gameflow} socket={socket} />
            }
            {
              gameflow.states.isDominancePhase &&
              gameflow.payload.isYourTurn &&
              <DoneButton gameflow={gameflow} socket={socket} />
            }
            <Gold gold={gold} />
            <Plot
              cards={plotInPlay}
              socket={socket}
              gameflow={gameflow}
              playerPlotsInPlay={plotInPlay}
              opponentPlotsInPlay={opponentPlotInPlay}
            />
          </div>
        </div>
        <div className="cards-zone">
          <MainDeck
            deck={deck}
            action={deckActions.drawCard}
            gameflow={gameflow}
            socket={socket}
          />
          <Hand cards={hand} />
          <DiscardPile cards={discardPile} />
          <PlotDeck cards={plotDeck} actions={plotActions} gameflow={gameflow} />
        </div>
      </div>
    );
  }
}

PlayerSide.propTypes = {
  socket: PropTypes.object.isRequired,
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  discardPile: PropTypes.array.isRequired,
  plotDeck: PropTypes.array.isRequired,
  plotInPlay: PropTypes.array.isRequired,
  opponentPlotInPlay: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  gold: PropTypes.number.isRequired,
  deckActions: PropTypes.shape({
    makeDeck: PropTypes.func,
    drawCard: PropTypes.func,
    getStartHand: PropTypes.func,
    doMulligan: PropTypes.func,
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
  }),
  eventActions: PropTypes.shape({
    playEvent: PropTypes.func.isRequired,
  }),
  plotActions: PropTypes.shape({
    playPlot: PropTypes.func.isRequired,
  }),
  gameflow: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
  discardPile: state.player.discardReducer,
  plotDeck: state.player.plotDeckReducer,
  plotInPlay: state.player.plotReducer,
  opponentPlotInPlay: state.opponent.opponentPlotReducer,
  locations: state.player.locationReducer,
  characters: state.player.characterReducer,
  event: state.player.eventReducer,
  gold: state.player.propertiesReducer.gold,
});

const mapDispatchToProps = dispatch => ({
  deckActions: bindActionCreators({
    makeDeck,
    drawCard,
    getStartHand,
    doMulligan,
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
  }, dispatch),
  eventActions: bindActionCreators({
    playEvent,
    discardEvent,
  }, dispatch),
  plotActions: bindActionCreators({
    playPlot,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSide);
