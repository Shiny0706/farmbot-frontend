var testsContext = require.context('./src', true, /_spec\.(ts|tsx)$/);
testsContext.keys().forEach(testsContext);
