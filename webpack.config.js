module.exports = {
  entry: "./src/js/entry.js",
  output: {
    filename: "./src/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};

