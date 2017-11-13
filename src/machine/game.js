import update from 'react-addons-update';

export default {
  state: {
    name: 'new game',
    isFirstPlayer: false,
    isPlayerTurn: false,
    isPlayerDone: false,
    isOpponentDone: false,
    isYourTurn: false,
    challenges: {
      isPlayerDone: false,
      isOpponentDone: false,
      isYourTurn: false,
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
          isYourTurn: isYourTurn,
          isPlayerDone: false,
          isOpponentDone: false,
        }
      }
    },
    'setup phase': {
      'player done': function(state) {
        console.log('PLAYER DONE:')
        console.log(state);
        return {
          ...state,
          name: 'setup phase',
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log('OPPONENT DONE:')
        console.log(state);
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'goto plot': function(state) {
        console.log('GOTO PLOT:')
        console.log(state);
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
        console.log('PLAYER DONE:')
        console.log(state);
        return {
          ...state,
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log('OPPONENT DONE:')
        console.log(state);
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'set first player': function(state, isFirstPlayer) {
        console.log('SET FIRST PLAYER:')
        console.log(state);
        return {
          ...state,
          isFirstPlayer: isFirstPlayer,
          isYourTurn: isFirstPlayer,
          isOpponentDone: false,
          isPlayerDone: false,
        }
      },
      'goto draw': function(state) {
        console.log('GOTO DRAW:')
        console.log(state);
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
        console.log('PLAYER DONE:')
        console.log(state);
        return {
          ...state,
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log('OPPONENT DONE:')
        console.log(state);
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'goto next': function(state) {
        console.log('GOTO NEXT:')
        console.log(state);
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
        console.log('PLAYER DONE:')
        console.log(state);
        return {
          ...state,
          isPlayerDone: true
        }
      },
      'opponent done': function(state) {
        console.log('OPPONENT DONE:')
        console.log(state);
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'your turn': function(state, isYourTurn) {
        console.log('YOUR TURN:')
        console.log(state);
        return {
          ...state,
          isYourTurn: isYourTurn,
        }
      },
      'goto next': function(state) {
        console.log('GOTO NEXT:')
        console.log(state);
        return {
          ...state,
          name: 'challenges phase',
          isYourTurn: state.isFirstPlayer,
          challenges: {
            isYourTurn: state.isFirstPlayer,
          }
        }
      },
    },
    'challenges phase': {
      'player done': function(state) {
        console.log('PLAYER DONE:')
        console.log(state);
        return {
          ...state,
          isPlayerDone: true,
        }
      },
      'military done': function(state) {
        console.log('MILITARY DONE:')
        console.log(state);
        return {
          ...state,
          challenges: {
            military: true
          }
        }
      },
      'intrigue done': function(state) {
        console.log('INTRIGUE DONE:')
        console.log(state);
        return {
          ...state,
          challenges: {
            intrigue: true,
          }
        }
      },
      'power done': function(state) {
        console.log('POWER DONE:')
        console.log(state);
        return {
          ...state,
          challenges: {
            power: true,
          }
        }
      },
      'set current challenge': function(state, challenge) {
        console.log('SET CURRENT CHALLENGE:')
        console.log(state);
        return {
          ...state,
          challenges: {
            currentChallenge: challenge,
          }
        }
      },
      'opponent done': function(state) {
        console.log('OPPONENT DONE:')
        console.log(state);
        return {
          ...state,
          isOpponentDone: true
        }
      },
      'your turn': function(state, isYourTurn) {
        console.log('YOUR TURN:')
        console.log(state);
        return {
          ...state,
          isYourTurn: isYourTurn,
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
