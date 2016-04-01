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
