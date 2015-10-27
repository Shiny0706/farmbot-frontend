# FarmBot Frontend

HTML, CSS, JS. Mostly React / WebPack

# How?

 0. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
 0. `cd farmbot-web-frontend`
 0. `npm install`
 0. Move a copy of `/src/js/config.example.js` over to `/src/js/config.js`
 0. `npm start`
 0. `Visit http://localhost:8080/webpack-dev-server/src/bundle`

**Notes:** Make sure you have [node installed](https://docs.npmjs.com/getting-started/installing-node).

# TODO / Refinements:

 * Fetch all plants on startup.
 * Integrate Immutable.js into action creators / dispatchers.
 * Remove onclick() handlers.
 * Remove `*_SHOW` actions.
 * Add URL route helpers to keep things DRY (repetition of strings everywhere, eg: `#s/designer?blah=`).
 * Add test suite.
 * Add global error handler.
 * Get sourcemaps working
