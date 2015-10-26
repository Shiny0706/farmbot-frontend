// phantomjs doesn't have es5
(Function.prototype.bind)
require('babel-core/polyfill');

var context = require.context('.', true, /_test\.js$/);
context.keys().forEach(context)
