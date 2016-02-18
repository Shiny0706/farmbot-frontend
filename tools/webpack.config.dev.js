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

// If this is not set, dev server will complain about 404 errors.
// TODO: Just use a hash fragment.
config.devServer = { historyApiFallback: true };

module.exports = config;
