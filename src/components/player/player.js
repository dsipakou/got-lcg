import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Event from '../event/Event';
import MainDeck from '../deck/maindeck/MainDeck';
import DiscardPile from '../deck/discardPile/DiscardPile';
import PlotDeck from '../deck/plotdeck/PlotDeck';
import Plot from '../plot/Plot';
import Gold from './gold/Gold';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

const Player = ({
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
        <MainDeck deck={deck} action={deckActions.drawCard} />
        <Hand cards={hand} />
        <DiscardPile cards={discardPile} />
        <PlotDeck cards={plotDeck} actions={plotActions} />
      </div>
    </div>
  );
}

Player.propTypes = {
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
  })
}

export default DragDropContext(HTML5Backend)(Player);
