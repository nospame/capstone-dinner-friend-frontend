<script>
import axios from 'axios';

export default {
  data: function () {
    return {
      message: "Saved Searches",
      favorites: [],
      selectedIngredient: {}
    };
  },
  created: function () {
    this.getFavoriteSearches()
  },
  methods: {
    getFavoriteSearches: function () {
      axios.get("/favorite_searches.json")
        .then(response => {
          this.favorites = response.data
        })
    },
    getRecipes: function () {
      axios.get(`/ingredients`)
    }
  },
};
</script>

<template>
  <div class="favorite-searches">
    <h1>{{ message }}</h1>
    <h2>What can I make with... ?</h2>
    <div v-for="favorite in favorites">
      <router-link v-bind:to="`/recipes?q=${favorite.search_term}`">{{ favorite.search_term }}</router-link>
    </div>
  </div>
</template>

<style>
</style>