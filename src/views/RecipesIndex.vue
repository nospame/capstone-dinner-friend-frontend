<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the Recipes Index Page",
      recipes: [],
      searchTerm: ''
    };
  },
  created: function () {
    this.indexRecipes()
  },
  methods: {
    indexRecipes: function () {
      axios.get('/recipes.json')
        .then(response => {
          this.recipes = response.data
        })
    },
    searchRecipes: function () {
      axios.get(`/recipes.json?query=${this.searchTerm}`)
        .then(response => {
          this.recipes = response.data
        })
      this.searchTerm = ''
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <form v-on:submit.prevent="searchRecipes()"> <input type="text" v-model="searchTerm"> <input type="submit"
        label="search">
    </form>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <hr />
    </div>
  </div>
</template>

<style>
</style>