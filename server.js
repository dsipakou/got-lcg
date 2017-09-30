
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
    console.log(data);
    if (data.action.type === "ADD_LOCATION") {
      socket.broadcast.emit('add location', data);
    } else if (data.action.type === "ADD_CHARACTER") {
      socket.broadcast.emit('add character', data);
    }
  });
});
