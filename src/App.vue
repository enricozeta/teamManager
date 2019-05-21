<template>
  <div class="app container-fluid" id="app">
    <div class="row">
      <navbar/>
    </div>

    <div class="app-content row">
      <div class="min-h-100 w-100">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "./components/Player/Player.vue";
import NewPlayer from "./components/NewPlayer/NewPlayer.vue";
import Players from "./components/Players/Players.vue";
import Login from "./components/Login/Login.vue";
import MulteType from "./components/MulteType/MulteType.vue";
import Navbar from "./components/Navbar/Navbar.vue";
import NewMulta from "./components/NewMulta/NewMulta.vue";
import NewMultaType from "./components/NewMultaType/NewMultaType.vue";
import Home from "./components/Home/Home.vue";
import Registration from "./components/Registration/Registration.vue";
import Setting from "./components/Setting/Setting.vue";
import TeamSetting from "./components/Setting/TeamSetting.vue";
import { Slide } from 'vue-burger-menu'


export default {
  name: "App",

  components: {
    Login,
    MulteType,
    Navbar,
    NewMulta,
    Player,
    NewPlayer,
    Players,
    Home,
    Registration,
    Setting,
    Slide,
    TeamSetting
  }
};
</script>

<style src="./assets/scss/app.scss" lang="scss"></style>
<style src="./assets/scss/component.scss" lang="scss"></style>
