<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup m-auto" style="max-width: 720px">
    <h1 class="display-3 text-center m-5">Sign Up</h1>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      <div class="mb-3">
        <label for="input-name" class="form-label">Name:</label>
        <input type="text" id="input-name" class="form-control" v-model="newUserParams.name" />
      </div>
      <div class="mb-3">
        <label for="input-email" class="form-label">Email:</label>
        <input type="email" class="form-control" id="input-email" v-model="newUserParams.email" />
      </div>
      <div class="mb-3 row">
        <div class="col">
          <label for="input-password" class="form-label">Password:</label>
          <input type="password" class="form-control" id="input-password" v-model="newUserParams.password" />
        </div>
        <div class="col">
          <label for="confirm-password" class="form-label">Password confirmation:</label>
          <input type="password" class="form-control" id="confirm-password"
            v-model="newUserParams.password_confirmation" />
        </div>
      </div>
      <input type="submit" class="btn btn-primary mb-3" value="Submit" />
    </form>
  </div>
</template>