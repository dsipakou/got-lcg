import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OpponentLocation from '../../components/location/OpponentLocation';
import OpponentCharacter from '../../components/character/OpponentCharacter';
import OpponentPlot from '../../components/plot/OpponentPlot';
import './OpponentSide.scss';

const OpponentSide = ({
  socket,
  dispatch,
  gameflow,
  locations,
  characters,
  plotInPlay,
}) => {
  return (
    <div className="opponent-inner">
      <OpponentCharacter
        socket={socket}
        dispatch={dispatch}
        cards={characters}
        gameflow={gameflow}
      />
      <OpponentLocation
        socket={socket}
        dispatch={dispatch}
        cards={locations}
      />
      <OpponentPlot
        socket={socket}
        dispatch={dispatch}
        cards={plotInPlay}
        gameflow={gameflow}
      />
    </div>
  );
};

OpponentSide.propTypes = {
  socket: PropTypes.object.isRequired,
  gameflow: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  plotInPlay: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  plotInPlay: state.opponent.opponentPlotReducer,
  locations: state.opponent.opponentLocationReducer,
  characters: state.opponent.opponentCharacterReducer,
});

export default connect(mapStateToProps)(OpponentSide);
