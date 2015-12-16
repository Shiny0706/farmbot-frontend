# FarmBot Frontend

HTML, CSS, JS. Mostly React / WebPack

# How?

 0. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
 0. `cd farmbot-web-frontend`
 0. `sudo npm install`
 0. Move a copy of `src/config.example.js` over to `src/config.js`
 0. `npm start`
 0. `Visit http://localhost:3001`
 0. Explore the codebase! `js/app.js` and `js/app.js` are a great place to start looking around.
 0. Ready to deploy your bundle? `webpack --config webpack.prod.config.js`

**Notes:** Make sure you have [node installed](https://docs.npmjs.com/getting-started/installing-node).

# TODO / Refinements:

 * Port device management page business logic over.
 * Implement `PLANT_FETCH_REQUEST` at application start.
 * Integrate Immutable.js into action creators / dispatchers.
 * Add URL route helpers to keep things DRY (repetition of strings everywhere, eg: `#s/designer?blah=`).
 * Add test suite.
 * Add global error handler.
 * Get sourcemaps working
