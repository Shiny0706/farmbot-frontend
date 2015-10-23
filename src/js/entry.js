import React from 'react';
import App from './app';
import { Router } from './router.js';
import { loadFromCdn } from './load_from_cdn';

require("!style!css!sass!../css/farmbot.scss");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css",
  "css");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "css");

React.render(<App/>, document.body);
Router.bootstrap();
