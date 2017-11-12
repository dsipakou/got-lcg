const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

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

io.on('connection', (socket) => {

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
  socket.on('room:created', (id) => {
    socket.broadcast.emit('room:created', {id: id})
  });
  socket.on('game:start', () => {
    socket.broadcast.emit('game:start');
  });
  socket.on('game:plot', () => {
    socket.broadcast.emit('game:plot');
  });
  socket.on('game:draw', () => {
    socket.broadcast.emit('game:draw');
  });
  socket.on('game:nextphase', () => {
    socket.broadcast.emit('game:nextphase');
  });
  socket.on('opponent:done', () => {
    socket.broadcast.emit('opponent:done');
  });
  socket.on('game:first player', (isFirstPlayer) => {
    socket.broadcast.emit('game:first player', {isFirstPlayer: isFirstPlayer});
  });
  socket.on('game:your turn', () => {
    socket.broadcast.emit('game:your turn');
  });
  socket.on('challenge:set', (challenge) => {
    socket.broadcast.emit('challenge:set', (challenge))
  })
});
