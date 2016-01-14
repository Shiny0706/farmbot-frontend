# FarmBot Frontend

HTML, CSS, JS. Mostly React / WebPack

# Develop

 0. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
 0. `cd farmbot-web-frontend`
 0. `sudo npm install`
 0. Move a copy of `src/config.example.js` over to `src/config.js`
 0. `npm start`
 0. `Visit http://localhost:3001`
 0. Explore the codebase! `js/app.js` and `js/app.js` are a great place to start looking around.

# Build / Deploy

 0. Change `config.js` to settings that are relevant to host environment.
 0. Make sure you have [node installed](https://docs.npmjs.com/getting-started/installing-node).
 0. Run `npm run-script compile`.
 0. Compiled output is in `dist/production.js`


# TODO / Refinements:

 * Add URL route helpers to keep things DRY (repetition of strings everywhere, eg: `#s/designer?blah=`).
 * Add test suite.
 * URL router is broke.
