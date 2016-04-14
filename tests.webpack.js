var testsContext = require.context('./src', true, /-test\.(ts|tsx)$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src', true, /!(-test\.(ts|tsx))$/);
srcContext.keys().forEach(srcContext);
