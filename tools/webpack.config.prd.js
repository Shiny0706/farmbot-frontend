var webpack = require('webpack');
var generateConfig = require("./webpack.config.base");
var exec = require("child_process").execSync;
var path = require("path");

// TODO USE PATH HERE.
var LANGAUGES_PATH = path.resolve(__dirname, "languages");

var languages = exec("ls tools/languages")
  .toString()
  .split("\n")
  .filter(a => a)
  .map(filePath => filePath.split(".").shift())
  .reduce(function(accum, lang) {
    // TODO: USE PATH HERE.
    accum[lang] = `${ LANGAUGES_PATH }/${lang}.json`;
    return accum
  }, {});

languages.en = null;

c = function(){
    var conf = generateConfig();

  conf.devtool = 'source-map';

  conf
    .plugins
    .push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));

  conf
    .plugins
    .push(new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
    }));

  return conf;
}
module.exports = c();


