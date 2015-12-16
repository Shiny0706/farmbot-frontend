var path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src'],
  },
  entry: {
    app: [
      './src/index.js',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'production.js',
    publicPath: '/public/'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['babel?stage=0&optional=runtime'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
};
