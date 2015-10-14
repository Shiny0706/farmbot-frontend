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
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass?outputStyle=expanded&" +
          "includePaths[]=" +
            encodeURIComponent("./css")]
      }
    ]
  }
};

