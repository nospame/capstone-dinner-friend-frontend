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
      <a class="navbar-brand" href="/">Dinner Party's Friend</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">

          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown" v-if="!user.loggedIn">
            <a class="btn btn-primary" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
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
  {{ user.LoggedIn }}
  <div class="container">
    <router-view />
  </div>
</template>


<style>
</style>
