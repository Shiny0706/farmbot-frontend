var path = require('path');

module.exports = function (config) {
  config.set({
    singleRun: false,
    autoWatch: true,
    browsers: [],
    files: [ 'tests.webpack.js' ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: [ 'progress' ],
    webpack: require("./tools/webpack.config.base.js"),
  });
};
