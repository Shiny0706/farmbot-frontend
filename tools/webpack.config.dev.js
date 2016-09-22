var path = require('path');
var webpack = require('webpack');
var I18nPlugin = require("i18n-webpack-plugin");
var exec = require("child_process").exec;

exec("rm app/bundle.js", console.log);

var languages = {
    "en": null,
    "de": require("./languages/de.json")
  };

module.exports = Object.keys(languages).map(function (language) {
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
      path: path.resolve(__dirname, "..", "app"),
      publicPath: "/app/",
      filename: language + "-bundle.js"
    },
    ts: { configFileName: "tsconfig.json" },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
      new I18nPlugin(languages[language])
    ],
    resolve: {
      extensions: ['', '.js', '.ts', '.tsx'],
    },
    devServer: {
      historyApiFallback: { index: '/app/index.html' }
    }
  };
});