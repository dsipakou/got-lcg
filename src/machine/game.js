export default {
  state: { name: 'new game', isFirstPlayer: false, isYourTurn: false },
  transitions: {
    'new game': {
      'goto setup': function(state, isFirstPlayer, isYourTurn) {
        return {
          name: 'setup phase',
          isFirstPlayer: isFirstPlayer,
          isYourTurn: isYourTurn,
        }
      }
    },
    'setup phase': {
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
