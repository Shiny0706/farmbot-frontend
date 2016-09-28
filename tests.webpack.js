var i18next = require("i18next");
i18next.init({
    nsSeparator: false,
    keySeparator: false,
    lng: "en",
    resources: {
        "en": { translation: { } }
    }
}, (err, t) => {});

var testsContext = require.context('./src', true, /pec\.(ts|tsx)$/);
testsContext.keys().forEach(testsContext);
