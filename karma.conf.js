var webpackConfig = require('./webpack.config.js')

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],

    basePath: 'test',
    autoWatch: false,
    files: ['webpack-loader.js'],
    preprocessors: {
      'webpack-loader.js': ['webpack'],
    },

    plugins: [
      require("karma-webpack"),
      'karma-jasmine',
      'karma-chrome-launcher',
    ],

    webpack: webpackConfig,

    client: {
      caputreConsole: true
    },

    reporters: ['dots'],
    singleRun: true,

    webpackMiddleware: {
      noInfo: true
    },

    browserNoActivityTimeout: 30000,
  });
}
