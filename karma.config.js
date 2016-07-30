var path = require('path');
var open = require('open');

module.exports = function (config) {
  config.set({
    singleRun: false,
    autoWatch: true,
    // No launchers currently.
    // visit http://localhost:9876/debug.html
    // after running `karma start`.
    port: 5555,
    browsers: [],
    files: [ 'tests.webpack.js' ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      'tests.webpack.js': ['webpack'],
    },
    reporters: [ 'progress' ],
    webpack: require("./tools/webpack.config.base.js"),
  });
  open("http://localhost:5555/debug.html");
};
