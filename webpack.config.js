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
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
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
