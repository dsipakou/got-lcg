export default {
  state: { name: 'new game' },
  transitions: {
    'new game': {
      'marshal': 'marshaling'
    },
    'marshaling': {
      'challenge': 'challenging'
    },
    'challenging': {
      'marshal': 'marshaling'
    }
  }
};
