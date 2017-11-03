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
        console.log(state)
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
        console.log(state)
        return {
          ...state,
          name: 'setup phase',
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          name: 'setup phase',
          ...state,
          isOpponentDone: true
        }
      },
      'goto plot': function(state) {
        console.log(state)
        return {
          name: 'plot phase',
          isOpponentDone: false,
          isPlayerDone: false,
          isFirstPlayer: false,
        }
      },
    },
    'plot phase': {
      'player done': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'plot phase',
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'plot phase',
          isOpponentDone: true
        }
      },
      'set first player': function(state, isFirstPlayer) {
        console.log(state)
        return {
          ...state,
          name: 'plot phase',
          isFirstPlayer: isFirstPlayer,
          isYourTurn: isFirstPlayer,
          isOpponentDone: false,
          isPlayerDone: false,
        }
      },
      'goto draw': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'draw phase',
          isOpponentDone: false,
          isPlayerDone: false,
        }
      },
    },
    'draw phase': {
      'player done': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'draw phase',
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'draw phase',
          isOpponentDone: true
        }
      },
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
