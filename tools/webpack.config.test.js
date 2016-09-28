var base = require("./webpack.config.base");
var conf = base();

// https://github.com/airbnb/enzyme/issues/47
conf.module.loaders.push({ test: /\.json$/, loader: 'json' });
conf.resolve.extensions.push(".json");
// http://airbnb.io/enzyme/docs/guides/webpack.html
conf.externals = {
    jsdom: 'window',
    'react/addons': true,
    // cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'text-encoding': 'window'
  }

module.exports = conf;
