export default {
  state: { name: 'setup phase' },
  transitions: {
    'new game': {
      'goto setup': 'setup phase',
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
