<script>
import axios from "axios";
import { user } from '../user.js'

export default {
  created: function () {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    // user.name = '';
    this.$router.push("/");
  },
  data: function () {
    return {
      user
    }
  }
};
</script>

<template>
  <div class="logout"></div>
</template>