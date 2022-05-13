<script>
import { user } from './user.js'

export default {
  data: function () {
    return {
      user
    }
  },
  watch: {
    $route: function () {
      user.loggedIn = !!localStorage.jwt;
    }
  }
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/recipes">Search Recipes</router-link>
          </li>
          <li v-if="user.loggedIn" class="nav-item">
            <router-link class="nav-link" to="/favorites/recipes">Favorites</router-link>
          </li>
          <li v-if="user.loggedIn" class="nav-item">
            <router-link class="nav-link" to="/favorites/searches">Saved Searches</router-link>
          </li>
          <li v-if="!user.loggedIn" class="nav-item">
            <router-link class="nav-link" to="/users/new">Sign Up</router-link>
          </li>
          <li v-if="!user.loggedIn" class="nav-item">
            <router-link class="nav-link" to="/login">Log In</router-link>
          </li>
          <li v-if="user.loggedIn" class="nav-item">
            <router-link class="nav-link" to="/logout">Log Out</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>


<style>
</style>
