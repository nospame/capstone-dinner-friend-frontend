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
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark no-print">
    <div class="container-fluid w-75 no-print">
      <a class="navbar-brand no-print" href="/">Dinner Party's Friend</a>
      <button class="navbar-toggler no-print" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse no-print" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/recipes">Search</router-link>
          </li>
          <li class="nav-item" v-if="user.loggedIn">
            <router-link class="nav-link" to="/favorites/recipes">Favorite Recipes</router-link>
          </li>
          <li class="nav-item" v-else="!user.loggedIn">
            <router-link class="nav-link disabled" to="#">Favorite Recipes</router-link>
          </li>
          <li class="nav-item" v-if="user.loggedIn">
            <router-link class="nav-link" to="/favorites/searches">Saved Searches</router-link>
          </li>
          <li class="nav-item" v-else="!user.loggedIn">
            <router-link class="nav-link disabled" to="#">Saved Searches</router-link>
          </li>
          <li class="nav-item dropdown" v-if="!user.loggedIn">
            <a class="btn btn-primary dropdown-toggle" href="#" id="navbarDropdown" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Sign Up
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/users/new">Create Account</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/login">Login</router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item" v-else="user.loggedIn">
            <router-link class="btn btn-secondary" to="/logout">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />

</template>


<style>
</style>
