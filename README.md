# Farmbot Web Frontend

 This is the Javascript / HTML / CSS related to Farmbot's browser control app. It depends on a [backend API](https://github.com/FarmBot/farmbot-web-app) (my.farmbot.io by default).

# Up and Running

1. git clone https://github.com/FarmBot/farmbot-web-frontend.git
2. cd farmbot-web-frontend
3. npm install
3. Copy `src/config.example.js` to `src/config.js` (these are your private configs)
4. npm run build
5. Try it out at `localhost:8080`
6. Deploy it by uploading `dist/fb_frontend.min.js` to a web server. Any web server will do.

#

Production and development version of the app will be available in `/dist/`

# TODO

 - [ ] Package images into `/dist` folder
 - [ ] Switch to back to RLite for routing
 - [ ]
