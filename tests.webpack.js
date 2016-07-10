var testsContext = require.context('./src', true, /_spec\.(ts|tsx)$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./src', true, /!(_spec\.(ts|tsx))$/);
srcContext.keys().forEach(srcContext);
