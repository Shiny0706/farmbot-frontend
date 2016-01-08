var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js'], // Why does it break without element 0 ('')?
    modulesDirectories: ['node_modules', 'src'],
  },
  entry: {
    app: [
      './src/index.js',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?stage=0&optional=runtime'],
      },
    ],
  },
  preLoaders: [
    { test: /\.js|jsx$/, include: /(src)/, loaders: ['isparta'] }
  ],
  plugins: [],
  devtool: 'inline-source-map',
};
