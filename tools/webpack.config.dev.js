var webpack = require('webpack');
var baseConfig = require('./webpack.config.base.js');
var path = require('path');
var config = Object.create(baseConfig);

config.devtool = 'eval-source-map';

config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
];

config.entry = { app: './src/fb_frontend.js' };

config.output = {
    path: path.resolve(__dirname, "src"),
    publicPath: "/src/",
    filename: "bundle.js"
};

module.exports = config;
