var webpack = require('webpack');
var generateConfig = require("./webpack.config.base");

c = function(){
  var conf = generateConfig();
  conf.devtool = 'source-map';
  conf
    .plugins
    .push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }));
  return conf;
};

module.exports =  c();
