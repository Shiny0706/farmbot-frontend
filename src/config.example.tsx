/*
          .-------,     This is an example configuration file. Config files are
        .'         '.   not kept in source control. Copy this over to config.js
      .'  _ ___ _ __ '. on new project builds.
      |  (_' | / \|_) |
      |  ,_) | \_/|   |
      '.             .'
        '.         .'
  jgs     '-------'
*/
export let CONFIG = {
  // The REST API endpoint that stores user auth, device settings, etc.
  FARMBOT_API_URL: "//my.farmbot.io",
  // The Websocket gateway for IoT communication.
  MESHBLU_URL: "wss://meshblu.octoblu.com/ws/v2",
  // The URL that the app file (index.html) will be mounted on the server.
  ROOT_PATH: "/app"
};
