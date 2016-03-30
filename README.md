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

1. run `npm run build`
2. Upload `dist/fb_frontend.min.js` to your server.
3. Add `<script src="fb_frontend.min.js">` to the page
4. Please, [raise an issue](https://github.com/FarmBot/farmbot-web-frontend/issues/new?title=Help,%20I%20cant%20setup!) if you have any trouble setting up.

# Configuration

All config is in `src/config.js`. It points to configurations like:

 0. `FARMBOT_API_URL`: URL of the [farmbot-web-app](https://github.com/FarmBot/farmbot-web-app) API endpoint.,
 0. `MESHBLU_URL`: URL for the [MeshBlu](https://github.com/octoblu/meshblu) IoT messaging gateway you will use. Default: "wss://meshblu.octoblu.com/ws/v2",
 0. `ROOT_PATH`: For use cases where you are mounting the farmbot app on a non-root URL. The app must have a mount point (URL) to find assets. **If `ROOT_PATH` is incorrect, you will have issues loading images and assets**. Default: "/app/"


# TODO

 - [ ] Add images to webpack build
 - [ ] Switch to back to RLite for routing?
