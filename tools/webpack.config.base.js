var path = require('path');
var exec = require('child_process').exec;

exec("rm app-resources/*bundle.js*"); // Clean previous stuff.

module.exports = function () {
  return {
    module: {
      loaders: [{
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: 'ts'
      }],
    },
    entry: { app: './src/entry.tsx' },
    output: {
      path: path.resolve(__dirname, "..", "app-resources"),
      publicPath: "/app-resources/",
      filename: "bundle.js"
    },
    ts: { configFileName: "tsconfig.json" },
    plugins: [],
    resolve: {
      extensions: ['', '.js', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: { index: '/app/index.html' }
    }
  };
};
