<template>
    <div id="app">
    
    <!-- navbar-dropdown-1.vue -->
    <div id="nav">
      <b-navbar type="dark" variant="primary" toggleable sticky>
        <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_dropdown_collapse">
          <b-navbar-nav>
            <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
            <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item><router-link to="/hello">{{ name }}</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <!-- navbar-dropdown-1.vue -->
    
    <b-container>
      <router-view/>
    </b-container>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",
  computed: mapState({
    name: state => (state.user.isLogin ? state.user.data.displayName : "Hello")
  })
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  height: 100%;
  flex-direction: column;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
}

#nav {
  margin-bottom: 30px;
}

#nav a {
  font-weight: bold;
  color: lightgray;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
