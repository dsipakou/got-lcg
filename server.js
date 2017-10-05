
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
      default:
        break;
    }
  });
});
