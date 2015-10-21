import React from 'react';
import FarmDesigner from './farm_designer';
import { router } from './router.js';
import { loadFromCdn } from './load_from_cdn';

require("!style!css!../css/bootstrap.css");
require("!style!css!sass!../css/farmbot.scss");
loadFromCdn(
  "//maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css",
  "css");

React.render(<FarmDesigner/>, document.body);
router.bootstrap();
