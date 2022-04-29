<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Welcome to the Recipes Index Page",
      recipes: []
    };
  },
  created: function () {
    this.indexRecipes()
  },
  methods: {
    indexRecipes: function () {
      console.log('in the index function')
      axios.get('/recipes.json')
        .then(response => {
          this.recipes = response.data
          console.log(response.data)
        })
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div v-for="recipe in recipes">
      <h2>{{ recipe.name }}</h2>
      <p>{{ recipe.description }}</p>
      <hr />
    </div>
  </div>
</template>

<style>
</style>