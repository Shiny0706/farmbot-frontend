var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "./src/bundle.js"
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
  devtool: 'source-map',
};
