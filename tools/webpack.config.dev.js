var webpack = require('webpack');
var generateConfig = require("./webpack.config.base");


var languages = {
  "en": null,
  // In development mode, we don't want to spend a lot of time
  // compiling every possible language. We will just use a subset
  // of all i18n packs.
  "de": require("./languages/de.json")
};

c = function(){
  var conf = generateConfig();
  conf
    .plugins
    .push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }));
  return conf;
};

module.exports =  c();