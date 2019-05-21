<template>
  <b-navbar class="w-100" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand router-link to="/home">
      Home
    </b-navbar-brand>
    <b-navbar-toggle target="nav_collapse"/>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav v-if="status.loggedIn">
        <b-nav-item router-link to="players" >Giocatori</b-nav-item>
        <b-nav-item router-link to="newMulta" >Nuova multa</b-nav-item>
        <b-nav-item router-link to="newPlayer" >Nuovo giocatore</b-nav-item>
        <b-nav-item router-link to="multeType" >Tipologia multe</b-nav-item>
        <b-nav-item router-link to="setting" >Impostazioni</b-nav-item>
        <b-nav-item @click=handleSubmit>Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<style lang="scss">
.navbar-dark {
  .navbar-nav {
    .nav-link {
      color: #fff;
    }
  }
}

.navbar-logo {
  height: 32px;
  width: auto;
}

.bg-info {
  background-color: #23406b !important;
}
</style>

<script src="./Navbar.js"></script>

