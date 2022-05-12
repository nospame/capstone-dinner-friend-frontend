<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "My Pantry",
      favorites: [],
      selectedIngredient: {}
    };
  },
  created: function () {
    this.getFavoriteIngredients()
  },
  methods: {
    getFavoriteIngredients: function () {
      axios.get("/favorite_ingredients.json")
        .then(response => {
          this.favorites = response.data
        })
    },
    getRecipes: function () {
      axios.get(`/favorite_ingredients/`)
    }
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>What can I make with... ?</h2>
    <div v-for="favorite in favorites">{{ favorite.ingredient.name }}</div>
  </div>
</template>

<style>
</style>