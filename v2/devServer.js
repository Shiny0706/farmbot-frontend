var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.config');

var app = express();
var compiler = webpack(config);

var SERVER_PORT = 3001;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  port: SERVER_PORT
}));

app.use(require('webpack-hot-middleware')(compiler, { port: SERVER_PORT }));

// ?? ¯\_(ツ)_/¯
app.get('/img/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', req.url));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(SERVER_PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening on port ' + SERVER_PORT);
});
