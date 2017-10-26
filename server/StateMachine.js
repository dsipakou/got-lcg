const StateMachine = require('javascript-state-machine');

var GameFlow = StateMachine.factory({
  init: 'newGame',
  transitions: [
    { name: 'gotoSetup', from: 'newGame', to: 'setup' },
    { name: 'gotoPlot', from: 'setup', to: 'plot' },
    { name: 'gotoDraw', from: 'plot', to: 'draw' },
    { name: 'gotoMarshal', from: 'draw', to: 'marshal' }
  ],
  methods: {
    onSetup: function() { console.log('setup herererer') }
  }

})

module.exports = GameFlow;
