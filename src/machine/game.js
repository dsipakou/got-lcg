export default {
  state: {
    name: 'new game',
    isFirstPlayer: false,
    isPlayerTurn: false,
    isPlayerDone: false,
    isOpponentDone: false,
  },
  transitions: {
    'new game': {
      'goto setup': function(state, isFirstPlayer, isYourTurn) {
        return {
          name: 'setup phase',
          isFirstPlayer: isFirstPlayer,
          isPlayerTurn: isYourTurn,
          isPlayerDone: false,
          isOpponentDone: false,
        }
      }
    },
    'setup phase': {
      'player done': function(state) {
        return {
          name: 'setup phase',
          ...state,
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        return {
          name: 'setup phase',
          ...state,
          isOpponentDone: true
        }
      },
      'goto plot': 'plot phase',
    },
    'plot phase': {
      'goto draw': 'draw phase',
    },
    'draw phase': {
      'goto marshal': 'marshaling phase'
    },
    'marshaling phase': {
      'goto challenge': 'challenges phase'
    },
    'challenges phase': {
      'goto dominance': 'dominance phase'
    },
    'dominance phase': {
      'goto standing': 'standing phase'
    },
    'standing phase': {
      'goto taxation': 'taxation phase'
    },
    'taxation phase': {
      'goto plot': 'plot phase'
    }
  }
};
