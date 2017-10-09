import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Hand from '../hand/hand';
import Location from '../location/location';
import Character from '../character/character';
import Event from '../event/Event';
import Deck from '../deck/Deck';
import DiscardPile from '../discardPile/DiscardPile';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import './player.scss';

const Player = ({
  deck,
  hand,
  discardPile,
  locations,
  characters,
  event,
  deckActions,
  locationActions,
  characterActions,
  eventActions,
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
        </div>
      </div>
      <div className='cards-zone'>
        <Deck deck={deck} action={deckActions.drawCard} />
        <Hand cards={hand} />
        <DiscardPile cards={discardPile} />
      </div>
    </div>
  );
}

Player.propTypes = {
  deck: PropTypes.array.isRequired,
  hand: PropTypes.array.isRequired,
  discardPile: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  characters: PropTypes.array.isRequired,
  event: PropTypes.object.isRequired,
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
  })
}

export default DragDropContext(HTML5Backend)(Player);
