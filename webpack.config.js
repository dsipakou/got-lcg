var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

var config = {
  context: path.resolve(__dirname, '.'),
  entry: [
    './src/app.js',
    'webpack-hot-middleware/client'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ] } ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

module.exports = config;
