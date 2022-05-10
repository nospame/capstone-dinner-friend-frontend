<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Welcome to the Favorites Page",
      favorites: []
    };
  },
  created: function () {
    this.getFavoriteRecipes()
  },
  methods: {
    getFavoriteRecipes: function () {
      axios.get("/favorite_recipes.json")
        .then(response => {
          console.log(response.data)
          this.favorites = response.data
        })
    },
    showRecipe: function (id) {
      this.$router.push(`/recipes/${id}`)
    },
  },
};
</script>

<template>
  <div class="favorites">
    <div v-for="favorite in favorites">
      <h2>{{ favorite.recipe.name }}</h2>
      <p>{{ favorite.recipe.description }}</p>
      <button class="btn btn-primary" v-on:click="showRecipe(favorite.recipe.id)">Recipe Details</button>
      <hr />
    </div>
  </div>
</template>

<style>
</style>