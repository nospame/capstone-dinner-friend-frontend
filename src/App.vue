
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

  <nav class="navbar navbar-expand-lg navbar-light fixed-top py-3 backdrop"
    data-navbar-on-scroll="data-navbar-on-scroll">
    <div class="container"><a class="navbar-brand d-flex align-items-center fw-semi-bold fs-3" href="#"> <img
          class="me-3" src="assets/img/gallery/logo.png" alt="" />
        <div class="text-primary font-base">Sevi</div>
      </a>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse border-top border-lg-0 mt-4 mt-lg-0" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto pt-2 pt-lg-0 font-base">
          <li class="nav-item">
            <router-link class="nav-link fw-medium active" aria-current="page" to="/recipes">Home
            </router-link>
          </li>

          <li class="nav-item" v-if="user.loggedIn">
            <router-link class="nav-link" to="/favorites/searches">Saved Searches</router-link>
          </li>
          <li class="nav-item" v-if="user.loggedIn">
            <router-link class="nav-link" to="/favorites/recipes">Favorites</router-link>
          </li>
          <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">More</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-if="!user.loggedIn">
                <router-link class="dropdown-item" to="/users/new">Sign Up</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="/about">About</router-link>
              </li>

            </ul>
          </li>
        </ul>
        <div class="ps-lg-5">
          <router-link v-if="!user.loggedIn" class="btn btn-lg btn-primary rounded-pill bg-gradient font-base order-0"
            to="/login">Login
          </router-link>
          <router-link v-if="user.loggedIn" class="btn btn-lg btn-primary rounded-pill bg-gradient font-base order-0"
            to="/logout">Logout
          </router-link>
        </div>
      </div>
    </div>
  </nav>

  <router-view />



</template>


<style>
</style>
