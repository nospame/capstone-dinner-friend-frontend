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
      <!-- <span v-if="!favorite.has_made" class="badge bg-info">Not Cooked</span>
      <span v-else="!!favorite.has_made" class="badge bg-secondary">Cooked!</span> -->
      <p>{{ favorite.recipe.description }}</p>
      <button class="btn btn-primary position-relative" v-on:click="showRecipe(favorite.recipe.id)">Recipe Details <span
          class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
          v-if="!favorite.has_made">
          <span class="visually-hidden">New to Favorites</span>
        </span></button>

      <hr />
    </div>
  </div>
</template>

<style>
</style>