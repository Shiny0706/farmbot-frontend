# Farmbot Web Frontend

 This is the Javascript / HTML / CSS related to Farmbot's browser control app. It depends on a [backend API](https://github.com/FarmBot/farmbot-web-app) (my.farmbot.io by default).

# Up and Running

0. [Install node](https://nodejs.org/en/download/) if you haven't already.
1. git clone https://github.com/FarmBot/farmbot-web-frontend.git
2. cd farmbot-web-frontend
3. npm install
4. run `npm start`
5. Visit `http://localhost:8080/`

# Deploy to Production

1. run `npm run build`
2. Upload `tools/dist/farmbot-production.min.js` to your server.
3. Add `<script src="fb_frontend.min.js">` to the page at `app/index.html`. This is the only endpoint we support at the moment. PRs welcome.
4. Please, [raise an issue](https://github.com/FarmBot/farmbot-web-frontend/issues/new?title=Help,%20I%20cant%20setup!) if you have any trouble setting up.

# Configuration

All config is in the user auth token. There's no need to point to an MQTT URL or a particular bot. That information is contained in your auth token.

# TODO

 - [ ] Set `noImplicitAny: true` in `tsconfig.json` once things stabilize.
