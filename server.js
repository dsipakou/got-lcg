const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const GameFlow = require('./server/StateMachine');

const port = 3000;

const compiler = webpack(config);
app.use(webpackMiddleware(compiler, {
  hot: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));
app.use(webpackHotMiddleware(compiler));

server.listen(port);

var clients = [];

io.on('connection', (socket) => {
  var fsm = new GameFlow();
  socket.on('action', (data) => {
    switch (data.action.type) {
      case "ADD_LOCATION":
        socket.broadcast.emit('add location', data);
        break;
      case "KNEEL_LOCATION":
        socket.broadcast.emit('kneel location', data);
        break;
      case "STAND_LOCATION":
        socket.broadcast.emit('stand location', data);
        break;
      case "ADD_CHARACTER":
        socket.broadcast.emit('add character', data);
        break;
      case "KNEEL_CHARACTER":
        socket.broadcast.emit('kneel character', data);
        break;
      case "STAND_CHARACTER":
        socket.broadcast.emit('stand character', data);
        break;
      case "ADD_PLOT":
        socket.broadcast.emit('play plot', data);
        break;
      default:
        break;
    }
  });
  socket.on('game:start', (data) => {
    console.log(data);
    fsm.gotoSetup();
    io.in('room123').emit('game:start', fsm.state);
  });
  socket.on('game:plot', () => {
    socket.broadcast.emit('game:plot');
  });
  socket.on('opponent:done', () => {
    socket.broadcast.emit('opponent:done');
  });
  socket.on('room', function(room) {
    socket.join(room);
    console.log('connected to the room ' + room + ' with id ' + socket.id);
  })
});
