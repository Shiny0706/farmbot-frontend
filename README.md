# FarmBot Frontend

HTML, CSS, JS. Mostly React / WebPack

# How?

 0. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
 0. `cd farmbot-web-frontend`
 0. `npm install`
 0. Move a copy of `src/js/config.example.js` over to `src/js/config.js`
 0. `npm start`
 0. `Visit http://localhost:3001`
 0. Explore the codebase! `js/app.js` and `js/app.js` are a great place to start looking around.

**Notes:** Make sure you have [node installed](https://docs.npmjs.com/getting-started/installing-node).

# TODO / Refinements:

 * Port DeviceService over from old repo.
 * Port device management page business logic over.
 * Fetch all plants on startup.
 * Implement `PLANT_FETCH_REQUEST` at application start.
 * Add better async action support.
 * Integrate Immutable.js into action creators / dispatchers.
 * Add URL route helpers to keep things DRY (repetition of strings everywhere, eg: `#s/designer?blah=`).
 * Add test suite.
 * Add global error handler.
 * Get sourcemaps working
