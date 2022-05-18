<script>
import axios from "axios"
import { user } from '../user.js'

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
      user
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          // user.name = response.data.user_name;
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="login m-auto" style="max-width: 720px">
    <h1 class="display-3 text-center m-5">Login</h1>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label for="login-email" class="form-label">Email:</label>
        <input type="email" id="login-email" class="form-control" v-model="newSessionParams.email" />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password:</label>
        <input type="password" id="login-password" class="form-control" v-model="newSessionParams.password" />
      </div>
      <input type="submit" value="Submit" class="btn btn-primary mb-3" />
    </form>
  </div>
</template>