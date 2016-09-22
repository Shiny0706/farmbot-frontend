var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /(node_modules)/,
      loader: 'ts'
    }],
  },
  entry: { app: './src/entry.tsx' },
  output: {
    path: path.resolve(__dirname, "..", "app"),
    publicPath: "/app/",
    filename: "bundle.js"
  },
  ts: { configFileName: "tsconfig.json" },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    })
  ],
  resolve: {
    extensions: [ '', '.js', '.ts', '.tsx' ],
  },
  devServer: {
    historyApiFallback: { index: '/app/default.html' }
  }
};
