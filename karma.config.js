var path = require('path');

module.exports = function (config) {
  config.set({
    singleRun: false,
    autoWatch: true,
    browsers: ['Chrome'],
    files: [ 'tests.webpack.js' ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: [ 'progress' ],
    webpack: {
      resolve: {
          extensions: ["", ".js", ".ts", ".tsx"]
      },
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /\.tsx?$/,
            // include: path.resolve(__dirname, '../src'),
            exclude: /(bower_components|node_modules)/,
            loader: 'ts',
          }
        ],
      },
      ts: {
        configFileName: "tsconfig.json"
      },
    },
  });
};
