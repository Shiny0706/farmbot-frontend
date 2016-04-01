// var webpack = require('webpack');
// var baseConfig = require('./webpack.config.base.js');
// var path = require('path');
// var config = Object.create(baseConfig);
//
// config.devtool = 'eval-source-map';
//
// config.plugins = [
//   new webpack.DefinePlugin({
//     'process.env.NODE_ENV': JSON.stringify('development'),
//   }),
// ];
//
// config.entry = { app: './src/fb_frontend.tsx' };
//
// config.output = {
//     path: path.resolve(__dirname, "src"),
//     publicPath: "/src/",
//     filename: "bundle.js"
// };
//
// // If this is not set, dev server will complain about 404 errors.
// // TODO: Just use a hash fragment.
// config.devServer = { historyApiFallback: true };
//
// module.exports = config;

var path = require('path');
console.log("WOW!")

module.exports = {
  module: {
    loaders: [{
        test: /\.tsx?$/,
        exclude: /(bower_components|node_modules)/,
        loader: 'ts'
    }],
  },
  entry: { app: './src/fb_frontend.tsx' },
  output: {
      path: path.resolve(__dirname, "src"),
      publicPath: "/src/",
      filename: "bundle.js"
  },
  ts: {
    configFileName: "tsconfig.json"
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ],
  },
};
