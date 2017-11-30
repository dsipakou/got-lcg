import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      dispatch,
      gameflow,
      deck,
      hand,
      discardPile,
      plotDeck, plotInPlay, opponentPlotInPlay,
      locations,
      characters,
      event,
      gold,
    } = this.props;

    return (
      <div className="player-inner">
        <div className="play-zone">
          <div className="events">
            <Event
              dispatch={dispatch}
              card={event}
            />
          </div>
          <div className="permanent-cards">
            <Character
              dispatch={dispatch}
              gameflow={gameflow}
              cards={characters}
            />
            <Location
              dispatch={dispatch}
              cards={locations}
              gameflow={gameflow}
            />
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
              gameflow.states.isDominancePhase &&
              gameflow.payload.isYourTurn &&
              <DoneButton gameflow={gameflow} socket={socket} />
            }
            {
              gameflow.states.isStandingPhase &&
              gameflow.payload.isYourTurn &&
              <DoneButton gameflow={gameflow} socket={socket} />
            }
            {
              gameflow.states.isChallengesPhase &&
              <ChallengeControls gameflow={gameflow} socket={socket} />
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
            socket={socket}
            dispatch={dispatch}
            gameflow={gameflow}
            deck={deck}
          />
          <Hand cards={hand} />
          <DiscardPile cards={discardPile} />
          <PlotDeck
            dispatch={dispatch}
            cards={plotDeck}
            gameflow={gameflow}
          />
        </div>
      </div>
    );
  }
}

PlayerSide.propTypes = {
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  gameflow: PropTypes.object.isRequired,
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
};

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

export default connect(mapStateToProps)(PlayerSide);
