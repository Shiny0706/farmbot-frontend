736-750

.row
  %nav.drop-shadow{ng_app: 'farmbot', ng_controller: 'nav'}
    .small-menu-title MENU
    %a{:href => root_path} Home
    %a{:href => "/pages/farm_designer"} Farm Designer
    %a{:href => "/dashboard#/movement"} Controls
    %a{:href => "/dashboard#/devices"} Devices
    %a{:href => "/dashboard#/sequence"} Sequences
    %a{:href => "/dashboard#/schedule"} Schedules
    %a.large-menu-right{:href => destroy_user_session_path} Sign out
    %a.large-menu-right{:href => edit_user_registration_path} My Account
    %stopbutton
    %syncbutton{schedules: "schedules"}
<div class="row">
  <nav class="drop-shadow">
    <a href="http://farmbot.io/">Home</a>
    <a href="http://farmbot.io/#fixMe">Controls</a>
    <a href="http://farmbot.io/#fixMe">Devices</a>
    <a href=""></a>
  </nav>
</div>

# FarmBot Frontend

HTML, CSS, JS. Mostly React / WebPack

# How?

 0. `git clone https://github.com/FarmBot/farmbot-web-frontend.git`
 0. `cd farmbot-web-frontend`
 1. `npm install`
 2. `npm start`
 3. `Visit http://localhost:8080/webpack-dev-server/src/bundle`

**Notes:** Make sure you have [node installed](https://docs.npmjs.com/getting-started/installing-node).
