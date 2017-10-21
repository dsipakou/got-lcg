import React from 'react';
import PropTypes from 'prop-types';
import Hand from '../../components/hand/hand';
import Location from '../../components/location/location';
import Character from '../../components/character/character';
import Event from '../../components/event/Event';
import MainDeck from '../../components/deck/maindeck/MainDeck';
import DiscardPile from '../../components/deck/discardPile/DiscardPile';
import PlotDeck from '../../components/deck/plotdeck/PlotDeck';
import Plot from '../../components/plot/Plot';
import Gold from '../../components/player/gold/Gold';
import { playLocation, playCharacter, playEvent } from '../../redux/actions/player/hand';
import { discardEvent } from '../../redux/actions/player/event';
import { kneelLocation, standLocation } from '../../redux/actions/player/location';
import { kneelCharacter, standCharacter } from '../../redux/actions/player/character';
import { drawCard, getStartHand, doMulligan } from '../../redux/actions/player/deck';
import { playPlot } from '../../redux/actions/player/plot';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './PlayerSide.scss';

const PlayerSide = ({
  deck,
  hand,
  discardPile,
  plotDeck, plotInPlay,
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
}) => {
  return(
    <div className='player-inner'>
      <div className='play-zone'>
        <div className='events'>
          <Event card={event} actions={eventActions} />
        </div>
        <div className='permanent-cards'>
          <Character cards={characters} actions={characterActions} />
          <Location cards={locations} actions={locationActions} />
        </div>
        <div className='help-zone'>
          <Gold gold={gold} />
          <Plot cards={plotInPlay} />
        </div>
      </div>
      <div className='cards-zone'>
        <MainDeck deck={deck} action={deckActions.drawCard} gameflow={gameflow} />
        <Hand cards={hand} />
        <DiscardPile cards={discardPile} />
        <PlotDeck cards={plotDeck} actions={plotActions} gameflow={gameflow} />
      </div>
    </div>
  );
}

PlayerSide.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  discardPile: PropTypes.array.isRequired,
  plotDeck: PropTypes.array.isRequired,
  plotInPlay: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
  gold: PropTypes.number.isRequired,
  deckActions: PropTypes.shape({
    drawCard: PropTypes.func,
    getStartHand: PropTypes.func
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

const mapStateToProps = (state) => ({
  deck: state.player.deckReducer,
  hand: state.player.handReducer,
  discardPile: state.player.discardReducer,
  plotDeck: state.player.plotDeckReducer,
  plotInPlay: state.player.plotReducer,
  locations: state.player.locationReducer,
  characters: state.player.characterReducer,
  event: state.player.eventReducer,
  gold: state.player.propertiesReducer.gold,
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
  }, dispatch),
  eventActions: bindActionCreators({
    playEvent,
    discardEvent,
  }, dispatch),
  plotActions: bindActionCreators({
    playPlot,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSide);
