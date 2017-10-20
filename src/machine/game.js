export default {
  state: { name: 'plot phase' },
  transitions: {
    'new game': {
      'goto plot': 'plot phase',
    },
    'plot phase': {
      'goto marshal': 'marshaling'
    },
    'marshaling': {
      'goto challenge': 'challenging'
    },
    'challenging': {
      'goto marshal': 'marshaling'
    }
  }
};
