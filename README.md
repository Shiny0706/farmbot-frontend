# Farmbot Web Frontend

 This is the Javascript / HTML / CSS related to Farmbot's browser control app. It depends on a [backend API](https://github.com/FarmBot/farmbot-web-app) (my.farmbot.io by default).

# Up and Running

**[LATEST STABLE VERSION IS HERE](https://github.com/FarmBot/farmbot-web-frontend/releases)** :star: :star: :star:

0. [Install node](https://nodejs.org/en/download/) if you haven't already.
1. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
2. `cd farmbot-web-frontend`
3. `npm install`
4. `npm start`
5. Visit `http://localhost:8080/app/login`

# Deploy to Production

**NOTE:** The [Web API](https://github.com/FarmBot/Farmbot-Web-API) deployment will automatically build the latest version of the frontend and mount it in the web server. The instructions below are intended for reference purposes, or for users who wish to host their frontend code on a different server than their API.

1. run `npm run build`
2. Copy the contents of `/app` into your webserver so that it will be accessible via `/app`.
3. Visit `/app/login` on your web server to verify installation.
4. [Submit an issue](https://github.com/FarmBot/farmbot-web-frontend/issues/new?title=Installation%20Failure) if you hit problems during the installation.
