var webpack = require('webpack');
var generateConfig = require("./webpack.config.base");


var languages = {
  "en": null
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
