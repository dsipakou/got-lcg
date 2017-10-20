import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PlayerSide from '../../containers/playerside/PlayerSide';
import OpponentSide from '../../containers/opponentside/OpponentSide';
import Lobby from '../lobby/Lobby';
import Navigation from '../../components/navigation/Navigation';
import StartHand from '../playerside/starthand/StartHand';
import { connect } from 'stent/lib/react';
import { Machine } from 'stent';
import game from '../../machine/game';
import './Board.scss'

Machine.create('gameflow', game);

const Board = ({ socket, deck, hand, deckActions, gameflow }) => {
  console.log(gameflow);
  let starthand = false;
  if (starthand) {
    return (
      <div className='board'>
        <StartHand />
      </div>
    )
  } else {
    return (
      <div className='board'>
        <OpponentSide socket={socket} />
        <PlayerSide />
      </div>
    )
  }
}

Board.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.shape({
    name: PropTypes.string,
    states: PropTypes.shape({
      newGamePhase: PropTypes.bool,
      plotPahse: PropTypes.bool,
      marshalingPhase: PropTypes.bool,
      challengingPhase: PropTypes.bool,
    }),
    actions: PropTypes.shape({
      gotoPlot: PropTypes.func,
      gotoMarshal: PropTypes.func,
      gotoChallenge: PropTypes.func,
    }),
  }),
}

export default connect(Board)
  .with('gameflow')
  .map(({ state, isNewGame, isPlotPhase, isMarshaling, isChallenging, gotoPlot, gotoMarshal, gotoChallenge }) => ({
    gameflow: {
      name: state.name,
      states: {
        newGamePhase: isNewGame(),
        plotPhase: isPlotPhase(),
        marshalingPhase: isMarshaling(),
        challengingPhase: isChallenging(),
      },
      actions: {
        gotoPlot,
        gotoMarshal,
        gotoChallenge,
      }
    },
  }));
