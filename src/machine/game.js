export default {
  state: {
    name: 'new game',
    isFirstPlayer: false,
    isPlayerTurn: false,
    isPlayerDone: false,
    isOpponentDone: false,
    challenges: {
      military: false,
      intrigue: false,
      power: false,
      currentChallenge: '',
    }
  },
  transitions: {
    'new game': {
      'goto setup': function(state, isFirstPlayer, isYourTurn) {
        console.log(state)
        return {
          ...state,
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
          ...state,
          isOpponentDone: true
        }
      },
      'goto plot': function(state) {
        console.log(state)
        return {
          ...state,
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
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'set first player': function(state, isFirstPlayer) {
        console.log(state)
        return {
          ...state,
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
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'goto marshal': function(state) {
        return {
          ...state,
          name: 'marshaling phase',
          isOpponentDone: false,
          isPlayerDone: false,
          isYourTurn: state.isFirstPlayer,
        }
      },
    },
    'marshaling phase': {
      'player done': function(state) {
        console.log(state)
        return {
          ...state,
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log(state)
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'your turn': function(state, isYourTurn) {
        console.log(state)
        return {
          ...state,
          isYourTurn: isYourTurn,
        }
      },
      'goto challenge': function(state) {
        console.log(state)
        return {
          ...state,
          name: 'challenges phase',
          isYourTurn: state.isFirstPlayer,
        }
      },
    },
    'challenges phase': {
      'player done': function(state) {
        console.log(state)
        return {
          ...state,
          military: false,
          intigue: false,
          power: false,
          currentChallenge: '',
        }
      },
      'military done': function(state) {
        console.log(state)
        return {
          ...state,
          military: true,
        }
      },
      'intrigue done': function(state) {
        console.log(state)
        return {
          ...state,
          intrigue: true,
        }
      },
      'power done': function(state) {
        console.log(state)
        return {
          ...state,
          power: true,
        }
      },
      'set current challenge': function(state, challenge) {
        console.log(state)
        return {
          ...state,
          currentChallenge: challenge,
        }
      },
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
