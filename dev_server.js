var CONFIG_PATH = './tools/webpack.config.dev.js';
var SERVER_PORT = 3001;
var PUBLIC_PATH = './src';

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require(CONFIG_PATH);

var app = express();
var compiler = webpack(config);


app.use(require('webpack-dev-middleware')(compiler, {
  // noInfo: true,
  // publicPath: PUBLIC_PATH,
  port: SERVER_PORT
}));

app.get('/img/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', req.url));
});

app.get('*', function(req, res) {
  // TODO: Add conditional that only does this if request type is HTML
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(SERVER_PORT, 'localhost', function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening on port ' + SERVER_PORT);
});
