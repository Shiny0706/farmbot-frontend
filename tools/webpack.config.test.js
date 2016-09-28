var base = require("./webpack.config.base");
var _ = require("lodash");

module.exports = _.assign(base, {
  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /(bower_components|node_modules)/,
      loader: 'ts'
    }, { // https://github.com/airbnb/enzyme/issues/47
      test: /\.json$/,
      loader: 'json'
    }],
  },
  output: {
    libraryTarget: 'umd',
    library: 'fb_frontend',
  },
  ts: {
    configFileName: "tsconfig.json"
  },
  resolve: {
    extensions: [
      '',
      '.json', // https://github.com/airbnb/enzyme/issues/47
      '.js',
      '.ts',
      '.tsx'
    ],
  },
  externals: { // http://airbnb.io/enzyme/docs/guides/webpack.html
    jsdom: 'window',
    'react/addons': true,
    // cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  },
});