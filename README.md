# Farmbot Web Frontend

 This is the Javascript / HTML / CSS related to Farmbot's browser control app. It depends on a [backend API](https://github.com/FarmBot/farmbot-web-app) (my.farmbot.io by default).

# Up and Running

1. git clone https://github.com/FarmBot/farmbot-web-frontend.git
2. cd farmbot-web-frontend
3. npm install
3. Copy `src/config.example.js` to `src/config.js` (these are your private configs)
4. run `npm start`
5. Visit `http://localhost:8080/`

# Deploy to Production

0. MAKE SURE `src/config` is set to the correct server. (Eg: my.farmbot.io)
1. run `npm run build`
2. Upload `dist/fb_frontend.min.js` to your server.
3. Add `<script src="fb_frontend.min.js">` to the page
4. Please, [raise an issue](https://github.com/FarmBot/farmbot-web-frontend/issues/new?title=Help,%20I%20cant%20setup!) if you have any trouble setting up.

# Configuration

All config is in `src/config.js`. It points to configurations like:

 0. `FARMBOT_API_URL`: URL of the [farmbot-web-app](https://github.com/FarmBot/farmbot-web-app) API endpoint.,

**Note:** There's no need to point to an MQTT URL. That is contained in your auth token.

# TODO

 - [ ] Set `noImplicitAny: true` in `tsconfig.json` once things stabilize.
