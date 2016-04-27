var path = require('path');

module.exports = function (config) {
  config.set({
    singleRun: true,
    autoWatch: true,
    browsers: ['Chrome'],
    files: [ 'tests.webpack.js' ],
    frameworks: [ 'jasmine' ],
    preprocessors: {
      'tests.webpack.js': ['coverage', 'webpack', 'sourcemap'],
    },
    reporters: [ 'progress' , 'coverage' ],
    webpack: {
      resolve: {
          extensions: ["", ".js", ".ts", ".tsx"]
      },
      cache: true,
      devtool: 'inline-source-map',
      module: {
        postLoaders: [
            {
                test: /\.(ts|tsx)?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: path.resolve(__dirname, 'src/__tests__'),
                loader: 'istanbul-instrumenter'
            }
        ],
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
