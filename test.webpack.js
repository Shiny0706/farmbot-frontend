console.log("fuckyeah");
var context = require.context('./test', true, /-test\.js$/);
context.keys().forEach(context);
