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
        <PlayerSide gameflow={gameflow} />
      </div>
    )
  }
}

Board.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.shape({
    name: PropTypes.string,
    states: PropTypes.shape({
      isNewGame: PropTypes.bool.isRequired,
      isPlotPhase: PropTypes.bool.isRequired,
      isDrawPhase: PropTypes.bool.isRequired,
      isMarshalingPhase: PropTypes.bool.isRequired,
      isChallengesPhase: PropTypes.bool.isRequired,
      isDominancePhase: PropTypes.bool.isRequired,
      isStandingPhase: PropTypes.bool.isRequired,
      isTaxationPhase: PropTypes.bool.isRequired,
    }),
    actions: PropTypes.shape({
      gotoPlot: PropTypes.func.isRequired,
      gotoDraw: PropTypes.func.isRequired,
      gotoMarshal: PropTypes.func.isRequired,
      gotoChallenge: PropTypes.func.isRequired,
      gotoDominance: PropTypes.func.isRequired,
      gotoStanding: PropTypes.func.isRequired,
      gotoTaxation: PropTypes.func.isRequired,
    }),
  }),
}

export default connect(Board)
  .with('gameflow')
  .map(({
    state,
    isNewGame,
    isPlotPhase,
    isDrawPhase,
    isMarshalingPhase,
    isChallengesPhase,
    isDominancePhase,
    isStandingPhase,
    isTaxationPhase,
    gotoPlot,
    gotoDraw,
    gotoMarshal,
    gotoChallenge,
    gotoDominance,
    gotoStanding,
    gotoTaxation
  }) => ({
    gameflow: {
      name: state.name,
      states: {
        isNewGame: isNewGame(),
        isPlotPhase: isPlotPhase(),
        isDrawPhase: isDrawPhase(),
        isMarshalingPhase: isMarshalingPhase(),
        isChallengesPhase: isChallengesPhase(),
        isDominancePhase: isDominancePhase(),
        isStandingPhase: isStandingPhase(),
        isTaxationPhase: isTaxationPhase(),
      },
      actions: {
        gotoPlot,
        gotoDraw,
        gotoMarshal,
        gotoChallenge,
        gotoDominance,
        gotoStanding,
        gotoTaxation,
      },
    },
  }));
